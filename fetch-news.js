/**
 * fetch-news.js — автосбор и ранжирование новостей для Jarvis Index
 *
 * Использование:
 *   node fetch-news.js              — собрать новости, обновить data.json
 *   node fetch-news.js --dry-run    — проверить без записи
 *
 * API ключ: $env:GNEWS_API_KEY="your-key"
 * Регистрация: https://gnews.io/register (бесплатно: 100 запросов/день)
 */

const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
const GNEWS_API_KEY = process.env.GNEWS_API_KEY || '';
const GNEWS_BASE = 'https://gnews.io/api/v4/search';

// ═══════════════════════════════════════════════
//  ПОИСКОВЫЕ ЗАПРОСЫ для каждого подэтапа (A1–H6)
// ═══════════════════════════════════════════════
const SEARCH_QUERIES = {
  // A — Интеллектуальное ядро
  'A1': '"multimodal AI" model native text image video audio 2026',
  'A2': '"reasoning model" OR "chain of thought" OR "o4" OR "DeepSeek R2" 2026',
  'A3': '"AI planning" OR "hierarchical planning" OR "multi-step agent" 2026',
  'A4': '"transfer learning" OR "zero-shot generalization" OR "cross-domain AI" 2026',
  'A5': '"self-verification" OR "AI self-correction" OR "model calibration" OR "uncertainty estimation" 2026',

  // B — Агентность и надёжность
  'B1': '"AI agent" "tool use" OR "function calling" OR "computer use" OR MCP 2026',
  'B2': '"long-running agent" OR "autonomous task" OR "SWE-bench" OR "agent hours" 2026',
  'B3': '"agent verification" OR "result checking" OR "output validation" AI 2026',
  'B4': '"error recovery" OR "self-healing" OR "graceful degradation" AI agent 2026',
  'B5': '"multi-agent" OR "agent orchestration" OR "agent swarm" coordination 2026',

  // C — Персональный контекст и память
  'C1': '"AI user profile" OR "personal AI identity" OR "user modeling" assistant 2026',
  'C2': '"episodic memory" OR "AI remembers" OR "conversation history" personal AI 2026',
  'C3': '"knowledge graph" personal OR "semantic memory" AI user facts 2026',
  'C4': '"value alignment" OR "AI preferences" OR "personalized AI behavior" 2026',
  'C5': '"real-time context" OR "screen awareness" OR "location context" AI assistant 2026',
  'C6': '"memory management" OR "delete memory" OR "privacy control" AI user 2026',

  // D — Взаимодействие и присутствие
  'D1': '"real-time voice" OR "GPT-Live" OR "voice assistant latency" OR "natural conversation AI" 2026',
  'D2': '"screen understanding" OR "GUI agent" OR "on-screen awareness" OR "computer vision desktop" 2026',
  'D3': '"proactive AI" OR "anticipatory" OR "predicts user needs" OR "Google Now" assistant 2026',
  'D4': '"cross-device AI" OR "multi-device assistant" OR "ambient intelligence" sync 2026',
  'D5': '"emotional AI" OR "social intelligence" OR "empathetic assistant" OR "Hume AI" 2026',

  // E — Поверхность действий
  'E1': '"Model Context Protocol" OR "MCP standard" OR "AI API integration" OR "agent digital actions" 2026',
  'E2': '"AI transactions" OR "AI payments" OR "autonomous purchase" OR "financial agent" 2026',
  'E3': '"smart home AI" OR "Matter protocol AI" OR "IoT assistant" OR "ambient computing" 2026',
  'E4': '"robot learning" OR "embodied AI" OR "physical agent" OR "robot manipulation" 2026',
  'E5': '"agent-to-agent" OR "AI interoperability" OR "AI agents communication" protocol 2026',

  // F — Инфраструктура и экономика
  'F1': '"AI inference efficiency" OR "model compression" OR "token cost reduction" OR "MoE efficiency" 2026',
  'F2': '"AI latency" OR "time-to-first-token" OR "real-time inference" speed 2026',
  'F3': '"AI pricing" OR "token cost" OR "AI subscription" OR "LLM API price" 2026',
  'F4': '"on-device AI" OR "NPU" OR "local LLM" OR "edge inference" laptop phone 2026',
  'F5': '"AI users" OR "ChatGPT users" OR "AI adoption" OR "AI scale" billion 2026',

  // G — Доверие, контроль и регулирование
  'G1': '"AI permissions" OR "access control" OR "agent authorization" OR "AI identity" 2026',
  'G2': '"AI safety guardrails" OR "action limits" OR "agent confinement" OR "AI undo" 2026',
  'G3': '"AI security" OR "prompt injection" OR "adversarial attack" OR "AI jailbreak" 2026',
  'G4': '"AI privacy" OR "private cloud compute" OR "differential privacy" OR "on-device data" 2026',
  'G5': '"AI alignment" OR "RLHF" OR "constitutional AI" OR "value alignment" safety 2026',
  'G6': '"EU AI Act" OR "AI regulation" OR "AI law" OR "AI governance" 2026',

  // H — Экосистема и принятие
  'H1': '"AI standards" OR "MCP protocol" OR "AI interoperability" OR "open API" agent 2026',
  'H2': '"GPT Store" OR "AI plugin" OR "agent marketplace" OR "AI skills" ecosystem 2026',
  'H3': '"AI adoption rate" OR "AI users statistics" OR "ChatGPT growth" OR "AI market" 2026',
  'H4': '"AI habits" OR "AI daily use" OR "delegating to AI" OR "trust AI survey" 2026',
  'H5': '"trust in AI" OR "AI confidence" OR "AI acceptance" survey poll 2026',
  'H6': '"AI business model" OR "AI monetization" OR "AI subscription revenue" OR "AI market size" 2026',
};

