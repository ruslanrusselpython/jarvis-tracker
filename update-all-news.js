const fs = require('fs');

const d = JSON.parse(fs.readFileSync('data.json', 'utf8'));

const NEW_NEWS = {
  A4: [
    {date:"2026-03-14",title:"Unified Structural Factors for Transfer Learning Generalization with PAC-Bayesian Guarantees",url:"https://ojs.aaai.org/index.php/AAAI/article/view/39270",source:"AAAI-26",direction:"positive",signal_score:55},
    {date:"2025-09-07",title:"Zero-shot Cross-domain Knowledge Distillation: A Case Study on YouTube Music",url:"https://dl.acm.org/doi/10.1145/3705328.3748138",source:"ACM RecSys",direction:"positive",signal_score:48}
  ],
  A5: [
    {date:"2026-02-07",title:"Learning to Self-Verify Makes Language Models Better Reasoners",url:"https://arxiv.org/html/2602.07594v1",source:"arXiv",direction:"positive",signal_score:62},
    {date:"2026-06-01",title:"The Self-Verification Cliff: Generation Outpaces Self-Selection in Frontier LLMs",url:"https://openreview.net/pdf?id=QJTSAvHFQn",source:"OpenReview",direction:"neutral",signal_score:58}
  ],
  B2: [
    {date:"2026-07-02",title:"InfiAgent: An Infinite-Horizon Framework for General-Purpose Autonomous Agents",url:"https://aclanthology.org/2026.findings-acl.1787.pdf",source:"ACL 2026",direction:"positive",signal_score:70},
    {date:"2026-02-28",title:"KLong: Training LLM Agent for Extremely Long-horizon Tasks",url:"https://arxiv.org/html/2602.17547v1",source:"arXiv",direction:"positive",signal_score:65}
  ],
  B3: [
    {date:"2026-07-11",title:"LLM-as-a-Verifier: A General-Purpose Verification Framework",url:"https://arxiv.org/html/2607.05391",source:"arXiv",direction:"positive",signal_score:68},
    {date:"2026-07-02",title:"FRANQ: Faithfulness-Aware Uncertainty Quantification for Fact-Checking RAG Output",url:"https://aclanthology.org/2026.findings-acl.338.pdf",source:"ACL 2026",direction:"positive",signal_score:62}
  ],
  B4: [
    {date:"2026-05-07",title:"A Self-Healing Framework for Reliable LLM-Based Autonomous Agents",url:"https://arxiv.org/abs/2605.06737v1",source:"arXiv",direction:"positive",signal_score:65},
    {date:"2026-05-31",title:"Self-Healing Agentic Orchestrators for Reliable Tool-Augmented LLM Systems",url:"https://doi.org/10.48550/arxiv.2606.01416",source:"arXiv",direction:"positive",signal_score:60}
  ],
  B5: [
    {date:"2026-05-14",title:"Conductor: Deterministic Orchestration for Multi-Agent AI Workflows",url:"https://opensource.microsoft.com/blog/2026/05/14/conductor-deterministic-orchestration-for-multi-agent-ai-workflows/",source:"Microsoft Open Source",direction:"positive",signal_score:75},
    {date:"2026-02-18",title:"AdaptOrch: Task-Adaptive Multi-Agent Orchestration in Era of LLM Convergence",url:"https://arxiv.org/pdf/2602.16873",source:"arXiv",direction:"positive",signal_score:62}
  ],
  C3: [
    {date:"2026-06-04",title:"Dreaming: Better memory for a more helpful ChatGPT",url:"https://openai.com/index/chatgpt-memory-dreaming/",source:"OpenAI",direction:"positive",signal_score:72},
    {date:"2026-04-13",title:"Synthius-Mem: Brain-Inspired Persona Memory Achieving 94.4% Accuracy on LoCoMo",url:"https://arxiv.org/pdf/2604.11563",source:"arXiv",direction:"positive",signal_score:68}
  ],
  C4: [
    {date:"2026-07-01",title:"VALUE ALIGNMENT TAX: Measuring Value Trade-offs in LLM Alignment",url:"https://aclanthology.org/2026.findings-acl.1749/",source:"ACL 2026",direction:"neutral",signal_score:58},
    {date:"2026-02-07",title:"NeVA: Controllable Value Alignment through Neuron-Level Editing",url:"https://arxiv.org/pdf/2602.07356",source:"arXiv",direction:"positive",signal_score:62}
  ],
  C5: [
    {date:"2026-07-15",title:"Real-time context: keeping agent inputs fresh on every step (Redis Iris)",url:"https://redis.io/blog/real-time-context-ai-agents-fresh-inputs/",source:"Redis Blog",direction:"positive",signal_score:65},
    {date:"2026-06-01",title:"Apple unveils next generation of Apple Intelligence and Siri AI at WWDC26",url:"https://www.apple.com/newsroom/2026/06/apple-unveils-next-generation-of-apple-intelligence-siri-ai-and-more/",source:"Apple",direction:"positive",signal_score:80}
  ],
  C6: [
    {date:"2025-06-03",title:"Memory and new controls for ChatGPT",url:"https://openai.com/index/memory-and-new-controls-for-chatgpt/",source:"OpenAI",direction:"positive",signal_score:65},
    {date:"2026-07-07",title:"Pensieve — Memory Management for AI Agents That Actually Forget",url:"https://dev.to/sks/pensieve-memory-management-for-ai-agents-that-actually-forget-3d3c",source:"Dev.to",direction:"positive",signal_score:55}
  ],
  E2: [
    {date:"2026-07-02",title:"Visa and Banks Across Europe Reach Next Phase of Agentic Commerce",url:"https://www.visa.co.uk/about-visa/newsroom/press-releases.3457328.html",source:"Visa",direction:"positive",signal_score:82},
    {date:"2026-07-14",title:"Linux Foundation Launches x402 Foundation for Internet-Native AI Agent Payments",url:"https://www.linuxfoundation.org/press/linux-foundation-announces-operational-launch-of-x402-foundation-to-standardize-internet-native-payments-for-ai-agents-and-applications",source:"Linux Foundation",direction:"positive",signal_score:78}
  ],
  E3: [
    {date:"2026-06-17",title:"Matter 1.6 Enables Multi-Ecosystem Experiences and Context-Driven Control",url:"https://csa-iot.org/newsroom/matter-1-6-enables-more-intuitive-setup-multi-ecosystem-experiences-and-context-driven-control/",source:"CSA-IoT",direction:"positive",signal_score:72},
    {date:"2026-03-19",title:"TELUS unveils world's first smart home AI assistant with Generative UI",url:"https://www.prnewswire.com/news-releases/telus-unveils-the-world-s-first-smart-home-ai-assistant-with-generative-ui-unifying-the-entire-connected-home-886174027.html",source:"PR Newswire",direction:"positive",signal_score:65}
  ],
  E4: [
    {date:"2026-07-16",title:"Faster, Cheaper Way to Teach a Humanoid Robot to Walk Over Real-World Terrain",url:"https://coe.gatech.edu/news/2026/07/researchers-create-faster-cheaper-way-teach-humanoid-robot-walk-over-real-world",source:"Georgia Tech",direction:"positive",signal_score:70},
    {date:"2026-07-06",title:"Apptronik launches Robot Park to train Apollo humanoid robots with Google DeepMind",url:"https://roboticsandautomationnews.com/2026/07/06/apptronik-launches-robot-park-to-train-apollo-humanoid-robots-with-google-deepmind/103069/",source:"Robotics & Automation News",direction:"positive",signal_score:72}
  ],
  E5: [
    {date:"2026-04-01",title:"A2A Protocol Ships v1.0: Production-Ready Standard for Agent-to-Agent Communication",url:"https://github.com/a2aproject/A2A/blob/main/docs/announcing-1.0.md",source:"A2A Project / Linux Foundation",direction:"positive",signal_score:85},
    {date:"2026-07-01",title:"Google and Industry Partners Announce Agentic Resource Discovery Specification",url:"https://www.infoq.com/news/2026/07/agentic-resource-discovery-spec/",source:"InfoQ",direction:"positive",signal_score:72}
  ],
  F1: [
    {date:"2026-06-29",title:"DeepSeek open sources DSpark, speeds up LLM inference by up to 85%",url:"https://venturebeat.com/orchestration/deepseek-open-sources-dspark-a-new-framework-to-speed-up-llm-inference-by-up-to-85",source:"VentureBeat",direction:"positive",signal_score:80},
    {date:"2026-05-27",title:"DeepSeek V4-Pro Permanent 75% Price Cut: $0.87/M Tokens",url:"https://blog.nixapi.com/en/blog/deepseek-v4-pro-price-cut-2026/",source:"NixAPI",direction:"positive",signal_score:75}
  ],
  F2: [
    {date:"2026-07-03",title:"LLM Latency Benchmarks 2026: 6 Levers for Sub-500ms TTFT",url:"https://www.kunalganglani.com/blog/llm-latency-benchmark-optimization",source:"Kunal Ganglani Blog",direction:"positive",signal_score:62},
    {date:"2026-06-14",title:"5 LLM APIs Tested for Latency: Real Data 2026",url:"https://dev.to/kunal_d6a8fea2309e1571ee7/5-llm-apis-tested-for-latency-real-data-2026-3e4o",source:"DEV Community",direction:"positive",signal_score:55}
  ],
  G1: [
    {date:"2026-07-16",title:"Least privilege for AI agents: Identity, access, and tool binding",url:"https://windowsnews.ai/article/microsofts-ai-agent-security-playbook-give-them-an-identity-not-a-master-key.438968",source:"Microsoft Security",direction:"positive",signal_score:72},
    {date:"2026-06-15",title:"CrowdStrike Unveils Continuous Identity for AI Agents",url:"https://ir.crowdstrike.com/news-releases/news-release-details/crowdstrike-unveils-continuous-identity-ai-agents",source:"CrowdStrike",direction:"positive",signal_score:68}
  ],
  G2: [
    {date:"2026-07-15",title:"Meet GPT-Red: an LLM super-hacker OpenAI built to make its models safer",url:"https://www.technologyreview.com/2026/07/15/1140514/meet-gpt-red-an-llm-super-hacker-openai-built-to-make-its-models-safer/",source:"MIT Technology Review",direction:"positive",signal_score:78},
    {date:"2026-07-13",title:"Ant Group Open-Sources AI Safety Model for Autonomous Agents",url:"https://insideai.news/news/agentic-ai/ant-group-open-sources-ai-safety-model-for-autonomous-agents-in-china/3961/",source:"Inside AI",direction:"positive",signal_score:65}
  ],
  G3: [
    {date:"2026-02-11",title:"Prompt Injection Defense Architectures in 2026",url:"https://safeguard.sh/resources/blog/prompt-injection-defense-architectures-2026",source:"Safeguard.sh",direction:"positive",signal_score:70},
    {date:"2026-04-06",title:"AB jailbreaking - a novel hybrid framework for exploitation of adversarial vulnerabilities in LLMs",url:"https://www.nature.com/articles/s41598-026-44403-w",source:"Nature Scientific Reports",direction:"negative",signal_score:62}
  ],
  G5: [
    {date:"2026-01-22",title:"Claude's new constitution",url:"https://www.anthropic.com/news/claude-new-constitution",source:"Anthropic",direction:"positive",signal_score:80},
    {date:"2026-03-11",title:"A3: An Automated Alignment Agent for Safety Finetuning",url:"https://alignment.anthropic.com/2026/automated-alignment-agent/",source:"Anthropic Alignment Blog",direction:"positive",signal_score:75}
  ],
  H2: [
    {date:"2026-05-24",title:"Claude Skills Marketplace 2026: Where to Find, Install, and Build Skills",url:"https://www.totalum.app/blog/claude-skills-marketplace-totalum",source:"Totalum Blog",direction:"positive",signal_score:60},
    {date:"2026-02-15",title:"The Ultimate Guide to Winning in the GPT Store 2025/2026",url:"https://www.devstract.site/blog/ai-automation/ultimate-gpt-store-guide-2026",source:"Devstract",direction:"neutral",signal_score:50}
  ],
  H4: [
    {date:"2026-06-17",title:"Americans' Views on AI Chatbots, Smart Devices and AI's Impact",url:"https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/",source:"Pew Research Center",direction:"neutral",signal_score:65},
    {date:"2026-06-01",title:"How People Are Really Using AI in 2026",url:"https://hbr.org/2026/06/how-people-are-really-using-ai-in-2026",source:"Harvard Business Review",direction:"neutral",signal_score:60}
  ],
  H6: [
    {date:"2026-06-07",title:"OpenAI Revenue 2026: $25B ARR and Still Losing $14B a Year",url:"https://valueaddvc.com/blog/openai-revenue-2026-20b-arr-4b-month-path-to-profitability",source:"ValueAdd VC",direction:"neutral",signal_score:65},
    {date:"2026-05-19",title:"Gartner Forecasts Worldwide AI Spending to Grow 47% in 2026",url:"https://www.morningstar.com/news/business-wire/20260519405832/gartner-forecasts-worldwide-ai-spending-to-grow-47-in-2026",source:"Gartner/Morningstar",direction:"positive",signal_score:60}
  ]
};

let updated = 0;
for (const node of d.nodes) {
  if (NEW_NEWS[node.id]) {
    const existingUrls = new Set((node.news || []).map(n => n.url));
    const fresh = NEW_NEWS[node.id].filter(a => a.url && !existingUrls.has(a.url));
    if (fresh.length > 0) {
      node.news = [...fresh, ...(node.news || [])].slice(0, 10);
      updated++;
      console.log('  + ' + node.id + ': ' + fresh.length + ' news (total: ' + node.news.length + ')');
    }
  }
}

d.meta.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync('data.json', JSON.stringify(d, null, 2), 'utf8');
console.log('\nUpdated ' + updated + ' nodes.');
