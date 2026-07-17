const fs = require('fs');
const d = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// All articles from parallel searches
const BULK = {
  A1: [
    {title:"Introducing Gemini Omni — ability to reason meets ability to create, starting with video",url:"https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-omni/",source:"Google Blog",date:"2026-05-19"},
    {title:"Inkling by Thinking Machines — 1T-param open multimodal model with native image, text, audio",url:"https://huggingface.co/blog/thinkingmachines-inkling",source:"Hugging Face",date:"2026-07-15"},
    {title:"Qwen3.5-Omni: SOTA omni-modality model surpassing Gemini-3.1 Pro on audio tasks",url:"https://arxiv.org/abs/2604.15804",source:"arXiv / Qwen",date:"2026-04-17"}
  ],
  A2: [
    {title:"OpenAI o4-mini: Benchmarks, Features & How It Beats o3 for Less",url:"https://www.linos.ai/technology/openai-o4-mini-release-benchmarks-2026/",source:"Linos",date:"2026-04-16"},
    {title:"DeepSeek R2 Doesn't Exist. Here's What Shipped Instead — DeepSeek V4",url:"https://theplanettools.ai/blog/deepseek-r2-never-shipped-what-deepseek-released-instead-2026",source:"ThePlanetTools",date:"2026-07-13"},
    {title:"OpenAI Reasoning Models Guide — GPT-5.5, GPT-5.6 with reasoning effort modes",url:"https://developers.openai.com/api/docs/guides/reasoning",source:"OpenAI",date:"2026-07-01"}
  ],
  A3: [
    {title:"DEEPPLANNING: Benchmarking Long-Horizon Agentic Planning (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.335.pdf",source:"ACL 2026",date:"2026-07-01"},
    {title:"MagicAgent: Foundation models for generalized agent planning surpassing GPT-5.2",url:"https://arxiv.org/abs/2602.19000",source:"arXiv",date:"2026-02-22"},
    {title:"forgeplan: A long-horizon planning engine using HTN + MCTS",url:"https://github.com/sushaan-k/agent-forge",source:"GitHub",date:"2026-03-30"}
  ],
  A4: [
    {title:"THESEUS: Training-Free Transport of Task Vectors Across Different Architectures (ICML 2026)",url:"https://iris.unimore.it/retrieve/1fb7c09b.../ICML_2026__Rebasin-1.pdf",source:"ICML 2026",date:"2026-07-01"},
    {title:"SAE as a Crystal Ball: Features Predict Cross-Domain Transferability (ICLR 2026)",url:"https://openreview.net/forum?id=KQYnfeBNjl",source:"ICLR 2026",date:"2026-01-01"},
    {title:"On Supernet Transfer Learning for Effective Task Adaptation (CoLLAs 2026)",url:"https://proceedings.mlr.press/v330/singh26a.html",source:"PMLR / CoLLAs",date:"2026-04-06"}
  ],
  A5: [
    {title:"VeriFY: Learning Factual Self-Verification for Hallucination Reduction",url:"https://arxiv.org/abs/2602.02018",source:"arXiv",date:"2026-02-02"},
    {title:"MARCH: Multi-Agent Reinforced Check for Hallucination (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.1828/",source:"ACL 2026",date:"2026-07-01"},
    {title:"LaaB: Logical Consistency-as-a-Bridge for Hallucination Detection (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.286.pdf",source:"ACL 2026",date:"2026-07-01"}
  ],
  B1: [
    {title:"Claude Cowork and Claude Code — point, click, and complete tasks",url:"https://claude.com/blog/dispatch-and-computer-use",source:"Anthropic",date:"2026-03-23"},
    {title:"OpenAI Operator deprecated, folded into ChatGPT Agent with CUA model",url:"https://presenc.ai/research/openai-operator-update-tracker-2026",source:"Presenc AI",date:"2026-05-14"},
    {title:"GPT-5.6 Agent Tools: Programmatic Tool Calling & Tool Search Guide",url:"https://youmind.com/landing/x-viral-articles/gpt-5-6-agent-tools-guide",source:"YouMind",date:"2026-07-13"}
  ],
  B2: [
    {title:"SWE-Marathon: Can Agents Autonomously Complete Ultra-Long-Horizon Software Work?",url:"https://arxiv.org/abs/2606.07682",source:"arXiv / Abundant AI",date:"2026-06-01"},
    {title:"Build Long-running AI Agents That Pause, Resume, and Never Lose Context (Google ADK)",url:"https://developers.googleblog.com/build-long-running-ai-agents-that-pause-resume-and-never-lose-context-with-adk/",source:"Google Developers",date:"2026-05-12"},
    {title:"Effective Harnesses for Long-Running Agents (Anthropic Engineering)",url:"https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents",source:"Anthropic",date:"2025-11-26"}
  ],
  B3: [
    {title:"LLM-as-a-Verifier: A General-Purpose Verification Framework (SOTA on SWE-Bench 78.2%)",url:"https://arxiv.org/html/2607.05391",source:"arXiv",date:"2026-07-01"},
    {title:"Tool Receipts: HMAC-signed execution receipts detect 94.2% fabricated tool references",url:"https://doi.org/10.48550/arxiv.2603.10060",source:"arXiv",date:"2026-03-09"},
    {title:"SAVeR: Verify Before You Commit — Self-Auditing for Faithful Agent Reasoning (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.1440/",source:"ACL 2026",date:"2026-07-01"}
  ],
  B4: [
    {title:"Self-Healing Agentic Orchestrators: 98.8% task success via verification-guided recovery",url:"https://arxiv.org/html/2606.01416",source:"arXiv",date:"2026-05-31"},
    {title:"AI Agent Error Handling & Self-Healing Patterns 2026",url:"https://www.taskade.com/blog/ai-agent-error-recovery",source:"Taskade",date:"2026-07-04"},
    {title:"Self-Healing Agents: Retry, Circuit Breaker, and Fallback Chains (55%→96% success)",url:"https://ai.gopubby.com/self-healing-agents-retry-circuit-breaker-and-fallback-chains-1924ba8ba537",source:"GoPubby",date:"2026-05-25"}
  ],
  B5: [
    {title:"Conductor: Deterministic orchestration for multi-agent AI workflows — Microsoft",url:"https://opensource.microsoft.com/blog/2026/05/14/conductor-deterministic-orchestration-for-multi-agent-ai-workflows/",source:"Microsoft Open Source",date:"2026-05-14"},
    {title:"Agent Framework's Orchestration Patterns Reach 1.0 — Microsoft",url:"https://devblogs.microsoft.com/agent-framework/agent-frameworks-orchestration-patterns-reach-1-0/",source:"Microsoft DevBlogs",date:"2026-07-08"},
    {title:"AI Agent Orchestration 2026: Patterns, Tools, Complete Architecture Guide",url:"https://amux.io/guides/ai-agent-orchestration-2026/",source:"amux.io",date:"2026-05-25"}
  ],
  C1: [
    {title:"PersonaVLM: Long-Term Personalized Multimodal LLMs (CVPR 2026, +22.4% on Persona-MME)",url:"https://openaccess.thecvf.com/content/CVPR2026/papers/Nie_PersonaVLM...pdf",source:"CVPR 2026",date:"2026-06-01"},
    {title:"How we built our user-profile system — canonical six-layer pattern for personalized LLM",url:"https://blog.sourceshift.io/p/how-we-built-our-user-profile-system",source:"SourceShift",date:"2026-05-27"},
    {title:"From Hidden Profiles to Governable Personalization (arXiv position paper)",url:"https://arxiv.org/pdf/2604.20065",source:"arXiv",date:"2026-04-22"}
  ],
  C2: [
    {title:"Episodic memory for AI agents — Mem0 deep dive",url:"https://mem0.ai/blog/episodic-memory-for-ai-agents",source:"Mem0",date:"2026-05-11"},
    {title:"AI Agent Memory 2026: Progress Benchmark Report — Mem0 (+29.6 pts temporal)",url:"https://mem0.ai/blog/state-of-ai-agent-memory-2026",source:"Mem0",date:"2026-04-01"},
    {title:"Introducing Temporal Reasoning in Mem0 — LoCoMo 86.1%→92.5%",url:"https://mem0.ai/blog/introducing-temporal-reasoning-in-mem0",source:"Mem0",date:"2026-05-12"}
  ],
  C3: [
    {title:"Synthius-Mem: Brain-Inspired Persona Memory 94.4% LoCoMo, 99.6% adversarial robustness",url:"https://arxiv.org/abs/2604.11563",source:"arXiv",date:"2026-04-13"},
    {title:"The EpisTwin: Knowledge Graph-Grounded Neuro-Symbolic Architecture for Personal AI",url:"https://www.arxiv.org/pdf/2603.06290",source:"arXiv",date:"2026-03-01"},
    {title:"Synaptic Memory: Brain-inspired knowledge graph with 42 MCP tools",url:"https://github.com/PlateerLab/synaptic-memory",source:"GitHub / PlateerLab",date:"2026-03-21"}
  ],
  C4: [
    {title:"NeVA: Controllable Value Alignment through Neuron-Level Editing",url:"https://arxiv.org/pdf/2602.07356",source:"arXiv",date:"2026-02-07"},
    {title:"ALIGNX: Scaling Up Personalized Preference for User-level Alignment (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.1391.pdf",source:"ACL 2026",date:"2026-07-01"},
    {title:"VISA: Value Injection via Shielded Adaptation — 43.1% less value drift vs SFT",url:"https://arxiv.org/pdf/2603.04822",source:"arXiv",date:"2026-03-05"}
  ],
  C5: [
    {title:"Context is all you need: Introducing Redis Iris — unified context engine",url:"https://redis.io/blog/context-is-all-you-need/",source:"Redis",date:"2026-05-15"},
    {title:"Real-Time Context for AI Agents: Freshness as a context engineering problem",url:"https://redis.io/blog/real-time-context-ai-agents-fresh-inputs/",source:"Redis",date:"2026-07-15"},
    {title:"Build a smarter real-time AI agent with Redis Iris — LangGraph + MCP",url:"https://redis.io/tutorials/redis-iris-call-agent/",source:"Redis",date:"2026-05-18"}
  ],
  C6: [
    {title:"Dreaming V3: Better memory for ChatGPT — recall 41.5%→82.8%",url:"https://openai.com/index/chatgpt-memory-dreaming/",source:"OpenAI",date:"2026-06-04"},
    {title:"The Pensieve Paradigm: Stateful Language Models Mastering Their Own Context (StateLM)",url:"https://doi.org/10.48550/arxiv.2602.12108",source:"arXiv",date:"2026-02-12"},
    {title:"Pensieve — Memory Management for AI Agents That Actually Forget",url:"https://dev.to/sks/pensieve-memory-management-for-ai-agents-that-actually-forget-3d3c",source:"Dev.to",date:"2026-07-07"}
  ],
  D1: [
    {title:"Introducing GPT-Live — full-duplex voice models from OpenAI",url:"https://openai.com/index/introducing-gpt-live",source:"OpenAI",date:"2026-07-08"},
    {title:"OpenAI Didn't Publish GPT-Live's Latency. So We Measured It — ~1.1s acknowledge",url:"https://medium.com/agora-io/openai-didnt-publish-gpt-live-s-latency-so-we-measured-it-cf73016db989",source:"Agora Lab / Medium",date:"2026-07-10"},
    {title:"OpenAI launches GPT-Live, a full-duplex voice upgrade — VentureBeat",url:"https://venturebeat.com/technology/openai-launches-gpt-live-a-full-duplex-voice-upgrade-that-lets-chatgpt-talk-more-like-a-person",source:"VentureBeat",date:"2026-07-08"}
  ],
  D2: [
    {title:"Apple introduces Siri AI with onscreen awareness at WWDC26",url:"https://www.apple.com/newsroom/2026/06/apple-introduces-siri-ai-a-profoundly-more-capable-and-personal-assistant/",source:"Apple",date:"2026-06-01"},
    {title:"ScreenParse / ScreenVLM: Complete Screen Parsing with 771K screenshots (Microsoft Research, ICML 2026)",url:"https://www.microsoft.com/en-us/research/publication/moving-beyond-sparse-grounding-with-complete-screen-parsing-supervision/",source:"Microsoft Research",date:"2026-05-01"},
    {title:"Copilot vision is generally available — VS Code, github.com, CLI",url:"https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/",source:"GitHub Blog",date:"2026-07-01"}
  ],
  D3: [
    {title:"Gemini app becomes more agentic: Daily Brief + Gemini Spark 24/7 proactive agent",url:"https://blog.google/innovation-and-ai/products/gemini-app/next-evolution-gemini-app/",source:"Google Blog",date:"2026-05-19"},
    {title:"ProAct: AI agent predicts user needs during idle time, reduces hallucinations 28%",url:"https://tech.yahoo.com/ai/articles/ai-agents-learning-predict-users-202453441.html",source:"Yahoo Tech",date:"2026-05-28"},
    {title:"Google Now Could Return With the Power of Gemini — 'Your Day' proactive feed",url:"https://www.droid-life.com/2026/04/13/google-now-could-return-with-the-power-of-gemini/",source:"Droid Life",date:"2026-04-13"}
  ],
  D4: [
    {title:"Lenovo and Motorola Qira — Personal Ambient Intelligence Across Devices (CES 2026)",url:"https://news.lenovo.com/pressroom/press-releases/lenovo-unveils-lenovo-and-motorola-qira/",source:"Lenovo",date:"2026-01-06"},
    {title:"Qira Q&A: How Lenovo's Cross-Device AI Will Keep You in the Zone",url:"https://ca.pcmag.com/ai/13316/qira-qa-how-lenovos-cross-device-ai-will-keep-you-in-the-zone-ces-2026",source:"PCMag",date:"2026-01-13"},
    {title:"TopoClaw: Open-Source Cross-Device AI Agent for Android and Windows",url:"https://github.com/MadeAgents/TopoClaw",source:"GitHub / MadeAgents",date:"2026-04-22"}
  ],
  D5: [
    {title:"Hume AI Review 2026: Empathic Voice AI Analyzing 50+ Emotional Dimensions",url:"https://toolchase.com/tool/hume-ai/",source:"ToolChase",date:"2026-05-03"},
    {title:"Multi-agent social intelligence with Strands Agents and Amazon Bedrock (AWS)",url:"https://aws.amazon.com/blogs/machine-learning/multi-agent-social-intelligence-with-strands-agents-and-amazon-bedrock/",source:"AWS Blog",date:"2026-07-14"},
    {title:"SocialR1-8B: Social Reasoning Model with Theory-of-Mind via Trajectory-Level RL",url:"https://huggingface.co/Jincenzi/SocialR1-8B",source:"Hugging Face",date:"2026-06-09"}
  ],
  E1: [
    {title:"MCP 2026-07-28 Release Candidate — stateless core, HTTP routing, MCP Apps",url:"https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/",source:"MCP Blog",date:"2026-05-21"},
    {title:"Beta SDKs for 2026-07-28 MCP Spec — Python v2, TypeScript v2, Go, C#",url:"https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/",source:"MCP Blog",date:"2026-06-29"},
    {title:"MCP's biggest growing pains for production use will soon be solved (The New Stack)",url:"https://thenewstack.io/model-context-protocol-roadmap-2026/",source:"The New Stack",date:"2026-03-14"}
  ],
  E2: [
    {title:"Agentic Payments: What Onchain Data Reveals About Commerce (Visa × Artemis)",url:"https://www.visa.com/en-us/thought-leadership/innovation/agentic-payments-from-the-ground-up",source:"Visa",date:"2026-07-16"},
    {title:"Visa, Stripe, Google join x402 Foundation for AI agent payments (CoinDesk)",url:"https://www.coindesk.com/business/2026/07/16/ai-payments-have-a-new-open-standards-body",source:"CoinDesk",date:"2026-07-16"},
    {title:"Visa and Banks Across Europe Reach Next Phase of Agentic Commerce",url:"https://www.visa.co.uk/about-visa/newsroom/press-releases.3457328.html",source:"Visa",date:"2026-07-02"}
  ],
  E3: [
    {title:"Matter 1.6: Multi-Ecosystem Experiences, NFC Commissioning, Context-Driven Control",url:"https://csa-iot.org/newsroom/matter-1-6-enables-more-intuitive-setup-multi-ecosystem-experiences-and-context-driven-control/",source:"CSA-IoT",date:"2026-06-17"},
    {title:"TELUS unveils world's first smart home AI assistant with Generative UI",url:"https://www.prnewswire.com/news-releases/telus-unveils-the-worlds-first-smart-home-ai-assistant-with-generative-ui-unifying-the-entire-connected-home-886174027.html",source:"PR Newswire",date:"2026-03-19"},
    {title:"Home Assistant migrates to matter.js — Matter 1.5.1, 38% of instances",url:"https://www.home-assistant.io/blog/2026/06/23/the-matter-upgrade-youve-been-waiting-for/",source:"Home Assistant",date:"2026-06-23"}
  ],
  E4: [
    {title:"Apptronik Robot Park: 90K sq ft facility training Apollo humanoid robots with Google DeepMind",url:"https://www.globenewswire.com/news-release/2026/06/30/3319598/0/en/Welcome-to-Robot-Park.html",source:"GlobeNewswire",date:"2026-06-30"},
    {title:"Apptronik's robot park to speed humanoid AI development through real tasks",url:"https://interestingengineering.com/ai-robotics/apptronik-robot-park-humanoid-ai-development",source:"Interesting Engineering",date:"2026-07-01"},
    {title:"Apptronik's Humanoid Robots Are Practicing for Their First Real Jobs (Business Insider)",url:"https://www.businessinsider.com/apptroniks-humanoid-robots-are-practicing-for-their-first-real-jobs-2026-6",source:"Business Insider",date:"2026-06-30"}
  ],
  E5: [
    {title:"A2A Protocol v1.0 Ships: Production-Ready Agent-to-Agent Communication (Linux Foundation)",url:"https://github.com/a2aproject/A2A/blob/main/docs/announcing-1.0.md",source:"A2A / Linux Foundation",date:"2026-05-28"},
    {title:"A2A Protocol Surpasses 150 Organizations, Lands in Major Cloud Platforms",url:"https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations",source:"Linux Foundation",date:"2026-04-09"},
    {title:"Agentic Resource Discovery (ARD) Specification — Google, Microsoft, GitHub, Hugging Face",url:"https://developers.googleblog.com/en/announcing-the-agentic-resource-discovery-specification/",source:"Google Developers",date:"2026-06-17"}
  ],
  F1: [
    {title:"Google Systems Engineering Playbook: Optimizing Qwen 3.5-397B MoE on Ironwood TPU7x",url:"https://developers.googleblog.com/systems-engineering-playbook-optimizing-qwen-35-397b-moe-on-ironwood-tpu7x/",source:"Google Developers",date:"2026-06-01"},
    {title:"Faster MoE LLM Inference for Extremely Large Models (ACL 2026)",url:"https://aclanthology.org/2026.findings-acl.2140.pdf",source:"ACL 2026",date:"2026-07-01"},
    {title:"LatentMoE: Toward Optimal Accuracy per FLOP and Parameter in MoE",url:"https://arxiv.org/pdf/2601.18089",source:"arXiv",date:"2026-01-30"}
  ],
  F2: [
    {title:"LLM Latency Benchmarks 2026: 6 Levers for Sub-500ms TTFT",url:"https://www.kunalganglani.com/blog/llm-latency-benchmark-optimization",source:"Kunal Ganglani",date:"2026-07-03"},
    {title:"LLM Benchmark 2026 — 26 Providers, Latency & Cost — VerticalAPI",url:"https://verticalapi.com/benchmark/",source:"VerticalAPI",date:"2026-06-01"},
    {title:"AI Model Latency Benchmarks 2026: TTFT & TPS Data (Digital Applied)",url:"https://www.digitalapplied.com/blog/ai-model-latency-benchmarks-2026-ttft-throughput",source:"Digital Applied",date:"2026-06-01"}
  ],
  F3: [
    {title:"DeepSeek Official Models & Pricing — V4 Flash / V4 Pro",url:"https://api-docs.deepseek.com/quick_start/pricing/",source:"DeepSeek",date:"2026-07-01"},
    {title:"Deepseek makes 75% discount permanent, pricing 34x below GPT-5.5",url:"https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5/",source:"The Decoder",date:"2026-05-27"},
    {title:"DeepSeek made 75% discount permanent. The AI price war just escalated. (TNW)",url:"https://thenextweb.com/news/deepseek-v4-pro-75-percent-price-cut-permanent",source:"TNW",date:"2026-05-27"}
  ],
  F4: [
    {title:"llama.cpp on Snapdragon Hexagon NPU: First Real Benchmarks",url:"https://specpicks.com/reviews/llama-cpp-snapdragon-hexagon-npu-benchmarks-2026",source:"SpecPicks",date:"2026-06-01"},
    {title:"QHexRT Is Live: Full-Stack NPU Inference for Qualcomm Hexagon (Hugging Face)",url:"https://huggingface.co/blog/runanywhere/qhexrt-intro",source:"Hugging Face",date:"2026-06-01"},
    {title:"Benchmarked Llama 3.2 3B on Snapdragon X Plus — beat Qualcomm's numbers",url:"https://medium.com/@kulmiyea/i-benchmarked-llama-3-2-3b-on-a-snapdragon-x-plus-and-beat-qualcomms-published-numbers-1ed22f002ffd",source:"Medium",date:"2026-05-01"}
  ],
  F5: [
    {title:"ChatGPT Reaches 1 Billion Users as Rivals Post 640% and 973% Growth",url:"https://finance.yahoo.com/sectors/technology/articles/chatgpt-reaches-1-billion-users-124854578.html",source:"Yahoo Finance",date:"2026-06-15"},
    {title:"ChatGPT Reaches 1 Billion Users as the AI Economy Takes Shape (PYMNTS)",url:"https://www.pymnts.com/news/artificial-intelligence/2026/chatgpt-reaches-1-billion-users-as-the-ai-economy-takes-shape/",source:"PYMNTS",date:"2026-06-15"},
    {title:"How ChatGPT adoption broadened in early 2026 (OpenAI Signals Q1 Update)",url:"https://openai.com/signals/research/2026q1-update/",source:"OpenAI",date:"2026-04-01"}
  ],
  G1: [
    {title:"CrowdStrike Unveils Continuous Identity for AI Agents",url:"https://www.crowdstrike.com/en-us/press-releases/crowdstrike-unveils-continuous-identity-for-ai-agents/",source:"CrowdStrike",date:"2026-06-15"},
    {title:"CrowdStrike Continuous Identity AI Agent Security Solution Analysis",url:"https://www.securitypost.org/en/articles/crowdstrike-unveils-ai-agent-identity-security",source:"SecurityPost",date:"2026-06-15"},
    {title:"Least privilege for AI agents: Identity, access, and tool binding (Microsoft)",url:"https://windowsnews.ai/article/microsofts-ai-agent-security-playbook-give-them-an-identity-not-a-master-key.438968",source:"Microsoft Security",date:"2026-07-16"}
  ],
  G2: [
    {title:"GPT-Red: Unlocking Self-Improvement for Robustness (OpenAI)",url:"https://openai.com/index/unlocking-self-improvement-gpt-red/",source:"OpenAI",date:"2026-07-15"},
    {title:"Meet GPT-Red: an LLM super-hacker OpenAI built to make its models safer (MIT Tech Review)",url:"https://www.technologyreview.com/2026/07/15/1140514/meet-gpt-red-an-llm-super-hacker-openai-built-to-make-its-models-safer/",source:"MIT Technology Review",date:"2026-07-15"},
    {title:"GPT-Red beat human red teamers on a prompt injection test (Help Net Security)",url:"https://www.helpnetsecurity.com/2026/07/16/openai-gpt-red-prompt-injection-test/",source:"Help Net Security",date:"2026-07-16"}
  ],
  G3: [
    {title:"OpenAI Built an AI to Attack Itself: GPT-Red Exposed Flaws Humans Missed (TechTimes)",url:"https://www.techtimes.com/articles/320656/20260715/openai-built-ai-attack-itself-gpt-red-exposed-flaws-humans-missed.htm",source:"TechTimes",date:"2026-07-15"},
    {title:"GPT-Red: OpenAI Is Training Models to Break Other Models (RisingStack)",url:"https://blog.risingstack.com/gpt-red-openai-self-improving-ai-security/",source:"RisingStack",date:"2026-07-15"},
    {title:"Beyond Surface-Level Detection: Cognitive-Driven Defense Against Jailbreak Attacks (ACL 2026)",url:"https://aclanthology.org/2026.acl-long.125/",source:"ACL 2026",date:"2026-07-01"}
  ],
  G4: [
    {title:"Expanding Private Cloud Compute — Apple extends PCC to Google Cloud (Apple Security)",url:"https://security.apple.com/blog/expanding-pcc/",source:"Apple Security",date:"2026-06-08"},
    {title:"Apple says its AI is still private, even when running on Google's servers (Ars Technica)",url:"https://arstechnica.com/apple/2026/06/apple-says-its-ai-is-still-private-even-when-its-running-on-googles-servers/",source:"Ars Technica",date:"2026-06-09"},
    {title:"Apple Extends Private Cloud Compute to Google Cloud for the First Time (InfoQ)",url:"https://www.infoq.com/news/2026/07/apple-pcc-google-cloud/",source:"InfoQ",date:"2026-07-01"}
  ],
  G5: [
    {title:"Claude's new constitution (Anthropic)",url:"https://www.anthropic.com/news/claude-new-constitution",source:"Anthropic",date:"2026-01-22"},
    {title:"Teaching Claude Why — Anthropic Alignment Blog",url:"https://alignment.anthropic.com/2026/teaching-claude-why/",source:"Anthropic Alignment",date:"2026-03-01"},
    {title:"Expert Comment: In Claude We Trust? Evaluating the New Constitution (Oxford)",url:"https://www.ox.ac.uk/news/2026-03-27-expert-comment-claude-we-trust-evaluating-new-constitution",source:"Oxford University",date:"2026-03-27"}
  ],
  G6: [
    {title:"EU AI Act Enforcement Is Here: Chatbot Rules Live, High-Risk AI Binding Law (TechTimes)",url:"https://www.techtimes.com/articles/320101/20260710/eu-ai-act-enforcement-here-chatbot-rules-live-high-risk-ai-delay-now-binding-law.htm",source:"TechTimes",date:"2026-07-10"},
    {title:"Compliance and Enforcement in Global AI Regulation (Foley & Lardner)",url:"https://www.foley.com/insights/publications/2026/07/compliance-and-enforcement-in-global-ai-regulation-eu-ai-act-risks/",source:"Foley & Lardner",date:"2026-07-01"},
    {title:"Enforcement of the AI Act (European Parliamentary Research Service)",url:"https://epthinktank.eu/2026/03/18/enforcement-of-the-ai-act/",source:"EU Parliament Research",date:"2026-03-18"}
  ],
  H1: [
    {title:"The 2026-07-28 MCP Specification Release Candidate (MCP Blog)",url:"https://blog.modelcontextprotocol.io/posts/2026-07-28-release-candidate/",source:"MCP Blog",date:"2026-05-21"},
    {title:"Beta SDKs for the 2026-07-28 MCP Spec — Python v2, TypeScript v2",url:"https://blog.modelcontextprotocol.io/posts/sdk-betas-2026-07-28/",source:"MCP Blog",date:"2026-06-29"},
    {title:"Code execution with MCP: building more efficient AI agents (Anthropic Engineering)",url:"https://www.anthropic.com/engineering/code-execution-with-mcp",source:"Anthropic",date:"2026-06-01"}
  ],
  H2: [
    {title:"AI Agent Marketplaces 2026: Discovery and Distribution (Digital Applied)",url:"https://www.digitalapplied.com/blog/ai-agent-marketplaces-2026-discovery-distribution",source:"Digital Applied",date:"2026-06-01"},
    {title:"Claude Skills vs ChatGPT GPTs vs Gemini Gems: 2026 Comparison",url:"https://www.open-claw.sh/blog/claude-skills-vs-chatgpt-gpts-vs-gemini-gems",source:"OpenClaw",date:"2026-06-01"},
    {title:"GPT Store Alternative 2026: Why Agensi Is What the GPT Store Should Have Been",url:"https://www.agensi.io/learn/gpt-store-alternative-2026",source:"Agensi",date:"2026-06-01"}
  ],
  H3: [
    {title:"ChatGPT's market share slips below 50% for first time (TechCrunch)",url:"https://techcrunch.com/2026/06/16/chatgpts-market-share-slips-below-50-for-first-time/",source:"TechCrunch",date:"2026-06-16"},
    {title:"State Of AI July 2026 - Usage Statistics, Model Updates and More",url:"https://www.stanventures.com/news/state-of-ai-july-2026-usage-statistics-model-updates-and-more-7443/",source:"Stan Ventures",date:"2026-07-01"},
    {title:"ChatGPT Users Statistics 2026: 1 Billion Active Users (Axis Intelligence)",url:"https://axis-intelligence.com/chatgpt-users-statistics/",source:"Axis Intelligence",date:"2026-06-01"}
  ],
  H4: [
    {title:"Americans' Views on AI Chatbots, Smart Devices and AI's Impact (Pew Research)",url:"https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/",source:"Pew Research",date:"2026-06-17"},
    {title:"Why don't Americans use chatbots? (Pew Research)",url:"https://www.pewresearch.org/internet/2026/06/17/why-dont-people-use-chatbots/",source:"Pew Research",date:"2026-06-17"},
    {title:"How Americans' opinions and use of AI differ by age (Pew Research)",url:"https://www.pewresearch.org/internet/2026/06/17/how-opinions-and-use-of-ai-differ-by-age/",source:"Pew Research",date:"2026-06-17"}
  ],
  H5: [
    {title:"Ipsos AI Monitor 2026: A 32-country Global Advisor Survey",url:"https://www.ipsos.com/sites/default/files/ct/news/documents/2026-06/Ipsos-AI-Monitor-2026.pdf",source:"Ipsos",date:"2026-06-01"},
    {title:"Global Attitudes on AI 2026: The Wonder vs. Worry Divide Deepens (Ipsos)",url:"https://www.ipsos.com/en-us/global-attitudes-ai-2026-wonder-vs-worry-divide-deepens",source:"Ipsos",date:"2026-06-25"},
    {title:"Americans and AI 2026: Chatbots, Smart Devices and Views on Impact (Pew Research)",url:"https://www.pewresearch.org/wp-content/uploads/sites/20/2026/06/PI_2026.06.17_Americans-and-AI_REPORT.pdf",source:"Pew Research",date:"2026-06-17"}
  ],
  H6: [
    {title:"Gartner Forecasts Worldwide AI Spending to Grow 47% in 2026",url:"https://www.gartner.com/en/newsroom/press-releases/2026-05-19-gartner-forecasts-worldwide-ai-spending-to-grow-47-percent-in-2026",source:"Gartner",date:"2026-05-19"},
    {title:"OpenAI Revenue 2026: $25B ARR and Still Losing $14B a Year (ValueAddVC)",url:"https://valueaddvc.com/blog/openai-revenue-2026-20b-arr-4b-month-path-to-profitability",source:"ValueAdd VC",date:"2026-06-07"},
    {title:"OpenAI Statistics 2026: Revenue, Users & Market Share (Axis Intelligence)",url:"https://axis-intelligence.com/openai-statistics/",source:"Axis Intelligence",date:"2026-06-01"}
  ]
};