// ═══════════════════════════════════════════════
//  ПРАВИЛА РАНЖИРОВАНИЯ (Signal Score)
//  Формула из ТЗ Jarvis Index, Приложение A
// ═══════════════════════════════════════════════

/**
 * Рассчитывает Signal Score (0–100) для новости.
 *
 * Компоненты:
 *   Capability Delta (0–30): насколько расширяет возможности
 *   Real-World Proof  (0–20): вне лаборатории или нет
 *   Scale             (0–15): охват пользователей / сред
 *   Source Quality    (0–15): первичность и авторитетность источника
 *   Recency           (0–10): актуальность (давность публикации)
 *   Penalties        (0–-50): маркетинг, закрытая демо, дубль
 */
function calcSignalScore(article, nodeId) {
  let score = 0;

  // 1. Capability Delta (0–30) — оцениваем по ключевым словам в заголовке
  const title = (article.title || '').toLowerCase();
  const desc = (article.description || '').toLowerCase();

  if (/breakthrough|first|new capability|surpassed|achieved|record/.test(title)) score += 25;
  else if (/improved|enhanced|upgraded|faster|better/.test(title)) score += 18;
  else if /announced|unveiled|released|launched/.test(title) score += 14;
  else if /preview|demonstrated|showcased/.test(title) score += 10;
  else score += 6;

  // 2. Real-World Proof (0–20)
  if (/available|public|rolled out|shipping|in production|users/.test(title + desc)) score += 18;
  else if /beta|early access|waitlist/.test(title + desc)) score += 12;
  else if /demo|prototype|research|paper|arxiv/.test(title + desc)) score += 7;
  else score += 4;

  // 3. Scale (0–15)
  if (/billion|million users|global|worldwide/.test(title + desc)) score += 14;
  else if (/enterprise|thousands|partnership/.test(title + desc)) score += 10;
  else if (/beta testers|early adopters/.test(title + desc)) score += 6;
  else score += 3;

  // 4. Source Quality (0–15)
  const source = (article.source?.name || '').toLowerCase();
  if (/openai|google deepmind|anthropic|meta ai|microsoft|apple/.test(source)) score += 14;
  else if (/bloomberg|reuters|techcrunch|the verge|wired|nature|science/.test(source)) score += 12;
  else if (/arxiv|mit|stanford|acm|ieee/.test(source)) score += 10;
  else score += 6;

  // 5. Recency (0–10) — decay за давность
  const pubDate = new Date(article.publishedAt || Date.now());
  const daysAgo = Math.max(0, (Date.now() - pubDate.getTime()) / 86400000);
  if (daysAgo <= 7) score += 10;
  else if (daysAgo <= 30) score += 8;
  else if (daysAgo <= 90) score += 5;
  else if (daysAgo <= 180) score += 3;
  else score += 1;

  // 6. Penalties (0–-50)
  let penalty = 0;
  if (/leak|rumor|speculation|unconfirmed|allegedly/.test(title + desc)) penalty += 15;
  if (/closed demo|private|not public|internal/.test(title + desc)) penalty += 10;
  if (/benchmark only|synthetic|simulated/.test(title + desc)) penalty += 10;
  if (/press release|marketing|announcement/.test(title) && !/available|released/.test(title)) penalty += 8;
  // Дубль URL не проверяем здесь — дедупликация в main()

  score = Math.max(0, Math.min(100, score - penalty));

  // 7. Direction (positive / negative / neutral)
  let direction = 'positive';
  if (/fail|bug|vulnerability|breach|recall|ban|fine|penalty|sued/.test(title + desc)) direction = 'negative';
  else if /survey|poll|report|study finds|according to/.test(title + desc)) direction = 'neutral';

  return {
    signal_score: Math.round(score),
    direction: direction
  };
}

