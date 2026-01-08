/**
 * LEARNING CONTENT DATA
 * 
 * This file contains all course content in a simple, scalable structure.
 * Add new sections by creating new objects in the array.
 */

export interface KnowledgeCheck {
  type: "knowledge-check";
  question: string;
  options: string[];
  correctAnswer: number | number[]; // index of correct option or array of indices for multiple correct answers
  explanation?: string;
  multipleCorrect?: boolean; // indicates if this is a "select all that apply" question
}

export interface OpenTextQuestion {
  type: "open-text";
  question: string;
  correctAnswer: string; // exact URL or text expected
  explanation?: string;
  placeholder?: string;
  hint?: string;
}

export interface VideoLink {
  type: "video";
  title: string;
  description: string;
  url: string;
  duration: string; // e.g., "2 min"
}

export interface PodcastLink {
  type: "podcast";
  title: string;
  description?: string;
  url: string;
  duration?: string;
}

export interface DragDropExercise {
  type: "drag-drop";
}

export interface AIConversionFlowComponent {
  type: "ai-conversion-flow";
}

export interface FrameworkBenefitsComponent {
  type: "framework-benefits";
}

export interface RealWorldReferencesComponent {
  type: "real-world-references";
}

export interface ExploreAgenticAIComponent {
  type: "explore-agentic-ai";
}

export interface BlindSpotsIntroComponent {
  type: "blind-spots-intro";
}

export interface BuildTrustComponent {
  type: "build-trust";
}

export interface AIResearchActivityComponent {
  type: "ai-research-activity";
}

export interface KPIsAppliedToOperationsComponent {
  type: "kpis-applied-to-operations";
}

export interface SurveyFeedbackComponent {
  type: "survey-feedback";
}

export interface LessonProgressComponent {
  type: "lesson-progress";
}

export interface CheckingInComponent {
  type: "checking-in";
}

