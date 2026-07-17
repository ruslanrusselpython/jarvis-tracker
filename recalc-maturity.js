const fs = require('fs');

const d = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const STAGE_NAMES = ['Absent','Research','Demonstration','Pilot','Production','Infrastructure'];

let changes = [];

for (const node of d.nodes) {
  if (!node.news || node.news.length === 0) continue;

  const oldMaturity = node.maturity;
  let delta = 0;

  // Count signals by strength
  for (const n of node.news) {
    const score = n.signal_score || 0;
    const dir = n.direction || 'neutral';

    if (dir === 'positive' && score >= 80) delta += 0.25;
    else if (dir === 'positive' && score >= 70) delta += 0.15;
    else if (dir === 'positive' && score >= 60) delta += 0.08;
    else if (dir === 'positive') delta += 0.04;

    if (dir === 'negative' && score >= 70) delta -= 0.15;
    else if (dir === 'negative' && score >= 50) delta -= 0.08;
    else if (dir === 'negative') delta -= 0.04;
  }

  // Cap delta — max change per cycle
  delta = Math.max(-0.5, Math.min(0.5, delta));

  const newMaturity = Math.round((oldMaturity + delta) * 10) / 10;
  const clamped = Math.max(0, Math.min(5, newMaturity));
  node.maturity = clamped;

  // Update stage
  const stageIdx = Math.min(5, Math.floor(clamped));
  node.stage = STAGE_NAMES[stageIdx];

  // Update confidence based on news quantity and recency
  const totalNews = node.news.length;
  const recentNews = node.news.filter(n => n.date >= '2026-01-01').length;
  if (totalNews >= 4 && recentNews >= 2) node.confidence = 'High';
  else if (totalNews >= 2 && recentNews >= 1) node.confidence = 'Medium';
  else node.confidence = node.confidence || 'Low';

  if (Math.abs(delta) > 0.05) {
    changes.push({
      id: node.id,
      name: node.shortName,
      old: oldMaturity,
      new: clamped,
      delta: delta.toFixed(2),
      stage: node.stage,
      confidence: node.confidence,
      signals: node.news.length
    });
  }
}

// Update baselines based on new maturity
for (const node of d.nodes) {
  if (!node.baseline) continue;
  const m = node.maturity;
  const baseYear = 2026;

  // stage3 baseline — if already above 3, set to past
  if (m >= 3.0) {
    node.baseline.stage3 = { p25: '2025', p50: '2026', p75: '2026' };
  } else {
    const years = (3.0 - m) * 1.5;
    const p50 = Math.round(baseYear + years);
    node.baseline.stage3 = {
      p25: String(p50 - 1),
      p50: String(p50),
      p75: String(p50 + 2)
    };
  }

  // stage4
  if (m >= 4.0) {
    node.baseline.stage4 = { p25: '2026', p50: '2027', p75: '2028' };
  } else {
    const years = (4.0 - m) * 1.5;
    const p50 = Math.round(baseYear + years);
    node.baseline.stage4 = {
      p25: String(p50 - 1),
      p50: String(p50),
      p75: String(p50 + 2)
    };
  }

  // stage5
  if (m >= 5.0) {
    node.baseline.stage5 = { p25: '2027', p50: '2028', p75: '2029' };
  } else {
    const years = (5.0 - m) * 1.5;
    const p50 = Math.round(baseYear + years);
    node.baseline.stage5 = {
      p25: String(p50 - 2),
      p50: String(p50),
      p75: String(p50 + 3)
    };
  }
}

d.meta.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync('data.json', JSON.stringify(d, null, 2), 'utf8');

// Report
console.log('Maturity changes:');
changes.sort((a,b) => b.delta - a.delta);
changes.forEach(c => {
  const sign = c.delta > 0 ? '+' : '';
  console.log(`  ${c.id} ${c.name}: ${c.old} → ${c.new} (${sign}${c.delta}) | ${c.stage} | ${c.confidence}`);
});
console.log(`\nTotal changed: ${changes.length} nodes`);

// Recalc JRI
const route = d.routes[0];
let logSum = 0, wSum = 0;
for (const t of d.tracks) {
  const nodes = d.nodes.filter(n => n.track === t.id);
  const avg = nodes.reduce((s,n) => s + n.maturity/5, 0) / nodes.length;
  const w = route.weights[t.id] || 0.1;
  logSum += w * Math.log(Math.max(0.01, avg));
  wSum += w;
}
const jri = Math.round(100 * Math.exp(logSum / wSum));
const p50 = 2026 + Math.round(6 * (1 - jri/100));
console.log(`\nNew JRI: ${jri} | P50: ~${p50} | Target: ${d.meta.targetYear}`);
