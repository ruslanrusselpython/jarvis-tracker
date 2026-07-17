const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Reset all maturities to expert baseline (hardcoded — reasonable starting point)
// These are INITIAL expert assessments, not auto-inflated
const EXPERT_MATURITY = {
  A1:3.8, A2:3.5, A3:2.8, A4:2.0, A5:2.2,
  B1:3.5, B2:2.0, B3:2.0, B4:1.8, B5:2.2,
  C1:2.5, C2:3.2, C3:2.8, C4:1.5, C5:2.5, C6:1.8,
  D1:3.8, D2:2.8, D3:1.8, D4:2.8, D5:2.0,
  E1:3.0, E2:1.5, E3:2.5, E4:1.8, E5:1.0,
  F1:3.5, F2:3.0, F3:3.2, F4:2.8, F5:3.0,
  G1:2.5, G2:2.2, G3:2.0, G4:3.0, G5:2.5, G6:2.8,
  H1:2.5, H2:2.0, H3:3.0, H4:2.0, H5:2.2, H6:2.5
};

const STAGE_NAMES = ['Absent','Research','Demonstration','Pilot','Production','Infrastructure'];

let changes = [];

for (const node of d.nodes) {
  const base = EXPERT_MATURITY[node.id] || node.maturity;

  // Apply ONE-TIME signal adjustment (capped at ±0.5 from expert baseline)
  let delta = 0;
  if (node.news) {
    for (const n of node.news) {
      const score = n.signal_score || 0;
      const dir = n.direction || 'neutral';
      if (dir === 'positive' && score >= 80) delta += 0.15;
      else if (dir === 'positive' && score >= 70) delta += 0.10;
      else if (dir === 'positive' && score >= 60) delta += 0.05;
      if (dir === 'negative' && score >= 70) delta -= 0.10;
      else if (dir === 'negative' && score >= 50) delta -= 0.05;
    }
  }
  delta = Math.max(-0.5, Math.min(0.5, delta));

  const newM = Math.round((base + delta) * 10) / 10;
  const clamped = Math.max(0, Math.min(5, newM));

  if (Math.abs(clamped - node.maturity) > 0.05 || node.maturity === undefined) {
    changes.push({id:node.id, old:node.maturity, new:clamped, delta:(clamped-node.maturity).toFixed(1)});
  }

  node.maturity = clamped;
  node.stage = STAGE_NAMES[Math.min(5, Math.floor(clamped))];

  // Confidence: based on news quality
  const total = (node.news || []).length;
  const recent = (node.news || []).filter(n => n.date >= '2026-01-01').length;
  if (total >= 5 && recent >= 3) node.confidence = 'High';
  else if (total >= 3 && recent >= 1) node.confidence = 'Medium';
  else node.confidence = 'Low';
}

// Recalculate baselines CORRECTLY
const NOW = 2026;
for (const node of d.nodes) {
  const m = node.maturity;
  if (!node.baseline) node.baseline = {};

  // stage3
  if (m >= 3.0) {
    node.baseline.stage3 = { p25: '2025', p50: '2026', p75: '2026' };
  } else {
    const y = Math.max(0.5, (3.0 - m) * 1.5);
    const p50 = Math.round(NOW + y);
    node.baseline.stage3 = { p25: String(p50 - 1), p50: String(p50), p75: String(p50 + 2) };
  }
  // stage4
  if (m >= 4.0) {
    node.baseline.stage4 = { p25: '2026', p50: '2026', p75: '2027' };
  } else {
    const y = Math.max(0.5, (4.0 - m) * 1.5);
    const p50 = Math.round(NOW + y);
    node.baseline.stage4 = { p25: String(p50 - 1), p50: String(p50), p75: String(p50 + 2) };
  }
  // stage5
  if (m >= 5.0) {
    node.baseline.stage5 = { p25: '2026', p50: '2026', p75: '2027' };
  } else {
    const y = Math.max(1.0, (5.0 - m) * 1.5);
    const p50 = Math.round(NOW + y);
    node.baseline.stage5 = { p25: String(p50 - 2), p50: String(p50), p75: String(p50 + 3) };
  }
}

d.meta.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync('data.json', JSON.stringify(d, null, 2), 'utf8');

// Report
if (changes.length > 0) {
  console.log('Maturity changes:');
  changes.forEach(c => console.log(`  ${c.id}: ${c.old} → ${c.new} (${c.delta>0?'+':''}${c.delta})`));
} else {
  console.log('No maturity changes (already at expert baseline)');
}

// JRI & Level
const route = d.routes[0];
let logSum = 0, wSum = 0;
const trackScores = {};
for (const t of d.tracks) {
  const nodes = d.nodes.filter(n => n.track === t.id);
  const avg = nodes.reduce((s,n) => s + n.maturity/5, 0) / nodes.length;
  trackScores[t.id] = Math.round(100 * avg);
  const w = route.weights[t.id] || 0.1;
  logSum += w * Math.log(Math.max(0.01, avg));
  wSum += w;
}
const jri = Math.round(100 * Math.exp(logSum / wSum));
const p50 = NOW + Math.round(6 * (1 - jri/100));

// Current level
function currentLevel() {
  const order = ['J0','J1','J2','J3','J4','J5','J6'];
  let lvl = 'J0';
  for (const l of order) {
    const gates = d.gates[l];
    if (!gates) continue;
    let ok = true;
    for (const g of gates) {
      const n = d.nodes.find(x => x.id === g.node);
      if (!n || n.maturity < g.minMaturity) { ok = false; break; }
    }
    if (ok) lvl = l; else break;
  }
  return lvl;
}
const level = currentLevel();

console.log(`\nJRI: ${jri} | Level: ${level} | P50: ~${p50}`);
console.log('Track scores:');
Object.entries(trackScores).forEach(([t,s]) => console.log(`  ${t}: ${s}`));

// Sample baselines
console.log('\nSample baselines:');
['A1','C2','B3','A4'].forEach(id => {
  const n = d.nodes.find(x => x.id === id);
  console.log(`  ${id} m=${n.maturity}: s3=${n.baseline.stage3.p50} s4=${n.baseline.stage4.p50} s5=${n.baseline.stage5.p50}`);
});