// ═══════════════════════════════════════════════
//  УТИЛИТЫ
// ═══════════════════════════════════════════════
function log(msg)   { console.log(`[fetch] ${msg}`); }
function warn(msg)  { console.warn(`[fetch] ⚠ ${msg}`); }
function error(msg) { console.error(`[fetch] ✗ ${msg}`); }

async function fetchNews(query, maxResults = 5) {
  const url = `${GNEWS_BASE}?q=${encodeURIComponent(query)}&max=${maxResults}&lang=en&sortby=publishedAt&apikey=${GNEWS_API_KEY}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`GNews API: ${resp.status} ${resp.statusText}`);
  }

  const data = await resp.json();
  if (!data.articles || !Array.isArray(data.articles)) {
    warn(`Нет статей для "${query}"`);
    return [];
  }

  return data.articles.map(a => ({
    date: (a.publishedAt || '').slice(0, 10) || new Date().toISOString().slice(0, 10),
    title: (a.title || '').slice(0, 200),
    url: a.url || '',
    source: a.source?.name || 'Unknown'
  }));
}

// ═══════════════════════════════════════════════
//  MAIN
// ═══════════════════════════════════════════════
async function main() {
  const dryRun = process.argv.includes('--dry-run');

  if (dryRun) log('DRY RUN — данные не будут изменены');

  if (!GNEWS_API_KEY) {
    warn('GNEWS_API_KEY не задан!');
    warn('Экспортируйте: $env:GNEWS_API_KEY="ваш-ключ" (Windows)');
    warn('');
    log('Поисковые запросы для ручного сбора:');
    for (const [id, query] of Object.entries(SEARCH_QUERIES)) {
      console.log(`  ${id}: ${query}`);
    }
    process.exit(1);
  }

  log(`Чтение ${DATA_FILE}...`);
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  const data = JSON.parse(raw);

  let updatedCount = 0;
  let errorCount = 0;
  let totalNew = 0;

  for (const node of data.nodes) {
    if (!SEARCH_QUERIES[node.id]) {
      warn(`Нет поискового запроса для "${node.id}" — пропускаем`);
      continue;
    }

    const query = SEARCH_QUERIES[node.id];
    log(`Поиск: ${node.id} "${node.name}"`);

    try {
      const articles = await fetchNews(query, 5);

      if (articles.length > 0) {
        const existingUrls = new Set((node.news || []).map(n => n.url));
        const newArticles = articles.filter(a => a.url && !existingUrls.has(a.url));

        if (newArticles.length > 0) {
          // Обогащаем Signal Score и direction
          const enriched = newArticles.map(a => {
            const scoring = calcSignalScore(a, node.id);
            return {
              date: a.date,
              title: a.title,
              url: a.url,
              source: a.source,
              direction: scoring.direction,
              signal_score: scoring.signal_score
            };
          });

          // Сортируем по score (высокий → низкий)
          enriched.sort((a, b) => b.signal_score - a.signal_score);

          // Добавляем новые в начало, ограничиваем до 10
          node.news = [...enriched, ...(node.news || [])].slice(0, 10);
          log(`  +${enriched.length} новостей (score: ${enriched[0]?.signal_score || 0})`);
          updatedCount++;
          totalNew += enriched.length;
        } else {
          log(`  (нет новых)`);
        }

        await new Promise(r => setTimeout(r, 250)); // rate limit
      }
    } catch (err) {
      error(`Ошибка для "${node.id}": ${err.message}`);
      errorCount++;
    }
  }

  data.meta.lastUpdated = new Date().toISOString().slice(0, 10);

  if (dryRun) {
    log(`DRY RUN завершён. ${updatedCount} узлов обновлено, ${totalNew} новых статей, ${errorCount} ошибок.`);
    log('Запустите без --dry-run чтобы сохранить изменения.');
  } else {
    log(`Сохранение ${DATA_FILE}...`);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    // После обновления data.json — встроить в index.html
    log(`Готово! ${updatedCount} узлов, ${totalNew} новых статей.`);
    log('Запустите: node embed.js — чтобы обновить сайт');
  }
}

main().catch(err => {
  error(`Критическая ошибка: ${err.message}`);
  process.exit(1);
});
