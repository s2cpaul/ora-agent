/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 */

import { X, Mic, Heart, Send, AlertTriangle, ChevronDown, ThumbsUp, ThumbsDown, ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { sections } from "../data/content";

interface AIAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
  timestamp?: number;
  feedback?: "thumbs_up" | "thumbs_down" | null;
}

export function AIAgentModal({ isOpen, onClose }: AIAgentModalProps) {
  const DEFAULT_VIDEO = "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/DataIntro.mp4";
  const DEFAULT_RECOMMENDATION = "Enhance training for information systems and intelligence tools by setting measurable standards and coordinating with local authorities for annual updates based on modern capabilities and user feedback. Improve transparency and efficiency in decision-making.\n\nEstablish a support network of modern intelligence analysts, data specialists, trainers, and security experts to share best practices and ensure annual training stays relevant and effective.";
  const DEFAULT_OBSERVATION = "I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.";

  // Video rotation array - each video appears twice before moving to the next
  const VIDEO_ROTATION = [
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/DataIntro.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/EmoLiteracy1.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Failures1.mp4"
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [currentVideo, setCurrentVideo] = useState("https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/DataIntro.mp4");
  const [videoContainerHeight, setVideoContainerHeight] = useState<number>(300);
  const [showCautionForm, setShowCautionForm] = useState(false);
  const [observationTopic, setObservationTopic] = useState("AI Bias or Risk");
  const [observationText, setObservationText] = useState(DEFAULT_OBSERVATION);
  const [observationOtherTopic, setObservationOtherTopic] = useState("");
  const [observationType, setObservationType] = useState<"Event" | "Routine">("Event");
  const [pointOfContact, setPointOfContact] = useState("");
  const [location, setLocation] = useState("Jacksonville, NC (Camp Lejeune)");
  const [observationSentiment, setObservationSentiment] = useState("");
  const [agreeToEthicalAgreement, setAgreeToEthicalAgreement] = useState(false);
  const [wantExpertiseOpportunity, setWantExpertiseOpportunity] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isObservationRecording, setIsObservationRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [observationRecognition, setObservationRecognition] = useState<any>(null);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [showSummaryScreen, setShowSummaryScreen] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [eventAcronym, setEventAcronym] = useState("CPX");
  const [fromUnit, setFromUnit] = useState("G3");
  const [impactLevel, setImpactLevel] = useState("");
  const [studentEID, setStudentEID] = useState("");
  const [recommendation, setRecommendation] = useState(DEFAULT_RECOMMENDATION);
  
  // Report Generator fields
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase());
  const [reportReference, setReportReference] = useState("");
  const [reportFrom, setReportFrom] = useState("Rank F Name MI L Name, Billet");
  const [reportTo, setReportTo] = useState("Operations Officer");
  const [reportVia, setReportVia] = useState("Rank Name, Billet");
  const [reportSubject, setReportSubject] = useState("");
  const [reportReferenceText, setReportReferenceText] = useState("");
  const [reportBody, setReportBody] = useState("");
  const [reportingEmailAddress, setReportingEmailAddress] = useState("");
  const [isRecommendationRecording, setIsRecommendationRecording] = useState(false);
  const [recommendationRecognition, setRecommendationRecognition] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setInputValue(prev => prev + finalTranscript);
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsRecording(false);
        };

        recognitionInstance.onend = () => {
          setIsRecording(false);
        };

        setRecognition(recognitionInstance);

        // Create separate recognition instance for observation form
        const observationRecognitionInstance = new SpeechRecognition();
        observationRecognitionInstance.continuous = true;
        observationRecognitionInstance.interimResults = true;
        observationRecognitionInstance.lang = 'en-US';

        observationRecognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setObservationText(prev => prev + finalTranscript);
          }
        };

        observationRecognitionInstance.onerror = (event: any) => {
          console.error('Observation speech recognition error:', event.error);
          setIsObservationRecording(false);
        };

        observationRecognitionInstance.onend = () => {
          setIsObservationRecording(false);
        };

        setObservationRecognition(observationRecognitionInstance);

        // Create separate recognition instance for recommendation form
        const recommendationRecognitionInstance = new SpeechRecognition();
        recommendationRecognitionInstance.continuous = true;
        recommendationRecognitionInstance.interimResults = true;
        recommendationRecognitionInstance.lang = 'en-US';

        recommendationRecognitionInstance.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setRecommendation(prev => prev + finalTranscript);
          }
        };

        recommendationRecognitionInstance.onerror = (event: any) => {
          console.error('Recommendation speech recognition error:', event.error);
          setIsRecommendationRecording(false);
        };

        recommendationRecognitionInstance.onend = () => {
          setIsRecommendationRecording(false);
        };

        setRecommendationRecognition(recommendationRecognitionInstance);
      }
    }
  }, []);

  // VIDEO CONTAINER SPECIFICATIONS
  // The following system dynamically calculates container heights based on video aspect ratio
  // to ensure complete video content display without cropping or letterboxing:
  // - Container: Dynamically sized height (200px min, 233.43px max), black background, relative positioning
  // - Video Player: 100% width/height, object-contain (preserves aspect ratio, ZERO cropping)
  // - Playback: autoPlay, loop, playsInline (mobile optimization), controls enabled
  // - Interaction: Tap/click to expand to larger overlay view
  // - NO CROP RULE: Videos always fit completely within container - aspect ratio preserved, no content cut off
  // - MAX HEIGHT RULE: All videos capped at 233.43px height for consistent default display across all topics

  // Reset to default video when modal opens with rotation logic
  useEffect(() => {
    if (isOpen) {
      // Get rotation state from localStorage
      const rotationData = localStorage.getItem('videoRotationState');
      let currentIndex = 0;
      let showCount = 0;
      
      if (rotationData) {
        const parsed = JSON.parse(rotationData);
        currentIndex = parsed.currentIndex || 0;
        showCount = parsed.showCount || 0;
      }
      
      // Check if current video has been shown twice
      if (showCount >= 2) {
        // Move to next video in rotation
        currentIndex = (currentIndex + 1) % VIDEO_ROTATION.length;
        showCount = 1; // Reset to 1 for the new video (this is the first time showing it)
      } else {
        // Increment show count for current video
        showCount++;
      }
      
      // Save updated state
      localStorage.setItem('videoRotationState', JSON.stringify({
        currentIndex,
        showCount
      }));
      
      // Set the video to display
      setCurrentVideo(VIDEO_ROTATION[currentIndex]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Play video when currentVideo changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load(); // Load the new source
      videoRef.current.play().catch(err => {
        console.log("Video autoplay prevented:", err);
      });
    }
  }, [currentVideo]);

  if (!isOpen) return null;

  // Function to log questions to localStorage
  const logQuestion = (topic: string, question: string, isPillButton: boolean) => {
    const stored = localStorage.getItem("agentQuestionLogs");
    const logs = stored ? JSON.parse(stored) : [];
    
    logs.push({
      topic,
      question,
      timestamp: Date.now(),
      isPillButton
    });
    
    localStorage.setItem("agentQuestionLogs", JSON.stringify(logs));
  };

  // Comprehensive conversation logging for analytics
  const logConversation = (userQuestion: string, aiResponse: string, pillButtonContext?: string) => {
    const stored = localStorage.getItem("conversationLogs");
    const logs = stored ? JSON.parse(stored) : [];
    
    const conversationLog = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: `session_${Date.now()}`,
      userId: "user_demo", // In production, use actual user ID
      userTier: "free", // In production, get from user profile
      timestamp: Date.now(),
      userQuestion,
      aiResponse,
      pillButtonContext,
      tokensUsed: Math.ceil((userQuestion.length + aiResponse.length) / 4), // Rough estimate
      conversationLength: messages.length + 1,
      dataConsent: localStorage.getItem("dataConsent") === "true",
      feedback: null
    };
    
    logs.push(conversationLog);
    localStorage.setItem("conversationLogs", JSON.stringify(logs));
    
    return conversationLog.id;
  };

  // Handle feedback (thumbs up/down)
  const handleFeedback = (messageId: string, feedbackType: "thumbs_up" | "thumbs_down") => {
    // Update message feedback
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
    ));

    // Update conversation log
    const stored = localStorage.getItem("conversationLogs");
    if (stored) {
      const logs = JSON.parse(stored);
      const updatedLogs = logs.map((log: any) => {
        if (log.id === messageId) {
          return { ...log, feedback: feedbackType };
        }
        return log;
      });
      localStorage.setItem("conversationLogs", JSON.stringify(updatedLogs));
    }
  };

  const aiTopics = [
    "Applied AI for Transformation",
    "USMC Knowledge Management",
    "Human Health & Fitness",
    "Frameworks for Innovation",
    "AI Blind Spots & Pitfalls",
    "Governance & Workforce Readiness",
    "KPI & ROI",
    "Training",
    "Next Live Q & A"
  ];

  // Map topics to video URLs
  const topicVideoMap: Record<string, string> = {
    "Applied AI for Transformation": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/MIT_Arnold.mp4",
    "Human Health & Fitness": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/KleeKaren2.mp4",
    "USMC Knowledge Management": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/CWO-John2026.mp4",
    "Frameworks for Innovation": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4",
    "AI Blind Spots & Pitfalls": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Big3Risk-RACI-Governance.mp4",
    "Governance & Workforce Readiness": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/SSgtW.mp4",
    "Training": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Process-Citrus.mp4",
  };

  // Search in-app content for relevant information
  const searchContentForAnswer = (query: string): string | null => {
    const lowerQuery = query.toLowerCase();
    
    // Special case for ROI queries (standalone, not part of open government context)
    if (lowerQuery.includes("roi") || lowerQuery.includes("return on investment")) {
      return "Return on Investment (ROI) is a simple way to measure how much value you get back compared to what you put in. It's used in business, finance, marketing, training programs, and even personal decisions.";
    }
    
    // Special case for Open Government Act / Budget queries
    if (lowerQuery.includes("open government") || lowerQuery.includes("budget")) {
      return "The Open Government requires Machine-Readable Data — Open Government data assets made available by all agencies. [https://www.congress.gov/bill/115th-congress/house-bill/1770/text](https://www.congress.gov/bill/115th-congress/house-bill/1770/text)";
    }
    
    // Special case for Free AI Leadership Training queries
    if (lowerQuery.includes("free") && (lowerQuery.includes("ai") || lowerQuery.includes("leadership") || lowerQuery.includes("training"))) {
      return "For free AI leadership training, check out: https://agent.myora.now\n\nThis resource provides comprehensive AI leadership development content.";
    }
    
    // Special case for Frameworks or Agile queries
    if (lowerQuery.includes("framework") || lowerQuery.includes("agile")) {
      return "Agile is a way of working that helps teams deliver work faster, more flexibly, and with continuous improvement. It started in software development but is now used across government, business, and even military planning because it adapts quickly to change. I recommend this free course for Agile AI training: [AI Agility: Comprehensive Introduction](https://resources.scrumalliance.org/Course/ai-agility-comprehensive-introduction)";
    }
    
    // Special case for RACI/RACU Matrix queries
    if (lowerQuery.includes("raci") || lowerQuery.includes("racu")) {
      return "The RACI matrix defines roles as Responsible, Accountable, Consulted, and Informed.\n\nA RACI Matrix (also called a Responsibility Assignment Matrix) is a project-management tool used to define who does what for every task or deliverable in a project. It assigns one of four roles to each stakeholder:";
    }
    
    // Keywords mapped to section IDs and topics
    const keywordMap: Record<string, string[]> = {
      "persona": ["introduction"],
      "digital persona": ["introduction"],
      "cost": ["ai-costs"],
      "token": ["ai-costs"],
      "energy": ["ai-costs"],
      "ai literacy": ["ai-literacy"],
      "literacy": ["ai-literacy"],
      "bias": ["ai-literacy"],
      "risk": ["ai-literacy"],
      "framework": ["trusted-frameworks"],
      "nist": ["trusted-frameworks"],
      "agile": ["trusted-frameworks"],
      "scrum": ["trusted-frameworks"],
      "notebooklm": ["ai-research"],
      "research": ["ai-research"],
      "google": ["ai-research"],
      "agentic": ["applied-agentic-ai"],
      "agent": ["applied-agentic-ai"],
      "human-in-the-loop": ["applied-agentic-ai"],
      "oversight": ["applied-agentic-ai"],
      "trust": ["build-trust"],
      "responsible": ["build-trust"],
      "accountable": ["build-trust"],
      "kpi": ["kpis-applied-to-operations"],
      "roi": ["kpis-applied-to-operations"],
      "governance": ["kpis-applied-to-operations", "build-trust"],
      "transparency": ["kpis-applied-to-operations"],
      "blockbuster": ["summary"],
      "amazon": ["summary"],
      "drone": ["summary"]
    };

    // Find relevant sections based on keywords
    const relevantSectionIds = new Set<string>();
    
    for (const [keyword, sectionIds] of Object.entries(keywordMap)) {
      if (lowerQuery.includes(keyword)) {
        sectionIds.forEach(id => relevantSectionIds.add(id));
      }
    }

    // If no keyword matches, try to match section titles
    if (relevantSectionIds.size === 0) {
      sections.forEach(section => {
        if (section.title.toLowerCase().includes(lowerQuery) || 
            lowerQuery.includes(section.title.toLowerCase().split(" ")[0])) {
          relevantSectionIds.add(section.id);
        }
      });
    }

    // Build response from relevant sections
    if (relevantSectionIds.size > 0) {
      const relevantSections = sections.filter(s => relevantSectionIds.has(s.id));
      let response = "";

      relevantSections.forEach((section, idx) => {
        if (idx === 0 && section.content.paragraphs && section.content.paragraphs.length > 0) {
          // Use first paragraph from the most relevant section
          response += section.content.paragraphs[0];
          
          // Add a callout if available
          if (section.content.callouts && section.content.callouts.length > 0) {
            const callout = section.content.callouts[0];
            response += `\n\n💡 ${callout.text}`;
            if (callout.source) {
              response += ` (Source: ${callout.source})`;
            }
          }
          
          // Add list items if available
          if (section.content.lists && section.content.lists.length > 0) {
            const list = section.content.lists[0];
            response += `\n\n${list.title}:\n`;
            list.items.slice(0, 2).forEach(item => {
              response += `• ${item}\n`;
            });
          }
        }
      });

      if (response) {
        response += `\n\nWould you like to learn more about this topic?`;
        return response;
      }
    }

    return null;
  };

  // Agent responses based on topics
  const getTopicResponse = (topic: string): string => {
    const responses: Record<string, string> = {
      "Applied AI for Transformation": "Let me share insights from MIT research on AI transformation. Organizations that successfully adopt AI focus on three key areas: workforce readiness, governance frameworks, and measurable outcomes. I recommend this course: [Online Program: Agentic AI & Organizational Transformation](https://professionalprograms.mit.edu/online-program-agentic-ai-organizational-transformation/)",
      "USMC Knowledge Management": "The USMC approach to knowledge management emphasizes rapid information sharing and decision-making under uncertainty. Their framework integrates AI to enhance situational awareness. I suggest this document: [NAVMC-3000.1SECURED.pdf](https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NAVMC-3000.1SECURED.pdf)",
      "Human Health & Fitness": "AI applications in health and fitness range from personalized training to predictive health analytics. Recent studies show AI-driven interventions improve outcomes by 40%. Are you interested in specific applications or research findings? [mitsloan.mit.edu/when-humans-and-ai-work-best-together](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) by Brian Eastwood, Feb 3, 2025",
      "Human Health": "AI applications in health and fitness range from personalized training to predictive health analytics. Recent studies show AI-driven interventions improve outcomes by 40%. Are you interested in specific applications or research findings? [mitsloan.mit.edu/when-humans-and-ai-work-best-together](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) by Brian Eastwood, Feb 3, 2025",
      "Frameworks for Innovation": "Innovation frameworks provide structured approaches to AI adoption. The most effective combine agile methodologies with design thinking and continuous learning. Would you like to explore specific frameworks?\n\nThis can help any leader ask better AI questions: [Harvard 2025 C-Level Assessment](https://www.harvardbusiness.org/wp-content/uploads/2025/10/CRE6997_ENT_CLevel_Assessment_Oct2025.pdf)\n\nI suggest this resource: [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)",
      "AI Blind Spots & Pitfalls": "Common AI blind spots include bias in training data, over-reliance on automation, and lack of human oversight. Organizations need governance structures to identify and mitigate these risks.\n\nLeaders must ask critical questions: What level of accuracy is truly required? Can lower‑cost models achieve the same outcome? Should systems be air‑gapped for privacy or distributed across multi‑cloud environments for resilience and sustainability? Have we created risk by becoming dependent on consultants or vendor lock-in? What Key Performance Indicators (KPI) will be used to measure AI investment?\n\nHistory shows what happens when organizations fail to evolve. Amazon moved from pilots to drone delivery while competitors hesitated. Blockbuster once had 9,000 stores and $6B in revenue, yet its failure to adapt left only one store standing today.\n\nThe lesson is clear: the greatest danger lies in not evolving. The risks include loss of consumer confidence, loss of funding, and loss of competitive advantage — all of which can be far more costly than adopting AI in the first place. What specific challenges are you facing?\n\nI recommend this IBM resource: [Year of Agentic AI Takes Center Stage in 2025](https://www.ibm.com/think/news/year-agentic-ai-center-stage-2025?utm_source=copilot.com)",
      "Governance & Workforce Readiness": "Effective AI governance balances innovation with risk management. Workforce readiness requires upskilling, change management, and clear role definitions using frameworks like RACI. Get a template and get started! [https://www.smartsheet.com/content/raci-templates-excel](https://www.smartsheet.com/content/raci-templates-excel)",
      "ROI": "Return on Investment (ROI) is a simple way to measure how much value you get back compared to what you put in. It's used in business, finance, marketing, training programs, and even personal decisions.",
      "KPI & ROI": "An AI Governance KPI Dashboard builds trust, strengthens transparency and maximizes return on investment by giving leaders a clear view of model reliability, data-drift incidents, fairness audit coverage, and overall operational performance. Key metrics include: Operational Maintenance & Consumption Cost, Model Reliability, Data Drift Incidents, Fairness Audit Coverage, Transparency Measurement, IT Spending on Applied AI, and AI Workforce Training & Readiness. I suggest this resource: [STATE OF AI IN BUSINESS 2025](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf?utm_source=copilot.com)",
      "Training": "Effective AI training programs combine technical skills with practical application. Research shows that hands-on learning with real-world scenarios increases retention by 60%.\n\nCheck out: [The 5 Skill Sets Leaders Must Develop in the AI Era](https://www.forbes.com/councils/forbescoachescouncil/2026/01/07/the-5-skill-sets-leaders-must-develop-in-the-ai-era/?utm_source=copilot.com) - Forbes article on essential AI skills.\n\nFor free AI leadership training, and a personalized agent like this one, check out: https://agent.myora.now",
      "Next Live Q & A": "Let's make an appointment! Click [Calendly.com/caraz007](https://calendly.com/caraz007)\n\nMy personal AI avatar makes the introduction and helps me stay organized! We can talk about free AI leadership training, Agentic AI, measurable change and learn how you can get a personalized agent just like this one!",
      "Open Government Act": "The Open Government requires Machine-Readable Data — Open Government data assets made available by all agencies. [https://www.congress.gov/bill/115th-congress/house-bill/1770/text](https://www.congress.gov/bill/115th-congress/house-bill/1770/text)"
    };
    return responses[topic] || "Thank you for asking. I am thinking... hmm...";
  };

  // Secondary response for Frameworks topic (shown after 5 seconds)
  const getFrameworksSecondaryResponse = (): string => {
    return "I also recommend this free course for Agile AI training: [AI Agility: Comprehensive Introduction](https://resources.scrumalliance.org/Course/ai-agility-comprehensive-introduction?_gl=1*a0c0tj*_gcl_au*Mzc4Mjc5ODEyLjE3NjcxMDE1NDA.)";
  };

  const handleTopicClick = (topic: string) => {
    const userMessage: Message = { role: "user", content: topic };
    setMessages(prev => [...prev, userMessage]);
    
    // Log question to localStorage for tracking
    logQuestion(topic, topic, true);
    
    // Change video if topic has a mapped video
    if (topicVideoMap[topic]) {
      setCurrentVideo(topicVideoMap[topic]);
    }
    
    setIsTyping(true);
    setTimeout(() => {
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const response = getTopicResponse(topic);
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        id: messageId,
        timestamp: Date.now(),
        feedback: null
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Log conversation for analytics
      logConversation(topic, response, topic);

      // Special handling for Frameworks topic - send a second message after 5 seconds
      if (topic === "Frameworks for Innovation") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: getFrameworksSecondaryResponse()
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
          }, 1000);
        }, 5000);
      }

      // Special handling for Applied AI for Transformation - send a second message after 5 seconds
      if (topic === "Applied AI for Transformation") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: "I also suggest this IBM training: [Agentic AI in Practice Learning Path](https://www.ibm.com/training/learning-path/agentic-ai-in-practice-1058?utm_source=copilot.com)"
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
          }, 1000);
        }, 5000);
      }

      // Special handling for Training topic - send a second message after 5 seconds
      if (topic === "Training") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: "I also suggest this resource for workforce AI readiness: [MIT Sloan Workforce Intelligence](https://mitsloan.mit.edu/sites/default/files/2025-09/MIT%20Sloan%20-%20Workforce%20Intelligence-digital.pdf)"
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
          }, 1000);
        }, 5000);
      }

      // Special handling for Governance & Workforce Readiness topic - send a second message after 45 seconds
      if (topic === "Governance & Workforce Readiness") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: "The AI Governance Mapping project classifies over 900 AI risk governance documents by risk domain and other taxonomies. Suggest [https://airisk.mit.edu/ai-governance](https://airisk.mit.edu/ai-governance)"
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
            
            // Third message - Harvard C-Level Guide
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                const tertiaryMessage: Message = {
                  role: "assistant",
                  content: "For AI leadership conversation starters, I recommend this Harvard Business guide: [C-Level Guide to AI Leadership (Oct 2025)](https://www.harvardbusiness.org/wp-content/uploads/2025/10/CRE6706_ENT_LDS25_CLevel_Guide_Oct2025_V4.pdf)"
                };
                setMessages(prev => [...prev, tertiaryMessage]);
                setIsTyping(false);
                
                // Fourth message - White House M-25-05 Reference
                setTimeout(() => {
                  setIsTyping(true);
                  setTimeout(() => {
                    const fourthMessage: Message = {
                      role: "assistant",
                      content: "Real World Reference Materials: [M-25-05: Phase 2 Implementation of the Foundations for Evidence-Based Policymaking Act of 2018](https://www.whitehouse.gov/wp-content/uploads/2025/01/M-25-05-Phase-2-Implementation-of-the-Foundations-for-Evidence-Based-Policymaking-Act-of-2018-Open-Government-Data-Access-and-Management-Guidance.pdf)"
                    };
                    setMessages(prev => [...prev, fourthMessage]);
                    setIsTyping(false);
                  }, 1000);
                }, 5000); // 5 seconds after third message
              }, 1000);
            }, 5000); // 5 seconds after second message
          }, 1000);
        }, 5000); // 5 seconds delay
      }

      // Special handling for AI Blind Spots & Pitfalls topic - send follow-up messages
      if (topic === "AI Blind Spots & Pitfalls") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: "I also suggest this World Economic Forum article on AI investment: [AI Investment Opportunities & Risks](https://www.weforum.org/stories/2024/03/ai-investment-opportunities-risks/?utm_source=copilot.com)"
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
            
            // Third message - The Hill podcast
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                const tertiaryMessage: Message = {
                  role: "assistant",
                  content: "I also recommend listening to this podcast about generative AI returns: [Generative AI Zero Returns - MIT Report](https://thehill.com/policy/technology/5460663-generative-ai-zero-returns-businesses-mit-report/?utm_source=copilot.com)"
                };
                setMessages(prev => [...prev, tertiaryMessage]);
                setIsTyping(false);
              }, 1000);
            }, 5000); // 5 seconds after second message
          }, 1000);
        }, 5000); // 5 seconds delay
      }

      // Special handling for KPI & ROI topic - send follow-up messages
      if (topic === "KPI & ROI") {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            const secondaryMessage: Message = {
              role: "assistant",
              content: "For free AI leadership training, check out: https://agent.myora.now"
            };
            setMessages(prev => [...prev, secondaryMessage]);
            setIsTyping(false);
            
            // Third message - Free consultation
            setTimeout(() => {
              setIsTyping(true);
              setTimeout(() => {
                const tertiaryMessage: Message = {
                  role: "assistant",
                  content: "Let's talk when you have questions about developing your AI Governance KPI dashboard, make an appointment! The first consultation is FREE! Click [Calendly.com/caraz007](https://calendly.com/caraz007)"
                };
                setMessages(prev => [...prev, tertiaryMessage]);
                setIsTyping(false);
                
                // Fourth message - White House M-25-05 Reference
                setTimeout(() => {
                  setIsTyping(true);
                  setTimeout(() => {
                    const fourthMessage: Message = {
                      role: "assistant",
                      content: "Real World Reference Materials: [M-25-05: Phase 2 Implementation of the Foundations for Evidence-Based Policymaking Act of 2018](https://www.whitehouse.gov/wp-content/uploads/2025/01/M-25-05-Phase-2-Implementation-of-the-Foundations-for-Evidence-Based-Policymaking-Act-of-2018-Open-Government-Data-Access-and-Management-Guidance.pdf)"
                    };
                    setMessages(prev => [...prev, fourthMessage]);
                    setIsTyping(false);
                  }, 1000);
                }, 5000); // 5 seconds after third message
              }, 1000);
            }, 5000); // 5 seconds after second message
          }, 1000);
        }, 5000); // 5 seconds delay
      }
      
      // Universal Forbes article suggestion for ALL pill topics
      // This appears after all topic-specific messages
      const delayForForbes = topic === "Governance & Workforce Readiness" ? 25000 : 
                              topic === "KPI & ROI" ? 25000 : 
                              topic === "AI Blind Spots & Pitfalls" ? 15000 : 
                              topic === "Frameworks for Innovation" || topic === "Applied AI for Transformation" || topic === "Training" ? 10000 : 
                              5000;
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const forbesMessage: Message = {
            role: "assistant",
            content: "Additional Resource: [The 5 Growth Skills That Matter Most When Working With AI in 2026](https://www.forbes.com/sites/dianehamilton/2026/01/03/the-5-growth-skills-that-matter-most-when-working-with-ai-in-2026/) - Forbes article on essential AI skills."
          };
          setMessages(prev => [...prev, forbesMessage]);
          setIsTyping(false);
        }, 1000);
      }, delayForForbes);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = { 
      role: "user", 
      content: inputValue,
      id: `msg_${Date.now()}_user`,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Log custom question to localStorage for tracking
    logQuestion("Custom Questions", inputValue, false);
    
    const questionText = inputValue;
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      const searchResult = searchContentForAnswer(questionText);
      const responseContent = searchResult || "Thank you for asking. I am thinking... hmm...";
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const assistantMessage: Message = {
        role: "assistant",
        content: responseContent,
        id: messageId,
        timestamp: Date.now(),
        feedback: null
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Log conversation for analytics
      logConversation(questionText, responseContent);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const showGreeting = messages.length === 0;

  const emojiOptions = [
    { emoji: "😊", label: "Very Happy" },
    { emoji: "🙂", label: "Happy" },
    { emoji: "😁", label: "Excited" },
    { emoji: "🥳", label: "Celebrating" },
    { emoji: "😌", label: "Peaceful" },
    { emoji: "😎", label: "Confident" },
    { emoji: "😃", label: "Amazed" },
    { emoji: "😇", label: "Blessed" },
    { emoji: "🤗", label: "Grateful" },
    { emoji: "😏", label: "Satisfied" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🤔", label: "Thinking" },
    { emoji: "😶", label: "Speechless" },
    { emoji: "😬", label: "Awkward" },
    { emoji: "☹️", label: "Concerned" },
    { emoji: "😕", label: "Confused" },
    { emoji: "😟", label: "Worried" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😞", label: "Disappointed" },
    { emoji: "😫", label: "Tired" },
    { emoji: "😩", label: "Frustrated" },
    { emoji: "😠", label: "Annoyed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🤯", label: "Overwhelmed" }
  ];

  // Sentiment options for observation form
  const sentimentOptions = [
    { emoji: "😨", label: "Afraid" },
    { emoji: "🤝", label: "Acceptance" },
    { emoji: "🧑", label: "Alone" },
    { emoji: "😈", label: "Angry" },
    { emoji: "😰", label: "Anxious" },
    { emoji: "🥰", label: "Appreciated" },
    { emoji: "😳", label: "Ashamed" },
    { emoji: "😌", label: "Calm" },
    { emoji: "😕", label: "Confused" },
    { emoji: "🧐", label: "Curious" },
    { emoji: "😫", label: "Depleted" },
    { emoji: "😞", label: "Depressed" },
    { emoji: "😞", label: "Disappointed" },
    { emoji: "😳", label: "Embarrassed" },
    { emoji: "💪", label: "Empowered" },
    { emoji: "😃", label: "Excited" },
    { emoji: "😤", label: "Frustrated" },
    { emoji: "🙏", label: "Grateful" },
    { emoji: "😢", label: "Grief" },
    { emoji: "😔", label: "Guilty" },
    { emoji: "😊", label: "Happy" },
    { emoji: "🌟", label: "Hopeful" },
    { emoji: "😩", label: "Hopeless" },
    { emoji: "✨", label: "Inspired" },
    { emoji: "⚠️", label: "Unsafe" }
  ];

  const handleSaveCheckIn = () => {
    console.log("Saved check-in:", selectedEmoji);
    setShowCheckIn(false);
    setSelectedEmoji("");
  };

  const handleVideoLoadedMetadata = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const aspectRatio = video.videoWidth / video.videoHeight;
      
      // Log video dimensions for debugging
      console.log('Video native dimensions:', {
        width: video.videoWidth,
        height: video.videoHeight,
        aspectRatio: aspectRatio,
        videoSource: currentVideo
      });
      
      // Container width is max 415px (modal width)
      const containerWidth = 415;
      
      // Calculate ideal height based on aspect ratio
      let calculatedHeight = containerWidth / aspectRatio;
      
      // Clamp height between 200px and 233.43px to ensure video never extends beyond screen
      // Lower max height ensures full video visibility without cropping on all devices
      const MIN_HEIGHT = 200;
      const MAX_HEIGHT = 233.43;
      calculatedHeight = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, calculatedHeight));
      
      console.log('Container dimensions:', {
        width: containerWidth,
        height: calculatedHeight
      });
      
      setVideoContainerHeight(calculatedHeight);
    }
  };

  const handleVideoClick = () => {
    setIsVideoExpanded(true);
    setTimeout(() => {
      if (expandedVideoRef.current) {
        expandedVideoRef.current.currentTime = videoRef.current?.currentTime || 0;
        expandedVideoRef.current.play().catch(err => {
          console.log("Video autoplay prevented:", err);
        });
      }
    }, 50);
  };

  const handleExpandVideoClick = () => {
    setIsVideoExpanded(true);
    if (expandedVideoRef.current) {
      expandedVideoRef.current.load(); // Load the new source
      expandedVideoRef.current.play().catch(err => {
        console.log("Video autoplay prevented:", err);
      });
    }
  };

  const handleCloseExpandedVideo = () => {
    setIsVideoExpanded(false);
  };

  // Helper function to render message content with clickable links
  // Parses markdown-style links: [text](url) and converts them to clickable links
  const renderMessageContent = (content: string) => {
    // Regular expression to find markdown-style links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }

      // Add the link
      const linkText = match[1];
      const linkUrl = match[2];
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-800 underline hover:opacity-70"
        >
          {linkText}
        </a>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text after the last link
    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    // If no links were found, return the original content
    return parts.length === 0 ? content : parts;
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[415px] h-[880px] max-h-[90vh] overflow-hidden flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors z-10 shadow-md"
          aria-label="Close"
        >
          <X className="size-5 text-gray-700" />
        </button>

        {/* Black Header Section */}
        <div className="relative bg-black" style={{ height: videoContainerHeight }}>
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            autoPlay
            loop
            playsInline
            controls
            onClick={handleVideoClick}
            onLoadedMetadata={handleVideoLoadedMetadata}
          >
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto pt-[14px] pb-6 px-3 space-y-[10px]">
          {showCheckIn ? (
            /* Check-in View */
            <div className="space-y-2 -mt-[3px]">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Checking-in</h2>
                <button
                  onClick={handleSaveCheckIn}
                  className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm transition-colors"
                >
                  Save
                </button>
              </div>

              {/* Question */}
              <p className="text-sm text-gray-700 text-center">
                How are you feeling about AI enabled micro-learning?
              </p>

              {/* Compact Emoji Grid - 4 columns for mobile */}
              <div className="grid grid-cols-4 gap-2">
                {emojiOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEmoji(option.label)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                      selectedEmoji === option.label
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-2xl">{option.emoji}</div>
                    <span className="text-[10px] text-center text-gray-600 leading-tight">
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {showGreeting && (
                <p className="text-gray-700 text-sm">
                  Hello! I am ready to share real lessons from subject matter experts. Select a topic to begin.
                </p>
              )}

              {/* Topic Buttons Grid */}
              <div className="grid grid-cols-2 gap-[13px]">
                {aiTopics.slice(0, 6).map((topic) => (
                  <button
                    key={topic}
                    className="py-1 px-3 bg-purple-100 hover:bg-purple-200 rounded-sm text-[10px] transition-colors text-center whitespace-nowrap overflow-hidden text-black"
                    onClick={() => handleTopicClick(topic)}
                  >
                    {topic}
                  </button>
                ))}
                {/* Last row with 3 small buttons inline */}
                <div className="col-span-2 flex gap-3">
                  {aiTopics.slice(6).map((topic) => (
                    <button
                      key={topic}
                      className="flex-1 py-1 px-3 bg-purple-100 hover:bg-purple-200 rounded-sm text-[10px] transition-colors text-center whitespace-nowrap text-black"
                      onClick={() => handleTopicClick(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`px-2 py-0.5 rounded-sm text-sm ${
                        message.role === "user" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {renderMessageContent(message.content)}
                    </div>
                    {/* Thumbs up/down feedback for assistant messages */}
                    {message.role === "assistant" && message.id && (
                      <div className="flex items-center gap-1 mt-1">
                        <button
                          onClick={() => handleFeedback(message.id!, "thumbs_up")}
                          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                            message.feedback === "thumbs_up" ? "bg-green-100 text-green-600" : "text-gray-400"
                          }`}
                          aria-label="Helpful"
                        >
                          <ThumbsUp className="size-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id!, "thumbs_down")}
                          className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                            message.feedback === "thumbs_down" ? "bg-red-100 text-red-600" : "text-gray-400"
                          }`}
                          aria-label="Not helpful"
                        >
                          <ThumbsDown className="size-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="px-2 py-0.5 rounded-sm text-sm bg-gray-100 text-gray-700">
                      <span className="animate-pulse">...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}
        </div>

        {/* Input Section */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center gap-2">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => {
                if (recognition) {
                  if (isRecording) {
                    recognition.stop();
                  } else {
                    recognition.start();
                    setIsRecording(true);
                  }
                }
              }}
            >
              <Mic className="size-5 text-gray-500" />
            </button>
            <button 
              onClick={() => setShowCheckIn(!showCheckIn)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative group"
            >
              <Heart className="size-5 text-red-500" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Share Feedback
              </div>
            </button>
            <button 
              onClick={() => setShowCautionForm(true)}
              className="p-1.5 hover:bg-yellow-50 rounded-lg transition-colors relative group"
              aria-label="Report Observation or AI Issue"
            >
              <AlertTriangle className="size-5 text-yellow-600" />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Report Observation or Issue Now!
              </div>
            </button>
            <input
              type="text"
              placeholder="Ask a question"
              className="flex-1 px-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button className="p-1.5 bg-black hover:bg-gray-800 rounded-lg transition-colors" onClick={handleSendMessage}>
              <Send className="size-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Caution Form Modal */}
      {showCautionForm && !showReviewScreen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4" onClick={() => setShowCautionForm(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[890px] overflow-y-auto p-6 space-y-3 relative" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => setShowCautionForm(false)}
              className="absolute top-4 right-4 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md z-10"
              aria-label="Close"
            >
              <X className="size-4 text-gray-700" />
            </button>

            {/* Header Instructions */}
            <p className="text-sm text-gray-600 leading-snug pr-8">
              <strong>Share Observation or Report Issue</strong>
            </p>

            <div className="space-y-2">
              {/* Topic Dropdown */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-semibold">Topic <span className="text-red-500">*</span></label>
                  <div className="flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs font-medium text-green-600">Ready</span>
                  </div>
                </div>
                <div className="relative">
                  <select
                    value={observationTopic}
                    onChange={(e) => setObservationTopic(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  >
                    <option value="AI Bias or Risk">AI Bias or Risk</option>
                    <option value="Information & Intelligence">Information & Intelligence</option>
                    <option value="Human Health & Fitness">Human Health & Fitness</option>
                    <option value="Training & Development">Training & Development</option>
                    <option value="Governance & Compliance">Governance & Compliance</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Conditional "Other" Topic Input */}
              {observationTopic === "Other" && (
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Please specify the topic</label>
                  <input
                    type="text"
                    value={observationOtherTopic}
                    onChange={(e) => setObservationOtherTopic(e.target.value.slice(0, 256))}
                    placeholder="Enter topic name (max 256 characters)"
                    maxLength={256}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  />
                  <p className="text-xs text-gray-500">{observationOtherTopic.length}/256 characters</p>
                </div>
              )}

              {/* Observation Text Area */}
              <div className="space-y-1.5 -mb-1 -mt-1">
                <label className="text-sm font-semibold">Observation <span className="text-red-500">*</span></label>
                <div className="relative">
                  <textarea
                    value={observationText}
                    onChange={(e) => setObservationText(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 min-h-[120px] resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (observationRecognition) {
                        if (isObservationRecording) {
                          observationRecognition.stop();
                          setIsObservationRecording(false);
                        } else {
                          observationRecognition.start();
                          setIsObservationRecording(true);
                        }
                      }
                    }}
                    className={`absolute bottom-2 right-2 p-2 rounded-full transition-all ${
                      isObservationRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={isObservationRecording ? "Stop recording" : "Start voice input"}
                  >
                    <Mic className={`size-4 ${isObservationRecording ? 'text-white' : 'text-gray-600'}`} />
                  </button>
                </div>
                {isObservationRecording && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    Listening...
                  </p>
                )}
              </div>

              {/* Type - Event/Routine Toggle */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Type <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setObservationType("Event")}
                    className={`py-2 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      observationType === "Event"
                        ? 'bg-black text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Event
                  </button>
                  <button
                    type="button"
                    onClick={() => setObservationType("Routine")}
                    className={`py-2 px-4 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${
                      observationType === "Routine"
                        ? 'bg-black text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Routine
                  </button>
                </div>
              </div>

              {/* Point of Contact */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Point of Contact (Optional)</label>
                <input
                  type="text"
                  value={pointOfContact}
                  onChange={(e) => setPointOfContact(e.target.value)}
                  placeholder="Phone representative, event organizer, or witness"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 placeholder:text-gray-400"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold">Location <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Jacksonville, NC (Camp Lejeune)"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600"
                  />
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sentiment Selection */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">Tap a sentiment about your observation <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-5 gap-2">
                  {sentimentOptions.map((option, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setObservationSentiment(option.label)}
                      className={`flex flex-col items-center gap-[2px] pl-[7px] pr-[7px] pt-[2px] pb-[4px] rounded-lg transition-all border ${
                        observationSentiment === option.label
                          ? 'bg-yellow-50 border-yellow-400 ring-2 ring-yellow-400'
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="text-2xl">{option.emoji}</div>
                      <span className="text-[10px] text-center text-gray-700 leading-tight font-medium">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <button 
                onClick={() => {
                  console.log("Observation submitted:", { 
                    observationTopic, 
                    observationText, 
                    observationType,
                    pointOfContact,
                    location,
                    observationSentiment
                  });
                  setShowReviewScreen(true);
                }}
                disabled={!observationText.trim() || !observationSentiment}
                className={`w-full px-6 py-2.5 rounded-lg transition-colors font-semibold ${
                  observationText.trim() && observationSentiment
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Review & Edit Screen */}
      {showCautionForm && showReviewScreen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[890px] overflow-y-auto pt-3 px-5 pb-5 relative" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <h2 className="text-center font-bold text-lg mb-4">Review & Edit</h2>
            
            {/* Observation Section */}
            <div className="space-y-2 mb-4">
              <div className="flex items-baseline gap-1">
                <label className="text-sm font-semibold">Observation:</label>
              </div>
              <p className="text-xs text-gray-600">{new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '/')}</p>
              
              {/* Observation Text Box */}
              <div className="bg-gray-100 rounded-lg p-3 text-sm text-gray-800 leading-relaxed">
                {observationText}
              </div>
              
              {/* Pills */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {observationType}
                </span>
                <span className="inline-flex items-center px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {observationTopic}
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  <span>{sentimentOptions.find(s => s.label === observationSentiment)?.emoji}</span>
                  <span>{observationSentiment}</span>
                </span>
              </div>
            </div>
            
            {/* Recommendation Section */}
            <div className="space-y-2 mb-4 relative">
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold">Recommendation:</label>
                <span className="inline-flex items-center px-2 py-0.5 bg-yellow-100 border border-yellow-300 rounded text-xs font-medium text-yellow-800">
                  Improve
                </span>
              </div>
              
              {/* Recommendation Textarea with Mic */}
              <div className="relative">
                <textarea
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full px-3 py-2 pr-12 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 min-h-[200px] resize-none"
                />
                {/* Floating Microphone Button */}
                <button
                  type="button"
                  onClick={async () => {
                    if (recommendationRecognition) {
                      if (isRecommendationRecording) {
                        recommendationRecognition.stop();
                        setIsRecommendationRecording(false);
                      } else {
                        try {
                          // Stop other recordings first
                          if (isRecording && recognition) {
                            recognition.stop();
                            setIsRecording(false);
                          }
                          if (isObservationRecording && observationRecognition) {
                            observationRecognition.stop();
                            setIsObservationRecording(false);
                          }
                          
                          // Request microphone permission
                          await navigator.mediaDevices.getUserMedia({ audio: true });
                          
                          // Start recommendation recording
                          recommendationRecognition.start();
                          setIsRecommendationRecording(true);
                        } catch (error: any) {
                          console.error('Failed to start recommendation recording:', error);
                          if (error.name === 'NotAllowedError' || error.message === 'not-allowed') {
                            alert('Microphone permission is required. Please enable microphone access in your browser settings.');
                          } else {
                            alert('Voice recording is not available. Please check your browser settings and ensure sound is enabled on your device.');
                          }
                        }
                      }
                    }
                  }}
                  className={`absolute bottom-4 right-4 p-3 rounded-full shadow-lg transition-all ${
                    isRecommendationRecording 
                      ? 'bg-black hover:bg-gray-800 animate-pulse' 
                      : 'bg-black hover:bg-gray-800'
                  }`}
                  aria-label={isRecommendationRecording ? "Stop recording" : "Start voice input"}
                >
                  <Mic className="size-5 text-white" />
                </button>
              </div>
            </div>
            
            {/* Optional Context Data Section */}
            <div className="space-y-3 mb-5">
              <h3 className="text-sm font-semibold">Optional Context Data</h3>
              
              {/* EVENT */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <label className="font-semibold text-xs">EVENT: [Acronym, Title or Descriptor]</label>
                </div>
                <div className="relative">
                  <select
                    value={eventAcronym}
                    onChange={(e) => setEventAcronym(e.target.value)}
                    className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="CPX">CPX</option>
                    <option value="FTX">FTX</option>
                    <option value="MEU">MEU</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* POINT OF CONTACT */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <label className="font-semibold text-xs">POINT OF CONTACT: [Phone representative, event organizer, or witness]</label>
                </div>
                <input
                  type="text"
                  value={pointOfContact}
                  onChange={(e) => setPointOfContact(e.target.value)}
                  placeholder="Enter point of contact (Optional)"
                  className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              
              {/* FROM */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <label className="font-semibold text-xs">FROM: [Unit/Organization, Team]</label>
                </div>
                <div className="relative">
                  <select
                    value={fromUnit}
                    onChange={(e) => setFromUnit(e.target.value)}
                    className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="G3">G3</option>
                    <option value="G2">G2</option>
                    <option value="G6">G6</option>
                    <option value="S3">S3</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* IMPACT */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <label className="font-semibold text-xs">IMPACT: [Estimate affect on our people first]</label>
                </div>
                <div className="relative">
                  <select
                    value={impactLevel}
                    onChange={(e) => setImpactLevel(e.target.value)}
                    className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-600"
                  >
                    <option value="">Select impact level (Optional)</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              {/* EID */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <svg className="size-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                  </svg>
                  <label className="font-semibold text-xs">EID: [Electronic Identification Number, School, Organization, Company or Unit]</label>
                </div>
                <input
                  type="text"
                  value={studentEID}
                  onChange={(e) => setStudentEID(e.target.value)}
                  placeholder="Enter Student EID Number, School separated by commas"
                  className="w-full px-3 py-1 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
            </div>
            
            {/* Bottom Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowReviewScreen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log("Final submission:", {
                    observationTopic,
                    observationText,
                    observationType,
                    pointOfContact,
                    location,
                    observationSentiment,
                    recommendation,
                    eventAcronym,
                    fromUnit,
                    impactLevel,
                    studentEID
                  });
                  // Show summary screen
                  setShowReviewScreen(false);
                  setShowSummaryScreen(true);
                }}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 rounded-lg text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Summary Screen */}
      {showCautionForm && showSummaryScreen && (
        <div className="fixed inset-0 bg-black/60 z-60 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[890px] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <h2 className="text-center font-bold text-lg mb-3">Actionable Summary</h2>
            
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2" strokeLinecap="round"/>
                <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            
            {/* Observation */}
            <div className="mb-4">
              <h3 className="font-bold mb-1">Observation:</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{observationText}</p>
            </div>
            
            {/* Recommendation */}
            <div className="mb-5">
              <h3 className="font-bold mb-1">Recommendation:</h3>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{recommendation}</p>
            </div>
            
            {/* Metadata Bullets */}
            <div className="space-y-1.5 mb-6 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700"><span className="font-semibold">Topic:</span> {observationTopic}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700"><span className="font-semibold">Event Type:</span> {observationType}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700"><span className="font-semibold">Sentiment:</span> {observationSentiment}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700"><span className="font-semibold">Location:</span> {location}</span>
              </div>
              {impactLevel && (
                <div className="flex items-start gap-2">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span className="text-gray-700"><span className="font-semibold">Impact:</span> {impactLevel}</span>
                </div>
              )}
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700">Email (professional tone)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">•</span>
                <span className="text-gray-700">Formal memo (official documentation)</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-3 mb-5">
              <button
                onClick={() => {
                  console.log("Opening Report Generator");
                  // Populate report fields with observation data
                  const today = new Date();
                  const formattedDate = today.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).replace(',', '').toUpperCase();
                  setReportDate(formattedDate);
                  setReportSubject(`AFTER ACTION REPORT FOR EVENT CONDUCTED FROM ${today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()}`);
                  setReportTo(pointOfContact || "Operations Officer");
                  
                  // Build report body with observation data
                  const bodyText = `1. Background.

This report summarizes observation(s) recorded on ${today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}. The observations are categorized into areas for improvement or practices to sustain. Specific objectives during this observation include:
• [objective]
• [objective]

2. Areas for Improvement.

   a. Topic. ${observationTopic}

      (1) Discussion. ${observationText}

      (2) Recommendation. ${recommendation}

3. Practices to Sustain.

   a. Topic. [Topic Name]

      (1) Discussion. [Discussion text]

      (2) Recommendation. [Recommendation text]

4. Conclusion.

These observations reflect ongoing efforts to enhance operational effectiveness and maintain successful practices. Implementation of the recommended improvements and continuation of highlighted best practices will contribute to mission success.

5. The point of contact regarding this report is ${pointOfContact || 'Rank F Name MI L Name'} at (XXX) XXX-XXXX or email@usmc.mil.


Signature


Enclosure (12)`;
                  
                  setReportBody(bodyText);
                  
                  setShowSummaryScreen(false);
                  setShowReportGenerator(true);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 rounded-lg font-semibold text-white hover:bg-green-700 transition-colors"
              >
                <span>Finalize</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span>Export & Share</span>
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              <button
                onClick={() => {
                  setShowSummaryScreen(false);
                  setShowReviewScreen(true);
                }}
                className="w-full px-6 py-3 bg-black rounded-lg font-semibold text-white hover:bg-gray-800 transition-colors"
              >
                Back to Summary
              </button>
            </div>
            
            {/* Invite & Share Section */}
            <div className="border-t pt-5">
              <div className="flex items-center gap-2 mb-3">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                <h3 className="font-bold">Invite & Share</h3>
              </div>
              
              <p className="text-sm text-gray-500 text-center mb-3">
                Love using ORA? Share it with others.<br />
                Be part of a movement!
              </p>
              
              {/* Share Link */}
              <div className="flex items-center gap-2 mb-3 p-2.5 bg-gray-100 rounded-lg">
                <input
                  type="text"
                  value="https://53b4a427-2a21-4c4e-96f9-c7894d949d86-v2-figma1framepreview.fi..."
                  readOnly
                  className="flex-1 bg-transparent text-xs text-gray-600 outline-none"
                />
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 rounded text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              
              {/* Share Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share ORA
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Share via Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Generator Screen */}
      {showCautionForm && showReportGenerator && (
        <div className="fixed inset-0 bg-white z-60 flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => {
                  setShowReportGenerator(false);
                  setShowSummaryScreen(true);
                }}
                className="hover:opacity-70 transition-opacity"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="font-semibold">Report Generator</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-sm font-medium hover:bg-gray-100 transition-colors">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button 
                onClick={() => {
                  setShowReportGenerator(false);
                  setShowCautionForm(false);
                }}
                className="hover:opacity-70 transition-opacity ml-2"
                aria-label="Close Report Generator"
              >
                <X className="size-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
            {/* Close Button */}
            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setShowReportGenerator(false);
                  setShowCautionForm(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Report Generator"
              >
                <svg className="size-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Report Header Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <label className="font-semibold">Report Header (Editable)</label>
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reference Number */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Reference Number (Optional)</label>
                <input
                  type="text"
                  value={reportReference}
                  onChange={(e) => setReportReference(e.target.value)}
                  placeholder="Reference Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* From */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  value={reportFrom}
                  onChange={(e) => setReportFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* To */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  value={reportTo}
                  onChange={(e) => setReportTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Via */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Via (Optional)</label>
                <input
                  type="text"
                  value={reportVia}
                  onChange={(e) => setReportVia(e.target.value)}
                  placeholder="Rank Name, Billet"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  value={reportSubject}
                  onChange={(e) => setReportSubject(e.target.value)}
                  placeholder="AFTER ACTION REPORT FOR EVENT CONDUCTED FROM 29 JANUARY 2026"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reference */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Reference (Optional)</label>
                <textarea
                  value={reportReferenceText}
                  onChange={(e) => setReportReferenceText(e.target.value)}
                  placeholder="(a) MCO 3504.1 Marine Corps Lessons Learned Program (MCLLP) and the Marine Corps Center for Lessons Learned (MCCLL)"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  rows={3}
                />
              </div>

              {/* Reporting Email Address */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Reporting Address</label>
                <input
                  type="email"
                  value={reportingEmailAddress}
                  onChange={(e) => setReportingEmailAddress(e.target.value)}
                  placeholder="recipient@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Report Body Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <label className="font-semibold">Report Body (Editable)</label>
              </div>

              {/* Body Text */}
              <div className="space-y-2">
                <textarea
                  value={reportBody}
                  onChange={(e) => setReportBody(e.target.value)}
                  placeholder="1. Background.&#10;&#10;This report summarizes 3 observations recorded between 29JAN2026 – 31JAN2026. The observations are categorized into areas for improvement and practices to sustain. Specific objectives during this event include:&#10;• [objective]&#10;• [objective]&#10;• [objective]&#10;&#10;2. Areas for Improvement.&#10;&#10;   a. Topic. Performance Management&#10;&#10;      (1) Discussion. Team members have reported that performance reviews are inconsistent across departments, with some receiving detailed, constructive feedback while others get generic comments..."
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed min-h-[400px]"
                  rows={20}
                />
                <button 
                  onClick={() => {
                    setShowReportGenerator(false);
                    setShowReportPreview(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview After Action Report Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Preview Screen */}
      {showCautionForm && showReportPreview && (
        <div className="fixed inset-0 bg-white z-60 flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowReportPreview(false)}
                className="hover:bg-gray-800 rounded p-1 transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="size-5" />
              </button>
              <h2 className="font-semibold">Preview</h2>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </button>
              <button 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-black rounded text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button 
                onClick={() => {
                  const subject = reportSubject || "After Action Report";
                  const body = `DEPARTMENT OF THE NAVY
HEADQUARTERS UNITED STATES MARINE CORPS
TRAINING AND EDUCATION COMMAND

IN REPLY REFER TO:
${reportReference || "04JAN2026"}

FROM:  ${reportFrom}
TO:    ${reportTo}${reportVia ? `\nVIA:   ${reportVia}` : ''}

SUBJ:  ${subject}
${reportReferenceText ? `\nREF:   ${reportReferenceText}` : ''}

${reportBody}`;
                  
                  const mailtoLink = `mailto:${reportingEmailAddress || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  window.location.href = mailtoLink;
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
              <button 
                onClick={() => {
                  setShowReportPreview(false);
                  setShowCautionForm(false);
                }}
                className="hover:opacity-70 transition-opacity ml-1"
                aria-label="Close Preview"
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button 
                onClick={() => {
                  setShowReportPreview(false);
                  setShowCautionForm(false);
                }}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Preview"
              >
                <svg className="size-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="max-w-4xl mx-auto bg-gray-50 p-8 rounded-lg shadow-sm">
              <div className="font-mono text-sm leading-relaxed space-y-4 whitespace-pre-wrap">
                <div className="text-center font-semibold">
                  DEPARTMENT OF THE NAVY
                  {"\n"}HEADQUARTERS UNITED STATES MARINE CORPS
                  {"\n"}TRAINING AND EDUCATION COMMAND
                </div>

                <div className="mt-6">
                  IN REPLY REFER TO:
                  {"\n"}{reportReference || "04JAN2026"}
                </div>

                <div className="mt-4">
                  FROM:  {reportFrom}
                  {"\n"}TO:    {reportTo}
                </div>

                {reportVia && (
                  <div>
                    VIA:   {reportVia}
                  </div>
                )}

                <div className="mt-4">
                  SUBJ:  {reportSubject || "AFTER ACTION REPORT FOR EVENT CONDUCTED FROM 03 MARCH 2024 TO 31 JANUARY 2026"}
                </div>

                {reportReferenceText && (
                  <div className="mt-4">
                    REF:   {reportReferenceText}
                  </div>
                )}

                <div className="mt-6">
                  {reportBody}
                </div>
              </div>
            </div>
          </div>

          {/* Email Prompt Modal */}
          {showEmailPrompt && (
            <div className="fixed inset-0 bg-black/50 z-70 flex items-center justify-center p-4" onClick={() => setShowEmailPrompt(false)}>
              <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-semibold text-lg mb-4">Email Report</h3>
                <p className="text-sm text-gray-600 mb-4">Enter your email address to receive a copy of this After Action Report.</p>
                
                <input
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                />
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowEmailPrompt(false);
                      setEmailAddress("");
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (emailAddress) {
                        // In a real implementation, this would send the email via an API
                        alert(`Report will be sent to: ${emailAddress}`);
                        setShowEmailPrompt(false);
                        setEmailAddress("");
                      }
                    }}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!emailAddress}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}