export interface ContentBlock {
  paragraphs?: string[];
  lists?: {
    title: string;
    items: string[];
  }[];
  callouts?: {
    text: string;
    source: string;
  }[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentBlock;
  components?: (KnowledgeCheck | OpenTextQuestion | VideoLink | PodcastLink | DragDropExercise | AIConversionFlowComponent | FrameworkBenefitsComponent | RealWorldReferencesComponent | ExploreAgenticAIComponent | BlindSpotsIntroComponent | BuildTrustComponent | AIResearchActivityComponent | KPIsAppliedToOperationsComponent | SurveyFeedbackComponent | LessonProgressComponent | CheckingInComponent)[]; // Array of different component types
}

export const sections: Section[] = [
  {
    id: "welcome-objectives",
    title: "Welcome Objectives",
    content: {},
    components: [
      {
        type: "video",
        title: "Welcome to your first Micro-lesson",
        description: "ORA is an agile persona representing an expert perspective. The AI generated video is based on a real Subject Matter Expert (SME) with validated information. Start learning now!",
        url: "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/EmoLiteracy1.mp4",
        duration: "3 min"
      }
    ]
  },
  {
    id: "introduction",
    title: "Introduction",
    content: {
      paragraphs: [
        "This lesson introduces digital persona's. Leveraging personas can accelerate development, boost customer satisfaction, and increase overall return on investment. Digital personas help teams make clear, focused decisions that stay aligned with the people they support. They turn raw data into relatable profiles that reflect real values, behaviors, needs, and motivations, making digital transformation easier to understand and execute. In fast‑moving environments, digital personas drive innovation and speed up development, especially in human‑centered design."
      ]
    },
    components: [
      {
        type: "video",
        title: "Leveraging Digital Personas for Agility",
        description: "Watch this overview to see how personas bring user data to life",
        url: "https://www.youtube.com/watch?v=example",
        duration: "3 min"
      },
      {
        type: "knowledge-check",
        question: "What is a digital persona primarily based on?",
        options: [
          "Fictional stories and imagination",
          "Real user experience, research, data, and observations",
          "Marketing campaigns only",
          "Random character traits"
        ],
        correctAnswer: 1,
        explanation: "A persona is a semi-fictional character based on real user experience, research, data, and observations, making it grounded in actual user insights."
      },
      {
        type: "checking-in"
      }
    ]
  },
  {
    id: "ai-costs",
    title: "AI Costs & Tokens",
    content: {
      paragraphs: [
        "Everything has a cost, and AI is no exception. Every piece of information an AI processes must be converted into tokens, and that conversion takes real energy, compute, and infrastructure. Those tokens aren't abstract — they carry a measurable price, making AI powerful but never free. As AI usage grows, the energy required to generate and process these tokens increases as well, driving higher electricity demand and expanding the environmental footprint of data centers worldwide. To get a real return on our AI investment, we must understand these costs and manage them responsibly."
      ]
    },
    components: [
      {
        type: "ai-conversion-flow"
      },
      {
        type: "ai-research-activity"
      },
      {
        type: "knowledge-check",
        question: "What makes AI usage have a measurable cost?",
        options: [
          "AI systems are free to use once implemented",
          "Only the initial setup costs money, but ongoing use is free",
          "Every piece of information processed must be converted into tokens, which require energy, compute, and infrastructure",
          "Tokens are abstract concepts with no real cost"
        ],
        correctAnswer: 2,
        explanation: "AI processes information by converting it into tokens, and that conversion requires real energy, compute power, and infrastructure — all of which carry measurable costs."
      }
    ]
  },
  {
    id: "ai-literacy",
    title: "What is AI Literacy?",
    content: {
      paragraphs: [
        "In the broadest sense, AI refers to machines capable of learning, reasoning, and acting independently — often in ways that mimic human-like behavior such as problem-solving, adapting to new situations, and even communicating naturally.",
        "Artificial Intelligence literacy is the ability to understand, use, and evaluate AI tools responsibly through trusted, evidence‑based frameworks. It involves knowing how AI works, what it can and cannot do, and how to use it effectively and ethically. AI literacy helps us spot waste, risk and bias.",
        "Having a shared vocabulary allows teams to operate with common rules of engagement, making it easier to govern, manage, collaborate and solve problems for the greater good."
      ],
      callouts: [
        {
          text: "Career success increasingly depends on the ability to collaborate with AI systems, not just traditional skills",
          source: "Forbes"
        },
        {
          text: "WEF predicts 170 million new roles will be created by AI over the next decade, making AI literacy essential for workforce readiness",
          source: "World Economic Forum (WEF) Findings"
        },
        {
          text: "AI literacy enables the workforce to recognize bias and risk before they cause costly losses.",
          source: ""
        }
      ],
      lists: [
        {
          title: "AI Bias",
          items: [
            "Algorithms may weigh certain features (like word choice, school, or zip code) that highly correlate with race, gender, or socioeconomic status."
          ]
        },
        {
          title: "AI Risk",
          items: [
            "Vendor lock‑in is both a security threat and an innovation blocker. Vendor lock‑in creates systemic vulnerabilities, reduces visibility, and makes it harder to switch to more secure alternatives. Restrictive contracts and prohibitive proprietary integrations have proven to prevent experimentation and organizational growth at scale."
          ]
        }
      ]
    },
    components: [
      {
        type: "blind-spots-intro"
      },
      {
        type: "drag-drop"
      }
    ]
  },
  {
    id: "ai-research",
    title: "AI Research",
    content: {
      paragraphs: [
        "AI is moving faster than anything we've ever seen — new capabilities are dropping so quickly that even experts can't keep up. Research, engineering, and development are accelerating at a breakneck pace, and Agentic AI is poised to scale globally, reshaping how people learn, work, and communicate almost overnight. This shift demands a new brand of leadership and opens the door to entirely new job roles and career opportunities for those ready to adapt.",
        "The most valuable skill isn't finding information; it's filtering it. Being able to verify sources, detect bias, and combine insights into an argument or strategy is what separates passive consumers from future analysts, founders, and journalists.",
        "Why it matters: Every field, from policy to product development, requires synthesis of data from multiple inputs. Employers need people who can leverage AI for research without losing judgment.",
        "NotebookLM is the AI‑powered research and note‑taking tool from Google. It lets you upload your own materials—PDFs, Google Docs, websites, YouTube videos, audio files, and more—and then it becomes a kind of personalized expert on those sources. AI leaders can research and articulate new capabilities with learning and study support, including:",
        "Visit https://notebooklm.google.com to get started!"
      ],
      lists: [
        {
          title: "NotebookLM Features",
          items: [
            "Interview practice",
            "Presentation support",
            "Research assistance",
            "Resume optimization",
            "Study support and mind‑mapping",
            "Podcasting"
          ]
        }
      ]
    },
    components: [
      {
        type: "video",
        title: "Get Started with NotebookLM",
        description: "Watch this video to learn how to use Google's AI-powered research tool",
        url: "https://notebooklm.google.com",
        duration: "2 min"
      },
      {
        type: "real-world-references"
      },
      {
        type: "knowledge-check",
        question: "What are the key capabilities of NotebookLM? (Select all that apply)",
        options: [
          "It can transform your research into presentations, infographics, and podcasts",
          "It becomes a personalized expert on your uploaded materials (PDFs, videos, audio, etc.)",
          "It can help with interview practice, resume optimization, and study support",
          "It requires you to be an AI expert to use effectively"
        ],
        correctAnswer: [0, 1, 2],
        multipleCorrect: true,
        explanation: "NotebookLM is a versatile AI tool that transforms research into various formats, becomes an expert on your materials, and provides support for interviews, resumes, and studying. It's designed to be accessible without requiring AI expertise."
      }
    ]
  },
  {
    id: "trusted-frameworks",
    title: "Trusted Frameworks",
    content: {
      paragraphs: [
        "AI enabled leaders must be well versed in an array of proven frameworks. Frameworks are trusted guardrails for success when working within complex systems. They are strategic enablers to ensure that AI innovation is responsible, scalable, and human-centered, balancing speed with oversight.",
        "Frameworks like NIST's AI Risk Management Framework, Agile, Scrum, and ORA provide structured ways to balance innovation with governance. They help organizations harness AI responsibly, adapt quickly to change, and ensure human oversight remains central."
      ]
    },
    components: [
      {
        type: "video",
        title: "Leading by Example",
        description: "Watch Chief Warrant Officer give a brief introduction to how frameworks guide innovation. He is an agile persona representing an expert perspective. The AI generated video is based on a real Subject Matter Expert with validated information, keeping humans-in-the-loop.",
        url: "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/CWO-John2026.mp4",
        duration: "3 min"
      },
      {
        type: "framework-benefits"
      },
      {
        type: "knowledge-check",
        question: "Why are frameworks essential for AI-enabled leaders?",
        options: [
          "They slow down innovation to ensure every decision is carefully reviewed",
          "They provide trusted guardrails that balance innovation with governance while enabling scale",
          "They eliminate the need for human oversight in AI systems",
          "They are only useful for technical teams, not leadership"
        ],
        correctAnswer: 1,
        explanation: "Frameworks are strategic enablers that provide trusted guardrails for complex systems, balancing speed with oversight while ensuring AI innovation is responsible, scalable, and human-centered."
      }
    ]
  },
  {
    id: "applied-agentic-ai",
    title: "Applied Agentic AI",
    content: {
      paragraphs: [
        "AI isn't a model or a tool — it's a whole stack. Transformation happens when those layers connect, with humans at the center.",
        "The true power is unlocked by Agentic AI: building agents that can spot patterns, reason, coordinate, and act across your ecosystem.",
        "Effective oversight never rests on a single person. Customer experience stays trustworthy and adaptive when human‑in‑the‑loop oversight shapes every AI‑driven interaction — and that's where agents step in. They provide the judgment, context, and accountability that AI alone can't deliver, ensuring every outcome aligns with customer expectations and organizational values."
      ]
    },
    components: [
      {
        type: "explore-agentic-ai"
      },
      {
        type: "knowledge-check",
        question: "What is the key distinction of Applied Agentic AI?",
        options: [
          "AI is just a single model that can solve all problems",
          "AI is a whole stack where transformation happens when layers connect with humans at the center",
          "AI should operate independently without human involvement",
          "AI is only for data scientists who work with siloed fragmented data."
        ],
        correctAnswer: 1,
        explanation: "AI isn't just a model or a tool — it's a whole stack. True transformation happens when those layers connect, with humans at the center providing oversight, judgment, and accountability."
      }
    ]
  },
  {
    id: "build-trust",
    title: "Build Trust",
    content: {},
    components: [
      {
        type: "build-trust"
      },
      {
        type: "open-text",
        question: "Paste the URL where a RACI Matrix Template can be found:",
        correctAnswer: "https://www.smartsheet.com/content/raci-templates-excel",
        placeholder: "Paste the URL here...",
        hint: "Look in the Build Trust section for a link to the RACI Matrix Template",
        explanation: "Great! This Smartsheet resource provides templates to help you implement RACI matrices in your organization."
      },
      {
        type: "knowledge-check",
        question: "What is the RACI matrix used for in AI governance?",
        options: [
          "To measure AI model performance",
          "To define roles and responsibilities for tasks and deliverables (Responsible, Accountable, Consulted, Informed)",
          "To calculate project budgets",
          "To track employee attendance"
        ],
        correctAnswer: 1,
        explanation: "The RACI matrix is a project-management tool used to define who does what for every task or deliverable, assigning roles as Responsible, Accountable, Consulted, and Informed."
      },
      {
        type: "knowledge-check",
        question: "Which two laws codify public access to information and accountable decision‑making?",
        options: [
          "The Clinger‑Cohen Act and the Evidence‑Based Policymaking Act",
          "The Information Technology Management Reform Act and HIPAA",
          "The Freedom of Information Act and the Open Government Act",
          "The Federal Acquisition Reform Act and the Privacy Act"
        ],
        correctAnswer: 2,
        explanation: "The Freedom of Information Act and the Open Government Act both promote transparency and public access to government information."
      }
    ]
  },
  {
    id: "kpis-applied-to-operations",
    title: "AI Governance KPIs",
    content: {
      callouts: [
        {
          text: "Transparency in government operations is a priority.",
          source: "Attorney General's FOIA Guidelines (March 2022)"
        }
      ]
    },
    components: [
      {
        type: "kpis-applied-to-operations"
      },
      {
        type: "knowledge-check",
        question: "What is the added value of using an AI Governance KPI Dashboard?",
        options: [
          "It helps monitor and increase ROI",
          "It provides transparency and builds trust",
          "It provides opportunities for human oversight",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "An AI Governance KPI Dashboard helps monitor and increase ROI, provides transparency and builds trust, and creates opportunities for human oversight."
      }
    ]
  },
  {
    id: "summary",
    title: "Summary",
    content: {
      paragraphs: [
        "The greatest risk in AI isn't the cost of adoption — it's standing still. AI carries two prices: what you invest to adopt it, and what you lose if you don't.",
        "A RACI matrix helps clarify who is Responsible, Accountable, Consulted, and Informed. This strengthens governance, supports compliance, and improves operational efficiency.",
        "Leaders must ask critical questions: What level of accuracy is truly required? Can lower‑cost models achieve the same outcome? Should systems be air‑gapped for privacy or distributed across multi‑cloud environments for resilience and sustainability? What Key Performance Indicators (KPI) will be used to measure AI investment?",
        "History shows what happens when organizations fail to evolve. Amazon moved from pilots to drone delivery while competitors hesitated. Blockbuster once had 9,000 stores and $6B in revenue, yet its failure to adapt left only one store standing today.",
        "The lesson is clear: the greatest danger lies in not evolving. The risks include loss of consumer confidence, loss of funding, and loss of competitive advantage — all of which can be far more costly than adopting AI in the first place."
      ]
    },
    components: [
      {
        type: "video",
        title: "Summary: The Big 3",
        description: "Watch this summary video covering the three key pillars: Risk, RACI, and Governance",
        url: "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Big3Risk-RACI-Governance.mp4",
        duration: "3 min"
      },
      {
        type: "knowledge-check",
        question: "Which United States federal principle emphasizes transparency, participation, and collaboration in government operations?",
        options: [
          "The Clinger‑Cohen Act",
          "The Federal Acquisition Regulation",
          "The Open Government Directive (M-10-06)",
          "The Privacy Act of 1974"
        ],
        correctAnswer: 2,
        explanation: "The Open Government Directive (M-10-06) is a federal principle that emphasizes transparency, participation, and collaboration in government operations, promoting open and accessible government."
      },
      {
        type: "knowledge-check",
        question: "What is a key requirement of the Clinger‑Cohen Act (CCA) regarding AI or IT investments?",
        options: [
          "They must be publicly released under FOIA",
          "They must be experimental and outsourced",
          "They must be justified, measurable, and mission‑aligned",
          "They must be procured only through open‑source vendors"
        ],
        correctAnswer: 2,
        explanation: "The Clinger‑Cohen Act requires that AI and IT investments must be justified, measurable, and mission‑aligned to ensure they deliver value and support organizational objectives."
      }
    ]
  },
  {
    id: "feedback",
    title: "Feedback",
    content: {},
    components: [
      {
        type: "survey-feedback"
      },
      {
        type: "checking-in"
      },
      {
        type: "lesson-progress"
      }
    ]
  }
];