// Score articles
function scoreArticle(t) {
  const title = (t.title || '').toLowerCase();
  let s = 50;
  if (/breakthrough|first|record|sota|surpass/i.test(title)) s += 15;
  else if (/launch|release|announce|introduc/i.test(title)) s += 10;
  if (/openai|google|anthropic|microsoft|apple/i.test(t.source||'')) s += 10;
  else if (/arxiv|acl|icml|iclr|aaai/i.test(t.source||'')) s += 5;
  const daysAgo = (Date.now() - new Date(t.date).getTime()) / 86400000;
  if (daysAgo <= 30) s += 10; else if (daysAgo <= 90) s += 5;
  return Math.min(100, Math.max(0, Math.round(s)));
}

let added = 0;
for (const node of d.nodes) {
  if (!BULK[node.id]) continue;
  const existingUrls = new Set((node.news || []).map(n => n.url));
  const fresh = BULK[node.id]
    .filter(a => a.url && !existingUrls.has(a.url))
    .map(a => ({
      date: a.date,
      title: a.title.slice(0, 200),
      url: a.url,
      source: a.source,
      direction: 'positive',
      signal_score: scoreArticle(a)
    }));

  if (fresh.length > 0) {
    node.news = [...fresh, ...(node.news || [])].slice(0, 10);
    added += fresh.length;
  }
}

d.meta.lastUpdated = new Date().toISOString().slice(0, 10);
fs.writeFileSync('data.json', JSON.stringify(d, null, 2), 'utf8');

const total = d.nodes.reduce((s,n) => s + (n.news||[]).length, 0);
const avg = (total / d.nodes.length).toFixed(1);
const min5 = d.nodes.filter(n => (n.news||[]).length >= 5).length;
console.log(`Added: ${added} articles`);
console.log(`Total: ${total} news | Avg: ${avg}/node | Nodes with ≥5: ${min5}/${d.nodes.length}`);
