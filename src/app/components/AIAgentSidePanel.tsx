/**
 * ORA - AI Leadership Agent
 * Copyright (c) 2024-2026 s2cpaul
 * Licensed under MIT License
 * Repository: https://github.com/s2cpaul/ora-agent
 * 
 * ============================================================================
 * AI AGENT SIDE PANEL - RESPONSE ARCHITECTURE
 * ============================================================================
 * 
 * QUESTION HANDLING PRIORITY:
 * 
 * 1. APP CONTEXT CONTENT (Primary Source)
 *    - Pre-defined topic responses (getTopicResponse function)
 *    - Keyword detection (detectKeywordTopic function)
 *    - Special handlers (News source config, Agile training, etc.)
 *    - Topics include: USMC, Health, Training, Innovation, Governance, etc.
 * 
 * 2. OPENAI API FALLBACK (Secondary Source - To Be Integrated)
 *    - Activated when no keyword match is found
 *    - Currently returns generic response
 *    - Integration point: handleSendMessage function (line ~1720)
 *    - Will provide dynamic AI responses for unmatched queries
 * 
 * This architecture ensures users always get context-specific answers first,
 * with OpenAI serving as intelligent fallback for broader questions.
 * 
 * ============================================================================
 * DESIGN RULES - AI AGENT SIDE PANEL
 * ============================================================================
 * 1. Agent side panel ALWAYS displays in LIGHT MODE (regardless of app theme)
 * 2. Thought bubble text is BLACK (!text-black), never white
 * 3. Feedback thumbs buttons are GRAY (text-gray-500) when not selected
 * 4. Web links display with UNDERLINE and DARK BLUE color (text-blue-800)
 * 5. Forms inside the agent (Quick Observation, etc.) display in DARK MODE
 * ============================================================================
 */

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Mic,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Video,
  Heart,
  Star,
  Brain,
  Activity,
  Megaphone,
  AlertTriangle,
  Bot,
  Files,
  Plus,
  Lightbulb,
  Mail,
  User,
  Link as LinkIcon,
  Trash2,
  Upload,
  Settings,
  RotateCcw,
  FileText,
} from "lucide-react";
import { ReportIssueModal } from "./ReportIssueModal";
import { FeedbackModal } from "./FeedbackModal";
import { ActionableSummary } from "./ActionableSummary";
import { PricingPage } from "./PricingPage";
import { trackFeedbackInSupabase, type FeedbackData } from "../utils/supabaseFeedback";
import { AgentConnectionsManager, type AgentConnection } from "./AgentConnectionsManager";
import { AgentCollaborationIndicator, type CollaboratingAgent } from "./AgentCollaborationIndicator";

interface AIAgentSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShowConsentModal?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
  id?: string;
  timestamp?: number;
  feedback?: "thumbs_up" | "thumbs_down" | null;
  collaboratingAgents?: CollaboratingAgent[];
  isMultiAgent?: boolean;
}

export function AIAgentSidePanel({ isOpen, onClose, onShowConsentModal }: AIAgentSidePanelProps) {
  const DEFAULT_VIDEO = "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4";
  
  // Video rotation array
  const VIDEO_ROTATION = [
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/USMCWentlang.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/CWO-John2026.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Process-Citrus.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AI_Literacy_GovBriefpart2.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/MIT-Arnold.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/KleeKaren2.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Failures1.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Validation1.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Big3Risk-RACI-Governance.mp4",
    "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NC4ME2.mp4"
  ];


  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [questionCount, setQuestionCount] = useState(() => {
    const saved = localStorage.getItem('userQuestionCount');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [currentVideo, setCurrentVideo] = useState(DEFAULT_VIDEO);
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(true);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [showObservationPopup, setShowObservationPopup] = useState(false);
  const [observationText, setObservationText] = useState("");
  const [additionalObservation, setAdditionalObservation] = useState("");
  const [isObservationSelected, setIsObservationSelected] = useState(false);
  const [submittedObservation, setSubmittedObservation] = useState<string>("");
  const [configuredNewsSource, setConfiguredNewsSource] = useState<{name: string, url: string} | null>(null);
  const [configuredLibrary, setConfiguredLibrary] = useState<{name: string, url: string} | null>(null);
  const [configuredVideo, setConfiguredVideo] = useState<{name: string, url: string} | null>(null);
  const [configuredCalendar, setConfiguredCalendar] = useState<{name: string, url: string} | null>(null);
  const [subscriberEmail, setSubscriberEmail] = useState<string>("");
  const [personaVideoUrls, setPersonaVideoUrls] = useState<string[]>([]);
  const [customVideoUrls, setCustomVideoUrls] = useState<string[]>([]);
  const [trainingVideoUrls, setTrainingVideoUrls] = useState<string[]>([]);
  const [hasTrainingPackage, setHasTrainingPackage] = useState(false);
  const [showConfigInstructions, setShowConfigInstructions] = useState(false);
  const [showActionableSummary, setShowActionableSummary] = useState(false);
  const [showDefaultObservation, setShowDefaultObservation] = useState(false);
  const [defaultObservationText, setDefaultObservationText] = useState(
    "I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information."
  );
  const [isEditingObservation, setIsEditingObservation] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [pendingPersonaVideoSlot, setPendingPersonaVideoSlot] = useState<number | null>(null);
  const [pendingTrainingVideoSlot, setPendingTrainingVideoSlot] = useState<number | null>(null);
  const [showAgentConnectionsManager, setShowAgentConnectionsManager] = useState(false);
  const [isCollaborating, setIsCollaborating] = useState(false);
  const [currentCollaboratingAgents, setCurrentCollaboratingAgents] = useState<CollaboratingAgent[]>([]);
  const [showMultiAgentMessage, setShowMultiAgentMessage] = useState(false);
  const [showFreeQuestionsPopup, setShowFreeQuestionsPopup] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default observation template
  const DEFAULT_OBSERVATION = "Tell us how your team is using the agent and what needs improvement!";

  // Map topics to video URLs
  const topicVideoMap: Record<string, string> = {
    "Applied AI for Transformation": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/MIT_Arnold.mp4",
    "Human Health & Fitness": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/KleeKaren2.mp4",
    "Human Health": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/KleeKaren2.mp4",
    "USMC Knowledge Management": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/CWO-John2026.mp4",
    "Frameworks for Innovation": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4",
    "AI Blind Spots & Pitfalls": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Big3Risk-RACI-Governance.mp4",
    "Governance & Workforce Readiness": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/SSgtW.mp4",
    "Training": "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/Process-Citrus.mp4",
  };

  // Combined video rotation with priority: persona videos (highest), custom videos (premium), then default videos
  const combinedVideoRotation = [...personaVideoUrls, ...customVideoUrls, ...VIDEO_ROTATION];

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
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
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
      }
    }
  }, []);

  // Timer for Multi-Agent message delay (6 seconds after initial load)
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Reset the multi-agent message state when panel opens
      setShowMultiAgentMessage(false);
      
      // Set timer to show multi-agent message after 6 seconds
      const timer = setTimeout(() => {
        setShowMultiAgentMessage(true);
      }, 6000); // 6 seconds delay

      // Cleanup timer on unmount or when messages change
      return () => clearTimeout(timer);
    }
  }, [isOpen, messages.length]);

  // Auto-hide free questions popup after 5 seconds
  useEffect(() => {
    if (showFreeQuestionsPopup && isOpen) {
      const timer = setTimeout(() => {
        setShowFreeQuestionsPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showFreeQuestionsPopup, isOpen]);

  // Reset video when modal opens
  useEffect(() => {
    if (isOpen) {
      // Always start with AgileMike video
      const agileMikeVideo = "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4";
      setCurrentVideo(agileMikeVideo);
      localStorage.setItem('lastPlayedVideo', agileMikeVideo);
      
      // Load or set default news source
      const savedNewsSource = localStorage.getItem('configuredNewsSource');
      if (savedNewsSource) {
        setConfiguredNewsSource(JSON.parse(savedNewsSource));
      } else {
        // Set default news source to War on the Rocks
        const defaultNewsSource = {
          name: "War on the Rocks",
          url: "https://warontherocks.com/?utm_source=copilot.com"
        };
        setConfiguredNewsSource(defaultNewsSource);
        localStorage.setItem('configuredNewsSource', JSON.stringify(defaultNewsSource));
      }
      
      // Load configured library
      const savedLibrary = localStorage.getItem('configuredLibrary');
      if (savedLibrary) {
        setConfiguredLibrary(JSON.parse(savedLibrary));
      }
      
      // Load configured video service
      const savedVideo = localStorage.getItem('configuredVideo');
      if (savedVideo) {
        setConfiguredVideo(JSON.parse(savedVideo));
      } else {
        // Set default to FaceTime
        const defaultVideo = {
          name: "FaceTime",
          url: "facetime://"
        };
        setConfiguredVideo(defaultVideo);
        localStorage.setItem('configuredVideo', JSON.stringify(defaultVideo));
      }
      
      // Load configured calendar service
      const savedCalendar = localStorage.getItem('configuredCalendar');
      if (savedCalendar) {
        setConfiguredCalendar(JSON.parse(savedCalendar));
      } else {
        // Set default to Calendly
        const defaultCalendar = {
          name: "Calendly",
          url: "https://calendly.com/"
        };
        setConfiguredCalendar(defaultCalendar);
        localStorage.setItem('configuredCalendar', JSON.stringify(defaultCalendar));
      }
      
      // Load subscriber email for AI reports
      const savedEmail = localStorage.getItem('subscriberEmail');
      if (savedEmail) {
        setSubscriberEmail(savedEmail);
      }
      
      // Load persona video URLs (highest priority) - includes both Supabase URLs and local videos
      const savedPersonaVideos = localStorage.getItem('personaVideoUrls');
      if (savedPersonaVideos) {
        setPersonaVideoUrls(JSON.parse(savedPersonaVideos));
      }
      
      // Load local videos from IndexedDB (merge with URL-based persona videos)
      loadAllVideosFromIndexedDB().then(localVideos => {
        if (localVideos.length > 0) {
          setPersonaVideoUrls(prev => {
            // Merge local blob URLs with existing URL-based videos, avoiding duplicates
            const merged = [...localVideos, ...prev.filter(url => !url.startsWith('blob:'))];
            return merged;
          });
        }
      });
      
      // Load custom video URLs
      const savedCustomVideos = localStorage.getItem('customVideoUrls');
      if (savedCustomVideos) {
        setCustomVideoUrls(JSON.parse(savedCustomVideos));
      }
      
      // Load training package status and videos
      const trainingPackageStatus = localStorage.getItem('hasTrainingPackage');
      if (trainingPackageStatus === 'true') {
        setHasTrainingPackage(true);
      }
      
      const savedTrainingVideos = localStorage.getItem('trainingVideoUrls');
      if (savedTrainingVideos) {
        setTrainingVideoUrls(JSON.parse(savedTrainingVideos));
      }
    }
  }, [isOpen]);

  // IndexedDB helpers for storing video files locally
  const openVideoDatabase = (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('ORAPersonaVideos', 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('videos')) {
          db.createObjectStore('videos', { keyPath: 'slot' });
        }
      };
    });
  };

  const saveVideoToIndexedDB = async (slot: number, blob: Blob): Promise<string> => {
    const db = await openVideoDatabase();
    const transaction = db.transaction(['videos'], 'readwrite');
    const store = transaction.objectStore('videos');
    
    await store.put({ slot, blob, timestamp: Date.now() });
    
    // Create a blob URL for playback
    const blobUrl = URL.createObjectURL(blob);
    return blobUrl;
  };

  const loadVideoFromIndexedDB = async (slot: number): Promise<string | null> => {
    try {
      const db = await openVideoDatabase();
      const transaction = db.transaction(['videos'], 'readonly');
      const store = transaction.objectStore('videos');
      
      return new Promise((resolve, reject) => {
        const request = store.get(slot);
        request.onsuccess = () => {
          if (request.result && request.result.blob) {
            const blobUrl = URL.createObjectURL(request.result.blob);
            resolve(blobUrl);
          } else {
            resolve(null);
          }
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error loading video from IndexedDB:', error);
      return null;
    }
  };

  const loadAllVideosFromIndexedDB = async (): Promise<string[]> => {
    try {
      const db = await openVideoDatabase();
      const transaction = db.transaction(['videos'], 'readonly');
      const store = transaction.objectStore('videos');
      
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => {
          const videos = request.result || [];
          const blobUrls: string[] = [];
          
          // Sort by slot and create blob URLs
          videos.sort((a, b) => a.slot - b.slot);
          videos.forEach(video => {
            if (video.blob) {
              blobUrls.push(URL.createObjectURL(video.blob));
            }
          });
          
          resolve(blobUrls);
        };
        request.onerror = () => reject(request.error);
      });
    } catch (error) {
      console.error('Error loading all videos from IndexedDB:', error);
      return [];
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Helper function to render text with clickable links (supports both markdown and plain URLs)
  const renderMessageContent = (content: string) => {
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    const processedRanges: Array<{start: number, end: number}> = [];
    
    // First, handle HTML anchor tags <a href="url">text</a>
    const htmlLinkRegex = /<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g;
    let htmlMatch;
    
    while ((htmlMatch = htmlLinkRegex.exec(content)) !== null) {
      const fullMatch = htmlMatch[0];
      const url = htmlMatch[1];
      const linkText = htmlMatch[2];
      const matchStart = htmlMatch.index;
      const matchEnd = htmlMatch.index + fullMatch.length;
      
      // Add text before the link
      if (matchStart > lastIndex) {
        const textBefore = content.substring(lastIndex, matchStart);
        parts.push(<span key={`text-${lastIndex}`} className="!text-black">{textBefore}</span>);
      }
      
      // Add the HTML link
      parts.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2 text-blue-800 hover:opacity-70 cursor-pointer break-words"
        >
          {linkText}
        </a>
      );
      
      processedRanges.push({ start: matchStart, end: matchEnd });
      lastIndex = matchEnd;
    }
    
    // Then, handle markdown-style links [text](url) in remaining text
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const fullMatch = match[0];
      const linkText = match[1];
      const url = match[2];
      const matchStart = match.index;
      const matchEnd = match.index + fullMatch.length;
      
      // Skip if already processed by HTML regex
      const isProcessed = processedRanges.some(range => 
        matchStart >= range.start && matchEnd <= range.end
      );
      if (isProcessed) continue;
      
      // Add text before the link
      if (matchStart > lastIndex) {
        const textBefore = content.substring(lastIndex, matchStart);
        parts.push(<span key={`text-${lastIndex}`} className="!text-black">{textBefore}</span>);
      }
      
      // Add the markdown link
      parts.push(
        <a
          key={`link-${matchStart}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2 text-blue-800 hover:opacity-70 cursor-pointer break-words"
        >
          {linkText}
        </a>
      );
      
      processedRanges.push({ start: matchStart, end: matchEnd });
      lastIndex = matchEnd;
    }
    
    // Add remaining text after all links
    if (lastIndex < content.length) {
      const remainingText = content.substring(lastIndex);
      
      // Now handle plain URLs in the remaining text
      const urlRegex = /(https?:\/\/[^\s<]+)/g;
      const urlParts = remainingText.split(urlRegex);
      
      urlParts.forEach((part, index) => {
        if (part.match(urlRegex)) {
          parts.push(
            <a
              key={`url-${lastIndex}-${index}`}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-1 underline-offset-2 text-blue-800 hover:opacity-70 cursor-pointer break-words"
            >
              {part.replace('https://', '')}
            </a>
          );
        } else if (part) {
          parts.push(<span key={`text-${lastIndex}-${index}`} className="!text-black">{part}</span>);
        }
      });
    }
    
    return parts.length > 0 ? parts : content;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(err => {
        console.log("Video autoplay prevented:", err);
      });
    }
    
    // When MIT-Arnold video starts playing, show the course recommendation
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/MIT-Arnold.mp4" ||
        currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/MIT_Arnold.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("Online Program: Agentic AI & Organizational Transformation")
      );
      
      if (!messageExists) {
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const mitMessage: Message = {
            role: "assistant",
            content: "Let me share insights from MIT research on AI transformation. Organizations that successfully adopt AI focus on three key areas: workforce readiness, governance frameworks, and measurable outcomes. I recommend this course: [Online Program: Agentic AI & Organizational Transformation](https://online.professionalprogramsmit.com/agentic-ai-organizational-transformation?utm_source=bing&utm_medium=c&utm_term=mit%20agentic%20ai%20program&utm_location=81650&utm_network=o&utm_campaign=B-365D_US_BG_SE_MPE-DTR_BRAND_new&utm_content=Core_Brand&msclkid=f95db10a1e861dac789fd854a9994017)",
            timestamp: new Date(),
            id: messageId,
          };
          setMessages(prev => [...prev, mitMessage]);
        }, 1000); // Show after 1 second delay
      }
    }
    
    // When CWO-John2026 video starts playing, show the USMC Knowledge Management info
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/CWO-John2026.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("NAVMC-3000.1SECURED.pdf")
      );
      
      if (!messageExists) {
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const usmcMessage: Message = {
            role: "assistant",
            content: "The USMC approach to knowledge management emphasizes rapid information sharing and decision-making under uncertainty. Their framework integrates AI to enhance situational awareness. I suggest this document: [NAVMC-3000.1SECURED.pdf](https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NAVMC-3000.1SECURED.pdf)",
            timestamp: new Date(),
            id: messageId,
          };
          setMessages(prev => [...prev, usmcMessage]);
        }, 1000); // Show after 1 second delay
      }
    }
    
    // When KleeKaren2 video starts playing, show the Human Health & Fitness info
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/KleeKaren2.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("when-humans-and-ai-work-best-together")
      );
      
      if (!messageExists) {
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const healthMessage: Message = {
            role: "assistant",
            content: "AI applications in health and fitness range from personalized training to predictive health analytics. Recent studies show AI-driven interventions improve outcomes by 40%. Are you interested in specific applications or research findings? [mitsloan.mit.edu/when-humans-and-ai-work-best-together](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) by Brian Eastwood, Feb 3, 2025",
            timestamp: new Date(),
            id: messageId,
          };
          setMessages(prev => [...prev, healthMessage]);
        }, 1000); // Show after 1 second delay
      }
    }
    
    // When NC4ME2 video starts playing, show the NC4ME employment info
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NC4ME2.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("North Carolina for military employment")
      );
      
      if (!messageExists) {
        setTimeout(() => {
          const nc4meMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const nc4meMessage: Message = {
            role: "assistant",
            content: "North Carolina for military employment\nConnect directly to NC employers through our Career Connection 365 Employment Exchange. [NC4ME](https://www.nc4me.org)",
            timestamp: new Date(),
 
          };
          setMessages(prev => [...prev, nc4meMessage]);
          
          // Show Forbes article 5 seconds after NC4ME message
          setTimeout(() => {
            const forbesMessageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const forbesMessage: Message = {
              role: "assistant",
              content: "Additional Resource: [The 5 Growth Skills That Matter Most When Working With AI in 2026](https://www.forbes.com/sites/dianehamilton/2026/01/03/the-5-growth-skills-that-matter-most-when-working-with-ai-in-2026) - Forbes article on essential AI skills.",
              timestamp: new Date(),
              id: forbesMessageId,
            };
            setMessages(prev => [...prev, forbesMessage]);
          }, 5000);
        }, 1000); // Show after 1 second delay
      }
    }
    
    // When Agile Mike video starts playing, show Innovation Frameworks info with sequential messages
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/AgileMike.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("Innovation frameworks provide structured approaches")
      );
      
      if (!messageExists) {
        // First message - Innovation frameworks
        setTimeout(() => {
          const messageId1 = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const frameworkMessage: Message = {
            role: "assistant",
            content: "Innovation frameworks provide structured approaches to AI adoption. The most effective combine agile methodologies with design thinking and continuous learning. Would you like to explore specific frameworks? This can help any leader ask better AI questions: <a href=\"https://www.harvardbusiness.org/wp-content/uploads/2025/10/CRE6997_ENT_CLevel_Assessment_Oct2025.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">Harvard 2025 C-Level Assessment</a>. I suggest this resource: <a href=\"https://www.nist.gov/itl/ai-risk-management-framework\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">NIST AI Risk Management Framework</a>",
            timestamp: new Date(),
            id: messageId1,
          };
          setMessages(prev => [...prev, frameworkMessage]);
        }, 1000);
        
        // Second message - Free course recommendation (6 seconds after first)
        setTimeout(() => {
          const messageId2 = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const courseMessage: Message = {
            role: "assistant",
            content: "I also recommend this free course for Agile AI training: <a href=\"https://resources.scrumalliance.org/Course/ai-agility-comprehensive-introduction?_gl=1*a0c0tj*_gcl_au*Mzc4Mjc5ODEyLjE3NjcxMDE1NDA.\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">AI Agility: Comprehensive Introduction</a>. Additional Resource: <a href=\"https://www.forbes.com/sites/dianehamilton/2026/01/03/the-5-growth-skills-that-matter-most-when-working-with-ai-in-2026/\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">The 5 Growth Skills That Matter Most When Working With AI in 2026 - Forbes article on essential AI skills</a>.",
            timestamp: new Date(),
            id: messageId2,
          };
          setMessages(prev => [...prev, courseMessage]);
        }, 7000); // 1000ms + 6000ms delay
        
        // Third message - Lean vs Agile (5 seconds after second message)
        setTimeout(() => {
          const messageId3 = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const leanAgileMessage: Message = {
            role: "assistant",
            content: "<a href=\"https://www.ai-agile.org/2025/02/lean-vs-agile-understanding-differences.html?utm_source=copilot.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">https://www.ai-agile.org/2025/02/lean-vs-agile-understanding-differences.html</a>",
            timestamp: new Date(),
            id: messageId3,
          };
          setMessages(prev => [...prev, leanAgileMessage]);
        }, 12000); // 7000ms + 5000ms delay
        
        // Fourth message - Agile Manifesto (immediately after third)
        setTimeout(() => {
          const messageId4 = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const manifestoMessage: Message = {
            role: "assistant",
            content: "<a href=\"https://agilemanifesto.org/?utm_source=copilot.com\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">https://agilemanifesto.org</a>",
            timestamp: new Date(),
            id: messageId4,
          };
          setMessages(prev => [...prev, manifestoMessage]);
        }, 12500); // Just after the third message
      }
    }
    
    // When USMC Wentlang video starts playing, show Evidence-Based Policymaking reference
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/USMCWentlang.mp4") {
      // Check if this message hasn't been added yet in this session
      const messageExists = messages.some(msg => 
        msg.content.includes("Phase 2 Implementation of the Foundations for Evidence-Based Policymaking")
      );
      
      if (!messageExists) {
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const policyMessage: Message = {
            role: "assistant",
            content: "Real World Reference Materials: <a href=\"https://www.whitehouse.gov/wp-content/uploads/2025/01/M-25-05-Phase-2-Implementation-of-the-Foundations-for-Evidence-Based-Policymaking-Act-of-2018-Open-Government-Data-Access-and-Management-Guidance.pdf\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-blue-800 underline hover:text-blue-900\">M-25-05: Phase 2 Implementation of the Foundations for Evidence-Based Policymaking Act of 2018</a>",
            timestamp: new Date(),
            id: messageId,
          };
          setMessages(prev => [...prev, policyMessage]);
        }, 1000); // Show after 1 second delay
      }
    }
  }, [currentVideo]);

  const handleVideoEnd = () => {
    // Special handling: If SSgtW.mp4 just ended, play NC4ME2.mp4 next
    if (currentVideo === "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/SSgtW.mp4") {
      const nc4meVideo = "https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NC4ME2.mp4";
      setCurrentVideo(nc4meVideo);
      localStorage.setItem('lastPlayedVideo', nc4meVideo);
      // Messages will be shown by the useEffect that monitors currentVideo changes
      return;
    }
    
    // Get the next video from rotation (including custom videos)
    const lastPlayedVideo = localStorage.getItem('lastPlayedVideo');
    const currentIndex = combinedVideoRotation.findIndex(v => v === currentVideo);
    
    let nextIndex = (currentIndex + 1) % combinedVideoRotation.length;
    
    // Ensure we don't play the same video twice in a row
    if (combinedVideoRotation[nextIndex] === lastPlayedVideo && combinedVideoRotation.length > 1) {
      nextIndex = (nextIndex + 1) % combinedVideoRotation.length;
    }
    
    const nextVideo = combinedVideoRotation[nextIndex];
    setCurrentVideo(nextVideo);
    localStorage.setItem('lastPlayedVideo', nextVideo);
  };

  if (!isOpen) return null;

  const logQuestion = (topic: string, question: string, isPillButton: boolean) => {
    const stored = localStorage.getItem("agentQuestionLogs");
    const logs = stored ? JSON.parse(stored) : [];
    logs.push({ topic, question, timestamp: Date.now(), isPillButton });
    localStorage.setItem("agentQuestionLogs", JSON.stringify(logs));
  };

  const logConversation = (userQuestion: string, aiResponse: string, pillButtonContext?: string) => {
    const stored = localStorage.getItem("conversationLogs");
    const logs = stored ? JSON.parse(stored) : [];
    
    const conversationLog = {
      id: `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      sessionId: `session_${Date.now()}`,
      userId: "user_demo",
      userTier: "free",
      timestamp: Date.now(),
      userQuestion,
      aiResponse,
      pillButtonContext,
      tokensUsed: Math.ceil((userQuestion.length + aiResponse.length) / 4),
      conversationLength: messages.length + 1,
      dataConsent: localStorage.getItem("dataConsent") === "true",
      feedback: null
    };
    
    logs.push(conversationLog);
    localStorage.setItem("conversationLogs", JSON.stringify(logs));
    return conversationLog.id;
  };

  const handleFeedback = (messageId: string, feedbackType: "thumbs_up" | "thumbs_down") => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, feedback: feedbackType } : msg
    ));

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
      
      // RULE: Track ALL feedback in Supabase
      // Find the conversation log for this message
      const messageLog = updatedLogs.find((log: any) => log.id === messageId);
      if (messageLog) {
        const feedbackData: FeedbackData = {
          id: messageLog.id,
          feedbackType: feedbackType,
          messageContent: messageLog.aiResponse || '',
          userQuestion: messageLog.userQuestion || '',
          aiResponse: messageLog.aiResponse || '',
          userEmail: localStorage.getItem('userEmail'),
          userTier: localStorage.getItem('userTier'),
          userStatus: localStorage.getItem('userStatus'),
          sessionId: messageLog.sessionId || `session_${Date.now()}`,
          timestamp: messageLog.timestamp || Date.now(),
          category: messageLog.pillButtonContext || null,
          videoUrl: currentVideo || null,
          conversationLength: messages.length,
          dataConsent: localStorage.getItem('dataConsent') === 'true',
        };
        
        // Track feedback in Supabase (async, non-blocking)
        trackFeedbackInSupabase(feedbackData).catch(error => {
          console.error('Failed to track feedback in Supabase:', error);
          // Feedback is still stored in localStorage even if Supabase fails
        });
      }
    }
  };

  const getTopicResponse = (topic: string): string => {
    const responses: Record<string, string> = {
      "Applied AI for Transformation": "Let me share insights from MIT research on AI transformation. Organizations that successfully adopt AI focus on three key areas: workforce readiness, governance frameworks, and measurable outcomes. I recommend this course: [Online Program: Agentic AI & Organizational Transformation](https://online.professionalprogramsmit.com/agentic-ai-organizational-transformation?utm_source=bing&utm_medium=c&utm_term=mit%20agentic%20ai%20program&utm_location=81650&utm_network=o&utm_campaign=B-365D_US_BG_SE_MPE-DTR_BRAND_new&utm_content=Core_Brand&msclkid=f95db10a1e861dac789fd854a9994017)",
      "USMC Knowledge Management": "The USMC approach to knowledge management emphasizes rapid information sharing and decision-making under uncertainty. Their framework integrates AI to enhance situational awareness. I suggest this document: [NAVMC-3000.1SECURED.pdf](https://naskxuojfdqcunotdjzi.supabase.co/storage/v1/object/public/make-3504d096-videos/NAVMC-3000.1SECURED.pdf)",
      "Human Health & Fitness": "AI applications in health and fitness range from personalized training to predictive health analytics. Recent studies show AI-driven interventions improve outcomes by 40%. Are you interested in specific applications or research findings? [mitsloan.mit.edu/when-humans-and-ai-work-best-together](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) by Brian Eastwood, Feb 3, 2025",
      "Human Health": "AI applications in health and fitness range from personalized training to predictive health analytics. Recent studies show AI-driven interventions improve outcomes by 40%. Are you interested in specific applications or research findings? [mitsloan.mit.edu/when-humans-and-ai-work-best-together](https://mitsloan.mit.edu/ideas-made-to-matter/when-humans-and-ai-work-best-together-and-when-each-better-alone) by Brian Eastwood, Feb 3, 2025",
      "Frameworks for Innovation": "Innovation frameworks provide structured approaches to AI adoption. The most effective combine agile methodologies with design thinking and continuous learning. Would you like to explore specific frameworks?\n\nThis can help any leader ask better AI questions: [Harvard 2025 C-Level Assessment](https://www.harvardbusiness.org/wp-content/uploads/2025/10/CRE6997_ENT_CLevel_Assessment_Oct2025.pdf)\n\nI suggest this resource: [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)",
      "AI Blind Spots & Pitfalls": "Common AI blind spots include bias in training data, over-reliance on automation, and lack of human oversight. Organizations need governance structures to identify and mitigate these risks.\n\nLeaders must ask critical questions: What level of accuracy is truly required? Can lower‑cost models achieve the same outcome? Should systems be air‑gapped for privacy or distributed across multi‑cloud environments for resilience and sustainability? Have we created risk by becoming dependent on consultants or vendor lock-in? What Key Performance Indicators (KPI) will be used to measure AI investment?\n\nHistory shows what happens when organizations fail to evolve. Amazon moved from pilots to drone delivery while competitors hesitated. Blockbuster once had 9,000 stores and $6B in revenue, yet its failure to adapt left only one store standing today.\n\nThe lesson is clear: the greatest danger lies in not evolving. The risks include loss of consumer confidence, loss of funding, and loss of competitive advantage — all of which can be far more costly than adopting AI in the first place. What specific challenges are you facing?\n\nI recommend this IBM resource: [Year of Agentic AI Takes Center Stage in 2025](https://www.ibm.com/think/news/year-agentic-ai-center-stage-2025?utm_source=copilot.com)",
      "Governance & Workforce Readiness": "Effective AI governance balances innovation with risk management. Workforce readiness requires upskilling, change management, and clear role definitions using frameworks like RACI. Get a template and get started! [https://www.smartsheet.com/content/raci-templates-excel](https://www.smartsheet.com/content/raci-templates-excel)",
      "ROI": "Return on Investment (ROI) is a simple way to measure how much value you get back compared to what you put in. It's used in business, finance, marketing, training programs, and even personal decisions.",
      "KPI & ROI": "An AI Governance KPI Dashboard builds trust, strengthens transparency and maximizes return on investment by giving leaders a clear view of model reliability, data-drift incidents, fairness audit coverage, and overall operational performance. Key metrics include: Operational Maintenance & Consumption Cost, Model Reliability, Data Drift Incidents, Fairness Audit Coverage, Transparency Measurement, IT Spending on Applied AI, and AI Workforce Training & Readiness. I suggest this resource: [STATE OF AI IN BUSINESS 2025](https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf?utm_source=copilot.com)",
      "Training": "Effective AI training programs combine technical skills with practical application. Research shows that hands-on learning with real-world scenarios increases retention by 60%.\n\nCheck out: [The 5 Skill Sets Leaders Must Develop in the AI Era](https://www.forbes.com/councils/forbescoachescouncil/2026/01/07/the-5-skill-sets-leaders-must-develop-in-the-ai-era/?utm_source=copilot.com) - Forbes article on essential AI skills.\n\nFor free AI leadership training, and a personalized agent like this one, check out: [https://agent.myora.now](https://agent.myora.now)",
      "Next Live Q & A": "Let's make an appointment! Click [Calendly.com/caraz007](https://calendly.com/caraz007)\n\nMy personal AI avatar makes the introduction and helps me stay organized! We can talk about free AI leadership training, Agentic AI, measurable change and learn how you can get a personalized agent just like this one!",
      "RACI": "RACI Matrix is a powerful governance framework that clarifies roles and responsibilities. It stands for: Responsible, Accountable, Consulted, and Informed. For AI projects, RACI helps prevent confusion about who owns decisions, who needs to be informed, and who should be consulted. Get free RACI template: www.smartsheet.com/content/raci-templates-excel",
      "Governance": "AI governance frameworks establish clear accountability, ethical guidelines, and risk management protocols.\n\nKey components include: decision rights, oversight mechanisms, compliance standards, and continuous monitoring.\n\nExplore best practices: mitsloan.mit.edu/ai-governance-what-is-it-and-why",
      "Bias": "AI bias occurs when algorithms produce systematically prejudiced results due to flawed training data or design assumptions.\n\nMitigation strategies include: diverse training data, regular audits, human oversight, and transparency in decision-making.\n\nDeep dive into AI bias: ibm.com/topics/ai-bias",
      "Risk": "AI risk management involves identifying, assessing, and mitigating potential harms from AI systems.\n\nCritical risk areas: data privacy, security vulnerabilities, model drift, ethical concerns, and regulatory compliance.\n\nFramework guide: nist.gov/ai-risk-management-framework",
      "Report": "This report summarizes observation(s) recorded on January 6, 2026. The observations are categorized into areas for improvement or practices to sustain. Specific objectives during this observation include:\n• [objective]\n• [objective]\n• [objective]",
      "Leadership": "House Resolution 719 reminds us of our service to civil discussion and healthy debate. [US Congress](https://www.congress.gov/bill/119th-congress/house-resolution/719/text?utm_source=copilot.com)",
      "Open Government Act": "The Open Government requires Machine-Readable Data — Open Government data assets made available by all agencies. [https://www.congress.gov/bill/115th-congress/house-bill/1770/text](https://www.congress.gov/bill/115th-congress/house-bill/1770/text)",
      "AI Trends": "Here are the latest AI insights from our configured sources:\n\n📊 **Forbes AI 50** - Leading companies transforming industries with artificial intelligence\n[Forbes AI 50 List](https://www.forbes.com/lists/ai50/?utm_source=copilot.com)\n\n🔬 **MIT Technology Review – AI Section** - Deep, technical, and ethical AI reporting from MIT's respected publication\n[MIT Tech Review AI](https://www.technologyreview.com/topic/artificial-intelligence/)\n\nThese sources provide cutting-edge insights on AI innovation, emerging technologies, and industry transformation. What specific AI trend interests you?",
    };
    return responses[topic] || "Thank you for asking. I am thinking... hmm...";
  };

  const detectKeywordTopic = (query: string): string | null => {
    const queryLower = query.toLowerCase();
    
    const keywordMap: Record<string, string[]> = {
      "Applied AI for Transformation": ["transformation", "digital transformation", "ai adoption", "mit", "arnold"],
      "USMC Knowledge Management": ["usmc", "marine", "knowledge management", "cwo", "john"],
      "Human Health & Fitness": ["health", "fitness", "wellness", "medical", "healthcare"],
      "Frameworks for Innovation": ["framework", "innovation", "agile", "design thinking", "mike"],
      "AI Blind Spots & Pitfalls": ["blind spot", "pitfall", "risk", "threat", "vulnerability", "bias", "biased"],
      "Governance & Workforce Readiness": ["governance", "oversight", "compliance", "policy", "regulation", "workforce", "readiness"],
      "ROI": ["roi", "return on investment"],
      "KPI & ROI": ["kpi", "metric", "dashboard", "performance"],
      "Training": ["training", "learning", "education", "course", "workshop", "skill"],
      "Next Live Q & A": ["live", "q&a", "question", "appointment", "calendly", "meeting"],
      "RACI": ["raci", "responsible", "accountable", "consulted", "informed", "matrix"],
      "Report": ["report", "observation", "summary", "objective"],
      "Open Government Act": ["open government act", "open government", "budget", "roi", "machine readable", "machine-readable"],
    };

    // Check each topic's keywords
    for (const [topic, keywords] of Object.entries(keywordMap)) {
      if (keywords.some(keyword => queryLower.includes(keyword))) {
        return topic;
      }
    }

    return null;
  };

  // ============================================================================
  // AI TRENDS RAG - JINA AI READER INTEGRATION
  // ============================================================================
  
  /**
   * Detects if a question is AI-related and should trigger AI Trends retrieval
   */
  const isAIRelatedQuestion = (query: string): boolean => {
    const queryLower = query.toLowerCase();
    
    // AI-related keywords that should trigger retrieval from AI Trends sources
    const aiKeywords = [
      "artificial intelligence",
      "ai trend",
      "ai company",
      "ai companies",
      "machine learning",
      "neural network",
      "deep learning",
      "llm",
      "large language model",
      "generative ai",
      "gen ai",
      "chatgpt",
      "claude",
      "openai",
      "anthropic",
      "ai startup",
      "ai innovation",
      "ai technology",
      "ai research",
      "latest ai",
      "new ai",
      "ai development",
      "ai breakthrough",
      "ai advancement",
      "ai news",
      "ai update",
    ];
    
    return aiKeywords.some(keyword => queryLower.includes(keyword));
  };

  /**
   * Fetches content from a URL using Jina AI Reader
   * Returns clean, LLM-friendly text
   */
  const fetchWithJinaReader = async (url: string): Promise<string> => {
    try {
      const jinaUrl = `https://r.jina.ai/${url}`;
      const response = await fetch(jinaUrl, {
        headers: {
          'Accept': 'text/plain',
          'X-Return-Format': 'text'
        }
      });
      
      if (!response.ok) {
        throw new Error(`Jina Reader failed: ${response.status}`);
      }
      
      const text = await response.text();
      // Return first 3000 characters to avoid overwhelming the context
      return text.slice(0, 3000);
    } catch (error) {
      console.error('Error fetching with Jina Reader:', error);
      return '';
    }
  };

  /**
   * Retrieves relevant content from AI Trends sources
   */
  const retrieveAITrendsContent = async (): Promise<string> => {
    const sources = [
      {
        name: "Forbes AI 50",
        url: "https://www.forbes.com/lists/ai50/"
      },
      {
        name: "MIT Technology Review - AI",
        url: "https://www.technologyreview.com/topic/artificial-intelligence/"
      }
    ];
    
    try {
      // Fetch from both sources in parallel
      const contents = await Promise.all(
        sources.map(async (source) => {
          const content = await fetchWithJinaReader(source.url);
          return content ? `\n\n**From ${source.name}:**\n${content}` : '';
        })
      );
      
      const combinedContent = contents.filter(c => c).join('\n\n---\n');
      return combinedContent;
    } catch (error) {
      console.error('Error retrieving AI Trends content:', error);
      return '';
    }
  };

  // Detect news source configuration commands
  const detectNewsSourceConfig = (query: string): {name: string, url: string} | null => {
    const queryLower = query.toLowerCase();
    
    // Pattern: "connect news to [source]" or "set news source to [source]"
    const connectPatterns = [
      /connect\s+news\s+(?:to|with)\s+(.+)/i,
      /set\s+news\s+source\s+to\s+(.+)/i,
      /configure\s+news\s+(?:to|with)\s+(.+)/i,
      /link\s+news\s+(?:to|with)\s+(.+)/i,
    ];

    for (const pattern of connectPatterns) {
      const match = query.match(pattern);
      if (match) {
        const sourceName = match[1].trim();
        
        // Predefined news source URLs
        const newsSources: Record<string, string> = {
          "techcrunch": "https://techcrunch.com",
          "tech crunch": "https://techcrunch.com",
          "the verge": "https://www.theverge.com",
          "verge": "https://www.theverge.com",
          "wired": "https://www.wired.com",
          "cnn": "https://www.cnn.com",
          "bbc": "https://www.bbc.com/news",
          "reuters": "https://www.reuters.com",
          "associated press": "https://apnews.com",
          "ap news": "https://apnews.com",
          "new york times": "https://www.nytimes.com",
          "nyt": "https://www.nytimes.com",
          "washington post": "https://www.washingtonpost.com",
          "wall street journal": "https://www.wsj.com",
          "wsj": "https://www.wsj.com",
          "fox news": "https://www.foxnews.com",
          "msnbc": "https://www.msnbc.com",
          "npr": "https://www.npr.org",
          "bloomberg": "https://www.bloomberg.com",
          "financial times": "https://www.ft.com",
          "ft": "https://www.ft.com",
          "the guardian": "https://www.theguardian.com",
          "guardian": "https://www.theguardian.com",
          "forbes": "https://www.forbes.com",
          "business insider": "https://www.businessinsider.com",
          "axios": "https://www.axios.com",
          "politico": "https://www.politico.com",
          "mit technology review": "https://www.technologyreview.com",
          "mit tech review": "https://www.technologyreview.com",
          "ars technica": "https://arstechnica.com",
          "engadget": "https://www.engadget.com",
          "cnet": "https://www.cnet.com",
          "zdnet": "https://www.zdnet.com",
        };

        const sourceNameLower = sourceName.toLowerCase();
        const url = newsSources[sourceNameLower];
        
        if (url) {
          return { name: sourceName, url };
        } else {
          // Check if it's a URL
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: sourceName, url: sourceName };
          }
        }
      }
    }

    return null;
  };

  // Detect library configuration commands for SharePoint/OneDrive/Google Drive
  const detectLibraryConfig = (query: string): {name: string, url: string} | null => {
    const queryLower = query.toLowerCase();
    
    // Pattern: "connect library to [source]" or "set library to [source]"
    const connectPatterns = [
      /connect\s+library\s+(?:to|with)\s+(.+)/i,
      /set\s+library\s+(?:to|with)\s+(.+)/i,
      /configure\s+library\s+(?:to|with)\s+(.+)/i,
      /link\s+library\s+(?:to|with)\s+(.+)/i,
    ];

    for (const pattern of connectPatterns) {
      const match = query.match(pattern);
      if (match) {
        const sourceName = match[1].trim();
        const sourceNameLower = sourceName.toLowerCase();
        
        // Check if it's SharePoint
        if (sourceNameLower.includes('sharepoint') || sourceName.includes('.sharepoint.com')) {
          // If it's a URL, use it directly
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: "SharePoint", url: sourceName };
          } else {
            return { name: "SharePoint", url: "https://www.office.com/launch/sharepoint" };
          }
        }
        
        // Check if it's OneDrive
        if (sourceNameLower.includes('onedrive') || sourceNameLower.includes('one drive')) {
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: "OneDrive", url: sourceName };
          } else {
            return { name: "OneDrive", url: "https://onedrive.live.com" };
          }
        }
        
        // Check if it's Google Drive
        if (sourceNameLower.includes('google drive') || sourceNameLower.includes('drive.google')) {
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: "Google Drive", url: sourceName };
          } else {
            return { name: "Google Drive", url: "https://drive.google.com" };
          }
        }
        
        // Check if it's Microsoft 365
        if (sourceNameLower.includes('microsoft 365') || sourceNameLower.includes('office 365') || sourceNameLower.includes('m365')) {
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: "Microsoft 365", url: sourceName };
          } else {
            return { name: "Microsoft 365", url: "https://www.office.com" };
          }
        }
        
        // Check if it's Salesforce
        if (sourceNameLower.includes('salesforce') || sourceName.includes('.salesforce.com')) {
          if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
            return { name: "Salesforce", url: sourceName };
          } else {
            return { name: "Salesforce", url: "https://login.salesforce.com" };
          }
        }
        
        // If it's a URL but not recognized
        if (sourceName.startsWith('http://') || sourceName.startsWith('https://')) {
          return { name: "Custom Library", url: sourceName };
        }
      }
    }

    return null;
  };

  // Detect video conferencing configuration commands for Teams/FaceTime/Zoom/etc
  const detectVideoConfig = (query: string): {name: string, url: string} | null => {
    const queryLower = query.toLowerCase();
    
    // Pattern: "connect video to [service]" or "set video to [service]"
    const connectPatterns = [
      /connect\s+video\s+(?:to|with)\s+(.+)/i,
      /set\s+video\s+(?:to|with)\s+(.+)/i,
      /configure\s+video\s+(?:to|with)\s+(.+)/i,
      /link\s+video\s+(?:to|with)\s+(.+)/i,
    ];

    for (const pattern of connectPatterns) {
      const match = query.match(pattern);
      if (match) {
        const serviceName = match[1].trim();
        const serviceNameLower = serviceName.toLowerCase();
        
        // Check for Microsoft Teams
        if (serviceNameLower.includes('teams') || serviceNameLower.includes('microsoft teams')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Microsoft Teams", url: serviceName };
          } else {
            return { name: "Microsoft Teams", url: "https://teams.microsoft.com" };
          }
        }
        
        // Check for FaceTime
        if (serviceNameLower.includes('facetime')) {
          return { name: "FaceTime", url: "facetime://" };
        }
        
        // Check for Zoom
        if (serviceNameLower.includes('zoom')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Zoom", url: serviceName };
          } else {
            return { name: "Zoom", url: "https://zoom.us" };
          }
        }
        
        // Check for Google Meet
        if (serviceNameLower.includes('google meet') || serviceNameLower.includes('meet')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Google Meet", url: serviceName };
          } else {
            return { name: "Google Meet", url: "https://meet.google.com" };
          }
        }
        
        // Check for Webex
        if (serviceNameLower.includes('webex')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Webex", url: serviceName };
          } else {
            return { name: "Webex", url: "https://www.webex.com" };
          }
        }
        
        // If it's a URL but not recognized
        if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
          return { name: "Custom Video Service", url: serviceName };
        }
      }
    }

    return null;
  };

  // Detect calendar configuration commands for Calendly/Google Calendar/etc
  const detectCalendarConfig = (query: string): {name: string, url: string} | null => {
    const queryLower = query.toLowerCase();
    
    // Check for "connect calendar to" pattern
    if (queryLower.includes('connect') && queryLower.includes('calendar')) {
      const match = query.match(/connect\s+calendar\s+to\s+(.+)/i);
      if (match) {
        const serviceName = match[1].trim();
        const serviceNameLower = serviceName.toLowerCase();
        
        // Check for Calendly
        if (serviceNameLower.includes('calendly')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Calendly", url: serviceName };
          } else {
            return { name: "Calendly", url: "https://calendly.com" };
          }
        }
        
        // Check for Google Calendar
        if (serviceNameLower.includes('google') && serviceNameLower.includes('calendar')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Google Calendar", url: serviceName };
          } else {
            return { name: "Google Calendar", url: "https://calendar.google.com" };
          }
        }
        
        // Check for Outlook Calendar
        if (serviceNameLower.includes('outlook')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Outlook Calendar", url: serviceName };
          } else {
            return { name: "Outlook Calendar", url: "https://outlook.live.com/calendar" };
          }
        }
        
        // Check for Microsoft Calendar / Office 365
        if (serviceNameLower.includes('microsoft') || serviceNameLower.includes('office 365')) {
          if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
            return { name: "Microsoft Calendar", url: serviceName };
          } else {
            return { name: "Microsoft Calendar", url: "https://outlook.office365.com/calendar" };
          }
        }
        
        // If it's a URL but not recognized
        if (serviceName.startsWith('http://') || serviceName.startsWith('https://')) {
          return { name: "Custom Calendar", url: serviceName };
        }
      }
    }

    return null;
  };

  // Detect email configuration commands for AI reports
  const detectEmailConfig = (query: string): string | null => {
    const queryLower = query.toLowerCase();
    
    // Pattern: "set email to [email]" or "configure email [email]"
    const emailPatterns = [
      /(?:set|configure|update)\s+(?:subscriber\s+)?email\s+(?:to\s+)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
      /(?:set|configure|update)\s+(?:report|reports)\s+email\s+(?:to\s+)?([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
      /(?:send\s+reports?\s+to\s+)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i,
    ];

    for (const pattern of emailPatterns) {
      const match = query.match(pattern);
      if (match) {
        return match[1].trim();
      }
    }

    return null;
  };

  // Detect when user wants to add a custom video URL to the library
  const detectAddVideoUrl = (query: string): string | null => {
    const queryLower = query.toLowerCase();
    
    // Pattern: "add video [url]" or "add video content [url]" or "include video [url]"
    const addVideoPatterns = [
      /add\s+video\s+(?:content\s+)?(?:url\s+)?(https?:\/\/[^\s]+\.(?:mp4|mov|avi|webm|m4v)[^\s]*)/i,
      /include\s+video\s+(https?:\/\/[^\s]+\.(?:mp4|mov|avi|webm|m4v)[^\s]*)/i,
      /upload\s+video\s+(https?:\/\/[^\s]+\.(?:mp4|mov|avi|webm|m4v)[^\s]*)/i,
      /add\s+(?:this\s+)?video\s+(https?:\/\/[^\s]+)/i,
    ];

    for (const pattern of addVideoPatterns) {
      const match = query.match(pattern);
      if (match) {
        const url = match[1].trim();
        // Validate it's a video URL
        if (url.match(/\.(mp4|mov|avi|webm|m4v)(\?.*)?$/i) || url.includes('supabase.co') || url.includes('video')) {
          return url;
        }
      }
    }

    return null;
  };

  // Detect when user wants to set a persona video URL (highest priority)
  const detectPersonaVideoUrl = (query: string): { slot: number; url: string } | null => {
    const queryLower = query.toLowerCase();
    
    // Patterns: "set persona video 1 to [url]" or "set persona video 2 link [url]"
    const personaVideoPatterns = [
      /set\s+persona\s+video\s+(\d+)\s+(?:to|link)\s+(https?:\/\/[^\s]+)/i,
      /persona\s+video\s+(\d+)\s+(?:is|=)\s+(https?:\/\/[^\s]+)/i,
      /configure\s+persona\s+(\d+)\s+(?:video|link)\s+(https?:\/\/[^\s]+)/i,
    ];

    for (const pattern of personaVideoPatterns) {
      const match = query.match(pattern);
      if (match) {
        const slot = parseInt(match[1]);
        const url = match[2].trim();
        // Support up to 3 persona video slots
        if (slot >= 1 && slot <= 3) {
          return { slot: slot - 1, url }; // Convert to 0-indexed
        }
      }
    }

    return null;
  };

  // Detect when user wants to purchase/enable training package
  const detectEnableTrainingPackage = (query: string): boolean => {
    const queryLower = query.toLowerCase();
    
    const patterns = [
      /enable\s+training\s+package/i,
      /activate\s+training\s+package/i,
      /buy\s+training\s+package/i,
      /purchase\s+training\s+package/i,
      /get\s+training\s+package/i,
      /upgrade.*training/i,
    ];

    return patterns.some(pattern => pattern.test(query));
  };

  // Detect when user wants to upload a local persona video file
  const detectUploadPersonaVideo = (query: string): number | null => {
    const queryLower = query.toLowerCase();
    
    // Patterns: "upload persona video 1" or "upload local video to persona 2"
    const uploadPatterns = [
      /upload\s+persona\s+video\s+(\d+)/i,
      /upload\s+local\s+video\s+(?:to\s+)?(?:persona\s+)?(\d+)/i,
      /add\s+local\s+(?:video\s+)?(?:to\s+)?persona\s+(\d+)/i,
      /set\s+persona\s+(\d+)\s+(?:from\s+)?(?:local\s+)?file/i,
    ];

    for (const pattern of uploadPatterns) {
      const match = query.match(pattern);
      if (match) {
        const slot = parseInt(match[1]);
        // Support up to 3 persona video slots
        if (slot >= 1 && slot <= 3) {
          return slot - 1; // Convert to 0-indexed
        }
      }
    }

    return null;
  };

  // Detect when user wants to set a training video URL
  const detectTrainingVideoUrl = (query: string): { slot: number; url: string } | null => {
    const queryLower = query.toLowerCase();
    
    // Patterns: "set training video 1 to [url]" or "training video 2 link [url]"
    const trainingVideoPatterns = [
      /set\s+training\s+video\s+(\d+)\s+(?:to|link)\s+(https?:\/\/[^\s]+)/i,
      /training\s+video\s+(\d+)\s+(?:is|=)\s+(https?:\/\/[^\s]+)/i,
      /configure\s+training\s+(\d+)\s+(?:video|link)\s+(https?:\/\/[^\s]+)/i,
    ];

    for (const pattern of trainingVideoPatterns) {
      const match = query.match(pattern);
      if (match) {
        const slot = parseInt(match[1]);
        const url = match[2].trim();
        // Support up to 6 training video slots
        if (slot >= 1 && slot <= 6) {
          return { slot: slot - 1, url }; // Convert to 0-indexed
        }
      }
    }

    return null;
  };

  // Detect when user wants to upload a local training video file
  const detectUploadTrainingVideo = (query: string): number | null => {
    const queryLower = query.toLowerCase();
    
    // Patterns: "upload training video 1" or "upload local video to training 2"
    const uploadPatterns = [
      /upload\s+training\s+video\s+(\d+)/i,
      /upload\s+local\s+video\s+(?:to\s+)?(?:training\s+)?(\d+)/i,
      /add\s+local\s+(?:video\s+)?(?:to\s+)?training\s+(\d+)/i,
      /set\s+training\s+(\d+)\s+(?:from\s+)?(?:local\s+)?file/i,
    ];

    for (const pattern of uploadPatterns) {
      const match = query.match(pattern);
      if (match) {
        const slot = parseInt(match[1]);
        // Support up to 6 training video slots
        if (slot >= 1 && slot <= 6) {
          return slot - 1; // Convert to 0-indexed
        }
      }
    }

    return null;
  };

  // Handle file upload from user's device
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate it's a video file
    if (!file.type.startsWith('video/')) {
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `⚠️ Please upload a valid video file (MP4, MOV, WebM, etc.)`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Check if this is for persona or training video
    const personaSlot = pendingPersonaVideoSlot;
    const trainingSlot = pendingTrainingVideoSlot;
    
    if (personaSlot === null && trainingSlot === null) return;

    try {
      if (personaSlot !== null) {
        // Save persona video to IndexedDB and get blob URL
        const blobUrl = await saveVideoToIndexedDB(personaSlot, file);
        
        // Update persona videos array
        const updatedPersonaVideos = [...personaVideoUrls];
        updatedPersonaVideos[personaSlot] = blobUrl;
        const compactPersonaVideos = updatedPersonaVideos.filter(url => url);
        setPersonaVideoUrls(compactPersonaVideos);
        
        // Clear the pending slot
        setPendingPersonaVideoSlot(null);
        
        // Send confirmation message
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `✅ Local video uploaded successfully to Persona slot ${personaSlot + 1}! Your video (${(file.size / 1024 / 1024).toFixed(2)}MB) has been stored locally and will play first when you open the agent.`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          logConversation(`Upload video to slot ${personaSlot + 1}`, response, "Local Video Upload");
        }, 800);
      } else if (trainingSlot !== null) {
        // Training video upload
        const blobUrl = URL.createObjectURL(file);
        
        // Update training videos array
        const updatedTrainingVideos = [...trainingVideoUrls];
        updatedTrainingVideos[trainingSlot] = blobUrl;
        const compactTrainingVideos = updatedTrainingVideos.filter(url => url);
        setTrainingVideoUrls(compactTrainingVideos);
        localStorage.setItem('trainingVideoUrls', JSON.stringify(compactTrainingVideos));
        
        // Clear the pending slot
        setPendingTrainingVideoSlot(null);
        
        // Send confirmation message
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `✅ Training video ${trainingSlot + 1} uploaded successfully! Your training video (${(file.size / 1024 / 1024).toFixed(2)}MB, ~1 min) is ready. These videos will play first when you tap the Training button.`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          logConversation(`Upload training video ${trainingSlot + 1}`, response, "Training Video Upload");
        }, 800);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `❌ Failed to upload video. Please try again or use a smaller file.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
    }
  };

  const handleCategoryClick = (category: string) => {
    
    // Special handling for News button - open configured source if available
    if (category === "News" && configuredNewsSource) {
      window.open(configuredNewsSource.url, '_blank');
      // Still log the interaction
      logQuestion(category, category, true);
      return;
    }
    
    // Ensure video is visible when a category is clicked
    setIsVideoVisible(true);
    
    const userMessage: Message = { role: "user", content: category };
    setMessages(prev => [...prev, userMessage]);
    
    logQuestion(category, category, true);
    
    // Use category-specific video if available, otherwise use automatic rotation
    let videoToPlay = '';
    
    // Special handling for Training button - play training videos first if package is active
    if (category === "Training" && hasTrainingPackage && trainingVideoUrls.length > 0) {
      // Play first training video, or rotate through them
      const lastPlayedTraining = localStorage.getItem('lastPlayedTrainingIndex');
      const lastIndex = lastPlayedTraining ? parseInt(lastPlayedTraining) : -1;
      const nextIndex = (lastIndex + 1) % trainingVideoUrls.length;
      videoToPlay = trainingVideoUrls[nextIndex];
      localStorage.setItem('lastPlayedTrainingIndex', nextIndex.toString());
      setCurrentVideo(videoToPlay);
    } else if (topicVideoMap[category]) {
      videoToPlay = topicVideoMap[category];
      setCurrentVideo(videoToPlay);
    } else {
      // For Leadership or other categories, play next video in rotation (including custom videos)
      const currentIndex = combinedVideoRotation.findIndex(v => v === currentVideo);
      const nextIndex = (currentIndex + 1) % combinedVideoRotation.length;
      videoToPlay = combinedVideoRotation[nextIndex];
      setCurrentVideo(videoToPlay);
    }
    
    // Track last played video
    if (videoToPlay) {
      localStorage.setItem('lastPlayedVideo', videoToPlay);
    }
    
    setIsTyping(true);
    
    // Get response
    const response = getTopicResponse(category);
    
    // Send response after delay
    setTimeout(() => {
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        id: messageId,
        timestamp: Date.now(),
        feedback: null
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      // Log conversation
      logConversation(category, response, category);
      
      // Special follow-up for USMC Knowledge Management - send House Resolution 719 message after 5 seconds
      if (category === "USMC Knowledge Management") {
        setTimeout(() => {
          const followUpId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const followUpMessage: Message = {
            role: "assistant",
            content: "House Resolution 719 reminds us of our service to civil discussion and healthy debate. [US Congress](https://www.congress.gov/bill/119th-congress/house-resolution/719/text?utm_source=copilot.com)",
            id: followUpId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 5000); // 5 second delay after the first message
      }
      
      // Special follow-up for Training - send Forbes article after 5 seconds
      if (category === "Training") {
        setTimeout(() => {
          const followUpId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const followUpMessage: Message = {
            role: "assistant",
            content: "Additional Resource: The 5 Growth Skills That Matter Most When Working With AI in 2026 - Forbes article on essential AI skills.\n\nhttps://www.forbes.com/sites/dianehamilton/2026/01/03/the-5-growth-skills-that-matter-most-when-working-with-ai-in-2026",
            id: followUpId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, followUpMessage]);
        }, 5000); // 5 second delay after the first message
      }
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // ========================================================================
    // QUESTION LIMIT CHECK FOR FREE USERS
    // ========================================================================
    // Check if user has accepted agreement
    const userAgreementAccepted = localStorage.getItem("userAgreementAccepted");
    
    if (!userAgreementAccepted) {
      // Increment question count
      const newCount = questionCount + 1;
      setQuestionCount(newCount);
      localStorage.setItem('userQuestionCount', newCount.toString());
      
      // Check if limit reached (10 questions)
      if (newCount >= 10) {
        // Show consent modal after this question is answered
        if (onShowConsentModal) {
          // Delay showing modal until after response
          setTimeout(() => {
            onShowConsentModal();
          }, 2000);
        }
      }
    }

    // ========================================================================
    // RESPONSE PRIORITY ARCHITECTURE
    // ========================================================================
    // 1. APP CONTEXT CONTENT (First Priority - Local Knowledge Base)
    //    - Topic-specific responses from getTopicResponse()
    //    - Keyword detection via detectKeywordTopic()
    //    - News source configuration
    //    - Special handlers (Agile, etc.)
    //
    // 2. OPENAI API FALLBACK (Second Priority - External AI)
    //    - For questions outside app context
    //    - To be integrated where generic response currently exists
    //    - Will provide dynamic answers to unmatched queries
    // ========================================================================

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    const query = inputValue;
    setInputValue("");
    
    // Check for news source configuration first
    const newsSourceConfig = detectNewsSourceConfig(query);
    if (newsSourceConfig) {
      // Save configuration
      setConfiguredNewsSource(newsSourceConfig);
      localStorage.setItem('configuredNewsSource', JSON.stringify(newsSourceConfig));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ News source configured successfully! The News button will now link to ${newsSourceConfig.name}. Click the News pill button to visit ${newsSourceConfig.url}`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Configuration");
      }, 800);
      return;
    }
    
    // Check for library configuration
    const libraryConfig = detectLibraryConfig(query);
    if (libraryConfig) {
      // Save configuration
      setConfiguredLibrary(libraryConfig);
      localStorage.setItem('configuredLibrary', JSON.stringify(libraryConfig));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Library configured successfully! The Library button will now link to ${libraryConfig.name}. Click the Library pill button to visit ${libraryConfig.url}`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Configuration");
      }, 800);
      return;
    }
    
    // Check for video configuration
    const videoConfig = detectVideoConfig(query);
    if (videoConfig) {
      // Save configuration
      setConfiguredVideo(videoConfig);
      localStorage.setItem('configuredVideo', JSON.stringify(videoConfig));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Video service configured successfully! The Video button will now link to ${videoConfig.name}. Click the Video pill button to visit ${videoConfig.url}`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Configuration");
      }, 800);
      return;
    }
    
    // Check for calendar configuration
    const calendarConfig = detectCalendarConfig(query);
    if (calendarConfig) {
      // Save configuration
      setConfiguredCalendar(calendarConfig);
      localStorage.setItem('configuredCalendar', JSON.stringify(calendarConfig));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Calendar service configured successfully! The Calendar button will now link to ${calendarConfig.name}. Click the Calendar icon to visit ${calendarConfig.url}`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Configuration");
      }, 800);
      return;
    }
    
    // Check for email configuration
    const emailConfig = detectEmailConfig(query);
    if (emailConfig) {
      // Save configuration
      setSubscriberEmail(emailConfig);
      localStorage.setItem('subscriberEmail', emailConfig);
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Subscriber email configured successfully! All AI reports will be sent to ${emailConfig}. When you submit a report via the "Report AI Issue" button, it will include this email address.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Configuration");
      }, 800);
      return;
    }
    
    // Check for enabling training package
    if (detectEnableTrainingPackage(query)) {
      // Enable the training package
      setHasTrainingPackage(true);
      localStorage.setItem('hasTrainingPackage', 'true');
      
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `🎓 Premium Training Content package activated! You now have 6 custom training video slots (1 minute each). Perfect for:\n\n• Annual compliance training\n• Summer safety programs\n• Onboarding materials\n• Seasonal updates\n\nUse commands like:\n• "set training video 1 to [URL]" for Supabase/web videos\n• "upload training video 1" for local files\n\nStart configuring your training videos now!`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Training Package");
      }, 800);
      return;
    }
    
    // Check for uploading local persona video file
    const uploadSlot = detectUploadPersonaVideo(query);
    if (uploadSlot !== null) {
      // Check if user is subscriber
      const userTier = localStorage.getItem('userTier');
      if (userTier === 'free') {
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `⚠️ Uploading local persona videos is a premium feature. Please upgrade to a paid plan to add persona video content.`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      // Trigger file input for upload
      setPendingPersonaVideoSlot(uploadSlot);
      fileInputRef.current?.click();
      
      // Send instruction message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `📤 Please select a video file from your device to upload to Persona slot ${uploadSlot + 1}. The video will be stored locally in your browser.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
      return;
    }
    
    // Check for setting persona video URL (highest priority premium content)
    const personaVideoConfig = detectPersonaVideoUrl(query);
    if (personaVideoConfig) {
      // Check if user is subscriber
      const userTier = localStorage.getItem('userTier');
      if (userTier === 'free') {
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `⚠️ Configuring persona videos is a premium feature. Please upgrade to a paid plan to add persona video content.`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      // Add or update persona video at the specified slot
      const updatedPersonaVideos = [...personaVideoUrls];
      updatedPersonaVideos[personaVideoConfig.slot] = personaVideoConfig.url;
      // Remove any undefined/null entries and keep array compact
      const compactPersonaVideos = updatedPersonaVideos.filter(url => url);
      setPersonaVideoUrls(compactPersonaVideos);
      localStorage.setItem('personaVideoUrls', JSON.stringify(compactPersonaVideos));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Persona video ${personaVideoConfig.slot + 1} configured successfully! This premium avatar content will display first when you open the agent, taking priority over all other videos.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Persona Video");
      }, 800);
      return;
    }
    
    // Check for uploading local training video file
    const uploadTrainingSlot = detectUploadTrainingVideo(query);
    if (uploadTrainingSlot !== null) {
      // Check if user has training package
      if (!hasTrainingPackage) {
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `⚠️ The Premium Training Content package is required to upload training videos. This package includes 6 custom training video slots (1 minute each) - perfect for annual training or summer safety! Would you like to upgrade?`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      // Trigger file input for upload
      setPendingTrainingVideoSlot(uploadTrainingSlot);
      fileInputRef.current?.click();
      
      // Send instruction message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `📤 Please select a training video file (recommended: ~1 minute) from your device to upload to Training slot ${uploadTrainingSlot + 1}. The video will be stored locally in your browser.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 500);
      return;
    }
    
    // Check for setting training video URL
    const trainingVideoConfig = detectTrainingVideoUrl(query);
    if (trainingVideoConfig) {
      // Check if user has training package
      if (!hasTrainingPackage) {
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `⚠️ The Premium Training Content package is required to configure training videos. Get 6 custom training video slots (1 minute each) - perfect for annual training or summer safety! Would you like to upgrade?`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      // Add or update training video at the specified slot
      const updatedTrainingVideos = [...trainingVideoUrls];
      updatedTrainingVideos[trainingVideoConfig.slot] = trainingVideoConfig.url;
      // Remove any undefined/null entries and keep array compact
      const compactTrainingVideos = updatedTrainingVideos.filter(url => url);
      setTrainingVideoUrls(compactTrainingVideos);
      localStorage.setItem('trainingVideoUrls', JSON.stringify(compactTrainingVideos));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Training video ${trainingVideoConfig.slot + 1} configured successfully! This training content will play first when you tap the Training button. Perfect for annual training or summer safety programs!`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Training Video");
      }, 800);
      return;
    }
    
    // Check for adding custom video URL to library
    const customVideoUrl = detectAddVideoUrl(query);
    if (customVideoUrl) {
      // Check if user is subscriber
      const userTier = localStorage.getItem('userTier');
      if (userTier === 'free') {
        setIsTyping(true);
        setTimeout(() => {
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `⚠️ Adding custom videos to your library is a premium feature. Please upgrade to a paid plan to add custom video content.`;
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        }, 800);
        return;
      }
      
      // Add video to custom library
      const updatedCustomVideos = [...customVideoUrls, customVideoUrl];
      setCustomVideoUrls(updatedCustomVideos);
      localStorage.setItem('customVideoUrls', JSON.stringify(updatedCustomVideos));
      
      // Send confirmation message
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `✅ Video successfully added to your library! Your custom video has been added to the rotation and will play along with the default leadership videos.`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Video Library");
      }, 800);
      return;
    }
    
    // Check for leaders asking questions keyword
    const queryLower = query.toLowerCase();
    if (queryLower.includes("leader") && queryLower.includes("question")) {
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `📊 Leaders asking the right questions is critical for organizational success. Check out this Harvard Business resource on C-Level Assessment: https://www.harvardbusiness.org/wp-content/uploads/2025/10/CRE6997_ENT_CLevel_Assessment_Oct2025.pdf`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Leadership");
      }, 800);
      return;
    }
    
    // Check for Frameworks or Agile keywords
    if (queryLower.includes("framework") || queryLower.includes("agile")) {
      setIsTyping(true);
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `Agile is a way of working that helps teams deliver work faster, more flexibly, and with continuous improvement. It started in software development but is now used across government, business, and even military planning because it adapts quickly to change. I recommend this free course for Agile AI training: [AI Agility: Comprehensive Introduction](https://resources.scrumalliance.org/Course/ai-agility-comprehensive-introduction)`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "Agile/Frameworks");
      }, 800);
      return;
    }
    
    // Check for multi-agent collaboration triggers
    const shouldUseMultiAgent = queryLower.includes("compliance") || 
                               queryLower.includes("legal") || 
                               queryLower.includes("budget") || 
                               queryLower.includes("hiring") ||
                               queryLower.includes("multi-agent") ||
                               queryLower.includes("collaborate");
    
    if (shouldUseMultiAgent) {
      // Simulate multi-agent collaboration
      setIsCollaborating(true);
      setIsTyping(true);
      
      // Define collaborating agents based on query
      const agents: CollaboratingAgent[] = [];
      
      if (queryLower.includes("legal") || queryLower.includes("compliance")) {
        agents.push({
          name: "Legal Advisor",
          avatar: "⚖️",
          status: "thinking",
          specialty: "Corporate Law & Compliance"
        });
      }
      
      if (queryLower.includes("budget") || queryLower.includes("financial")) {
        agents.push({
          name: "Financial Analyst",
          avatar: "💰",
          status: "thinking",
          specialty: "Finance & Strategy"
        });
      }
      
      if (queryLower.includes("hiring") || queryLower.includes("hr")) {
        agents.push({
          name: "Workforce Development",
          avatar: "👥",
          status: "thinking",
          specialty: "Human Resources & Talent"
        });
      }
      
      // Default to at least one agent
      if (agents.length === 0) {
        agents.push({
          name: "Data Scientist",
          avatar: "📊",
          status: "thinking",
          specialty: "Analytics & Insights"
        });
      }
      
      setCurrentCollaboratingAgents(agents);
      
      // Simulate agents completing their analysis
      setTimeout(() => {
        const updatedAgents = agents.map(agent => ({
          ...agent,
          status: "complete" as const,
          response: `Based on ${agent.specialty.toLowerCase()} best practices, I recommend a comprehensive approach focusing on measurable outcomes and stakeholder alignment.`
        }));
        setCurrentCollaboratingAgents(updatedAgents);
        
        // After agents complete, send synthesized response
        setTimeout(() => {
          setIsCollaborating(false);
          const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          const response = `🤝 **Multi-Agent Collaboration Complete**\n\nI've consulted with ${agents.map(a => a.name).join(", ")} to provide you with comprehensive guidance.\n\n${agents.map((a, i) => `**${a.name}** (${a.specialty}):\n${updatedAgents[i].response}`).join("\n\n")}\n\n**ORA's Synthesis:**\nBased on input from our specialist agents, I recommend taking a coordinated approach that balances ${queryLower.includes("compliance") ? "regulatory requirements" : "operational needs"} with practical implementation. Would you like me to break down specific next steps?`;
          
          const assistantMessage: Message = {
            role: "assistant",
            content: response,
            id: messageId,
            timestamp: Date.now(),
            feedback: null,
            collaboratingAgents: updatedAgents,
            isMultiAgent: true
          };
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
          setCurrentCollaboratingAgents([]);
          logConversation(query, response, "Multi-Agent");
        }, 2000);
      }, 3000);
      return;
    }
    
    // ========================================================================
    // AI TRENDS RAG - Check for AI-related questions
    // ========================================================================
    if (isAIRelatedQuestion(query)) {
      logQuestion("AI Trends (RAG)", query, false);
      setIsTyping(true);
      
      // Fetch content from AI Trends sources asynchronously
      retrieveAITrendsContent().then((retrievedContent) => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        let response = '';
        if (retrievedContent) {
          // Successfully retrieved content from sources
          response = `🔍 **AI Trends Insight** (Retrieved from configured sources):\n\n${retrievedContent}\n\n---\n\n📊 **Sources:**\n• [Forbes AI 50](https://www.forbes.com/lists/ai50/)\n• [MIT Technology Review - AI](https://www.technologyreview.com/topic/artificial-intelligence/)\n\nWould you like me to explore a specific aspect of these AI trends?`;
        } else {
          // Fallback if retrieval fails
          response = `🤔 I detected this is an AI-related question. Here are my configured AI Trends sources:\n\n📊 **Forbes AI 50** - Leading companies transforming industries with artificial intelligence\n[Forbes AI 50 List](https://www.forbes.com/lists/ai50/)\n\n🔬 **MIT Technology Review – AI Section** - Deep, technical, and ethical AI reporting\n[MIT Tech Review AI](https://www.technologyreview.com/topic/artificial-intelligence/)\n\nWhat specific AI topic would you like to explore?`;
        }
        
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response, "AI Trends RAG");
      });
      return;
    }
    
    // Detect if query matches any keywords
    const detectedTopic = detectKeywordTopic(query);
    
    if (detectedTopic) {
      // Keyword matched - use topic response logic
      logQuestion(detectedTopic, query, false);
      setIsTyping(true);
      
      // Get response for the detected topic
      const response = getTopicResponse(detectedTopic);
      
      // Send response after delay
      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        
        // Log conversation
        logConversation(query, response, detectedTopic);
      }, 1000);
    } else {
      // No keyword match - use generic response
      logQuestion("Custom", query, false);
      setIsTyping(true);

      setTimeout(() => {
        const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const response = `Thank you for asking. I am thinking... hmm...`;
        const assistantMessage: Message = {
          role: "assistant",
          content: response,
          id: messageId,
          timestamp: Date.now(),
          feedback: null
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        logConversation(query, response);
      }, 1500);
    }
  };

  const toggleRecording = () => {
    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
      setIsRecording(false);
    } else {
      recognition.start();
      setIsRecording(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePlusClick = () => {
    // Open observation popup with default template
    setObservationText(DEFAULT_OBSERVATION);
    setAdditionalObservation("");
    setIsObservationSelected(false);
    setShowObservationPopup(true);
  };

  const handleObservationSubmit = () => {
    // Combine default observation with additional text
    let finalObservation = observationText;
    if (additionalObservation.trim()) {
      finalObservation = observationText + "\n\nAdditional context: " + additionalObservation;
    }
    setInputValue(finalObservation);
    setShowObservationPopup(false);
    setAdditionalObservation("");
    setIsObservationSelected(false);
    // Focus input after closing popup
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleObservationCancel = () => {
    setShowObservationPopup(false);
    setObservationText("");
    setAdditionalObservation("");
    setIsObservationSelected(false);
  };

  const handleResetToDefault = () => {
    setObservationText(DEFAULT_OBSERVATION);
  };

  const handleSendEmail = () => {
    // Prepare email content
    const subject = encodeURIComponent('Quick Observation from ORA');
    const body = encodeURIComponent(
      `Quick Observation:\n\n${observationText}\n\n${additionalObservation ? `Additional Context:\n${additionalObservation}\n\n` : ''}---\nSent from ORA AI Leadership Agent`
    );
    
    // Open default email client with BCC to cara@oratf.info
    // Note: BCC support in mailto varies by email client
    // Gmail and Outlook support the bcc parameter
    window.location.href = `mailto:?subject=${subject}&body=${body}&bcc=cara@oratf.info`;
  };

  const handleObservationSubmitToTracker = async () => {
    // Combine default observation with additional text
    let finalObservation = observationText;
    if (additionalObservation.trim()) {
      finalObservation = observationText + "\n\nAdditional context: " + additionalObservation;
    }

    // TODO: Track in Firebase
    try {
      // Firebase tracking would go here
      // Example:
      // await addDoc(collection(db, 'observations'), {
      //   observation: finalObservation,
      //   userEmail: subscriberEmail,
      //   timestamp: serverTimestamp(),
      // });
      
      console.log('Observation submitted:', finalObservation);
    } catch (error) {
      console.error('Error tracking observation:', error);
    }

    // Populate issue tracker (open ReportIssueModal with pre-filled data)
    setSubmittedObservation(finalObservation);
    setShowObservationPopup(false);
    setIsReportIssueOpen(true);
    setAdditionalObservation("");
    setIsObservationSelected(false);
  };

  const handleConfigClick = () => {
    // Check if user is logged in and is a subscriber
    const userStatus = localStorage.getItem('userStatus');
    const userTier = localStorage.getItem('userTier');
    
    // For now, check if user is a subscriber (not free tier)
    if (!userStatus || userStatus !== 'logged_in') {
      alert('⚠️ Please log in to access configuration settings.\n\nConfiguration is available for subscribers only.');
      return;
    }
    
    if (userTier === 'free') {
      alert('⚠️ Configuration settings are available for subscribers only.\n\nUpgrade to a paid plan to customize News and Library connections.');
      return;
    }
    
    // If logged in and subscriber, show configuration instructions
    setShowConfigInstructions(true);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      // Try fullscreen, but catch errors in iframe environments
      try {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen().catch(() => {
            // Fullscreen blocked - silently ignore
          });
        } else if ((videoRef.current as any).webkitRequestFullscreen) {
          // Safari
          (videoRef.current as any).webkitRequestFullscreen();
        } else if ((videoRef.current as any).mozRequestFullScreen) {
          // Firefox
          (videoRef.current as any).mozRequestFullScreen();
        } else if ((videoRef.current as any).msRequestFullscreen) {
          // IE/Edge
          (videoRef.current as any).msRequestFullscreen();
        }
      } catch (err) {
        // Fullscreen not allowed in iframe - silently ignore
        console.log('Fullscreen not available in this environment');
      }
    }
  };

  const handleSubmitDefaultObservation = () => {
    // Close the default observation modal
    setShowDefaultObservation(false);
    setIsEditingObservation(false);
    // Open the Actionable Summary with the submitted observation
    setShowActionableSummary(true);
  };

  const handleEditObservation = () => {
    setIsEditingObservation(true);
  };

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 sm:bg-black/80 sm:p-4">
      {/* Hidden file input for video uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {/* iPhone 16 Frame - Full screen on mobile (393x852), centered modal on desktop */}
      <div className="relative w-full h-full bg-black overflow-hidden sm:max-w-[393px] sm:h-[852px] sm:rounded-[3rem] sm:shadow-2xl sm:border-2 sm:border-gray-800">
        
        {/* RULE: Agent side panel always displays in light mode */}
        {/* Screen Content - Force Light Mode - Override any dark mode inheritance */}
        <div className="relative w-full h-full !bg-white flex flex-col">
          {/* Top Bar */}
          <div className="h-[80px] -mt-[11px] !bg-white !border-b !border-gray-200 flex items-center justify-between pl-[9px] pr-4 pt-[5px]">
            <div className="flex items-center gap-3 pt-[15px] -ml-[4px]">
              <button 
                onClick={onClose}
                className="p-2 rounded-lg !bg-transparent hover:!bg-gray-100 active:!bg-gray-200 transition-colors touch-manipulation"
                title="Close"
              >
                <X className="size-5 !text-gray-600" />
              </button>
              <button 
                onClick={handleConfigClick}
                className="p-2 rounded-lg !bg-transparent hover:!bg-gray-100 active:!bg-gray-200 transition-colors touch-manipulation"
                title="Configuration Settings"
              >
                <Lightbulb className="!fill-yellow-400 !text-black !stroke-2" style={{ width: '18px', height: '18px' }} />
              </button>
              <button 
                onClick={() => setShowAgentConnectionsManager(true)}
                className="p-2 rounded-lg !bg-transparent hover:!bg-gray-100 active:!bg-gray-200 transition-colors relative group touch-manipulation"
                title="Agent Connections"
              >
                <Settings className="size-4 !text-gray-600" style={{ fill: '#C0C0C0' }} />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Multi-Agent
                </span>
              </button>
              <div className="relative group">
                <button 
                  onClick={() => {
                    if (configuredLibrary) {
                      window.open(configuredLibrary.url, '_blank');
                    }
                  }}
                  className="p-2 rounded-lg !bg-transparent hover:!bg-gray-100 active:!bg-gray-200 transition-colors touch-manipulation"
                >
                  <Files className="size-4 !text-gray-600" />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {configuredLibrary ? configuredLibrary.name : "Library"}
                </span>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => {
                    if (configuredCalendar) {
                      window.open(configuredCalendar.url, '_blank');
                    }
                  }}
                  className="p-2 rounded-lg !bg-transparent hover:!bg-gray-100 active:!bg-gray-200 transition-colors touch-manipulation"
                >
                  <svg 
                    className="size-4" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Calendar body */}
                    <rect x="3" y="4" width="18" height="18" rx="2" stroke="black" strokeWidth="2" fill="#ADD8E6"/>
                    {/* Top header filled with bright light blue */}
                    <rect x="3" y="4" width="18" height="5" rx="2" fill="#6CB4FF" stroke="black" strokeWidth="2"/>
                    {/* Date hooks */}
                    <line x1="7" y1="2" x2="7" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="17" y1="2" x2="17" y2="6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {configuredCalendar ? configuredCalendar.name : "Calendar"}
                </span>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => {
                    if (configuredVideo) {
                      window.open(configuredVideo.url, '_blank');
                    }
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Video className="size-4 text-gray-600" />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {configuredVideo ? configuredVideo.name : "Video"}
                </span>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => setIsReportIssueOpen(true)}
                  className="p-1 hover:opacity-80 transition-opacity"
                >
                  <AlertTriangle className="size-4 text-yellow-400" style={{ stroke: 'black', strokeWidth: 2, fill: 'rgb(250, 204, 21)' }} />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Report AI Issue
                </span>
              </div>
              <div className="relative group">
                <button 
                  onClick={() => setIsFeedbackOpen(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Heart className="size-4 text-red-500" style={{ fill: 'rgb(239, 68, 68)' }} />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Feedback
                </span>
              </div>
              <div className="relative group -ml-0.5">
                <button 
                  onClick={() => window.open('https://agent.myora.now/', '_blank')}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Brain className="size-4 text-gray-600" />
                </button>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-[-3px] px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  Applied AI Governance & Organizational Blind Spots
                </span>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="relative z-50 pl-[7px] pr-4 pt-[2px] pb-3 -mt-[3px] bg-white">
            <div className="flex gap-[7px] overflow-x-auto scrollbar-hide">
              <a 
                href="https://agent.myora.now/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 bg-primary text-primary-foreground text-xs font-bold tracking-wider rounded-full hover:bg-primary/90 transition-colors cursor-pointer whitespace-nowrap"
              >
                ORA
              </a>
              <button
                onClick={() => handleCategoryClick("Leadership")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "Leadership" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <Star className="size-3 fill-yellow-400 text-black" />
                Leadership
              </button>

              <button
                onClick={() => handleCategoryClick("Training")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "Training" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <Brain className="size-3 text-gray-600" />
                Training
              </button>

              <button
                onClick={() => handleCategoryClick("Human Health")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "Human Health" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <Activity className="size-3" />
                Health
              </button>

              <button
                onClick={() => handleCategoryClick("AI Trends")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "AI Trends" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <Lightbulb className="size-3" />
                AI Trends
              </button>

              <button
                onClick={() => handleCategoryClick("News")}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === "News" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                <Megaphone className="size-3" />
                News
              </button>
            </div>
          </div>

          {/* Mode Toggle - Chat/Video */}
          <div className="relative px-4 -my-[3px] mt-[-6px] bg-white border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs text-gray-600 font-medium">
              {isVideoVisible ? "Video Mode" : "Chat Mode"}
            </span>
            <button
              onClick={() => {
                setMessages([]);
                setShowMultiAgentMessage(true);
                setIsCollaborating(false);
                setCurrentCollaboratingAgents([]);
              }}
              className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-1"
              title="Clear chat"
            >
              <Trash2 className="size-3.5 text-purple-600" />
              <span className="text-xs text-purple-600 font-medium">Clear Chat</span>
            </button>
            <button
              onClick={() => setIsVideoVisible(!isVideoVisible)}
              className="text-xs hover:underline font-medium text-gray-600"
            >
              {isVideoVisible ? "Show Chat" : "Show Video"}
            </button>
          </div>

          {/* Video Area */}
          {isVideoVisible ? (
            <div className="relative h-[394px] bg-black flex items-center justify-center overflow-hidden -mt-[1px] pt-[6px]">
              <button
                onClick={() => setIsVideoVisible(false)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                title="Close video"
              >
                <X className="size-4 text-gray-600" />
              </button>
              <video
                ref={videoRef}
                src={currentVideo}
                className="w-[210px] h-[394px] object-cover translate-y-2.5 cursor-pointer"
                autoPlay
                playsInline
                controls
                onEnded={handleVideoEnd}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsVideoExpanded(true);
                }}
              />
            </div>
          ) : null}

          {/* Chat History */}
          <div className={`${isVideoVisible ? 'h-[360px]' : 'h-[calc(100vh-320px)]'} bg-white border-t border-gray-200 overflow-y-auto px-4 py-3 pb-[52px]`}>
            <div className="space-y-3">
              {/* Client-Side Configuration Message */}
              {messages.length === 0 && (
                <div className="bg-gray-50 border-2 border-blue-500 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="size-5 text-black fill-yellow-400 mt-0.5 flex-shrink-0 stroke-2" />
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 mb-1">
                        Client-Side Custom Configuration
                      </h4>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Fast, easy setup with no server required! From your mobile device, configure your preferences, integrations, and tools directly in your browser for instant personalization.
                      </p>
                      <p className="text-xs text-gray-700 mt-1.5">
                        Check out the <Lightbulb className="inline size-3 text-black fill-yellow-400 stroke-2" /> icon to configure and the <Settings className="inline size-3 text-gray-600 stroke-2" /> gear to manage multi-agent custom connections with Subject Matter Experts!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Multi-Agent Feature Hint */}
              {messages.length === 0 && showMultiAgentMessage && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-300 rounded-xl p-3">
                  <div className="flex items-start gap-2">
                    <Brain className="size-5 text-gray-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-xs text-gray-900">
                          Multi-Agent Collaboration Available
                        </h4>
                        <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                          NEW!
                        </span>
                      </div>
                      <p className="text-xs text-gray-700 leading-relaxed">
                        Try asking about compliance, legal, budget, or hiring to see specialist agents collaborate on your question! Click the <Settings className="inline size-3 text-purple-600" /> icon above to manage connections. Visit Multi-Agent Features in the header to learn more.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-1.5 ${
                      message.role === "user"
                        ? "bg-gray-200"
                        : "bg-gray-200"
                    }`}
                  >
                    <p className="text-xs leading-relaxed whitespace-pre-wrap !text-black [&_a]:underline [&_a]:!text-blue-800">{renderMessageContent(message.content)}</p>
                    {/* RULE: Thumbs buttons are gray, not white */}
                    {message.role === "assistant" && message.id && (
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleFeedback(message.id!, "thumbs_up")}
                          className={`p-1 rounded ${
                            message.feedback === "thumbs_up" ? "bg-green-100 text-green-600" : "text-gray-500"
                          }`}
                        >
                          <ThumbsUp className="size-3" />
                        </button>
                        <button
                          onClick={() => handleFeedback(message.id!, "thumbs_down")}
                          className={`p-1 rounded ${
                            message.feedback === "thumbs_down" ? "bg-red-100 text-red-600" : "text-gray-500"
                          }`}
                        >
                          <ThumbsDown className="size-3" />
                        </button>
                      </div>
                    )}
                    {/* Multi-Agent Collaboration Indicator */}
                    {message.role === "assistant" && message.collaboratingAgents && message.collaboratingAgents.length > 0 && (
                      <div className="mt-3 max-w-[85%]">
                        <AgentCollaborationIndicator
                          isCollaborating={false}
                          collaboratingAgents={message.collaboratingAgents}
                          primaryAgent="ORA"
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {/* Active Collaboration Indicator */}
              {isCollaborating && currentCollaboratingAgents.length > 0 && (
                <div className="mt-3">
                  <AgentCollaborationIndicator
                    isCollaborating={true}
                    collaboratingAgents={currentCollaboratingAgents}
                    primaryAgent="ORA"
                  />
                </div>
              )}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Free Questions Popup - Floating overlay */}
          {showFreeQuestionsPopup && !localStorage.getItem("userAgreementAccepted") && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
              <div className="bg-purple-500 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-lg">
                9 free questions remaining
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 pt-1 pb-[8px] flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleRecording}
                className={`p-2.5 rounded-full transition-colors shrink-0 ${
                  isRecording ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                title={isRecording ? "Stop recording" : "Start recording"}
              >
                <Mic className={`size-4 ${isRecording ? "" : "text-black"}`} />
              </button>

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a question..."
                className="flex-1 px-3 py-2.5 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
              />

              <button
                onClick={handlePlusClick}
                className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors shrink-0"
                title="Add question"
              >
                <Plus className="size-4 text-black" />
              </button>

              <button
                onClick={handleSendMessage}
                className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
                title="Send message"
              >
                <Send className="size-4" />
              </button>
            </div>
            
            {/* Watermark */}
            <div className="text-center pb-0.5">
              <strong className="text-gray-300 text-xs tracking-wider">AGENTIC AI LEADERSHIP FOR WORKFORCE DEVELOPMENT</strong>
            </div>
          </div>

          {/* AI Team Building Watermark */}
          <div className="text-center py-2">
            <strong className="text-gray-400 text-xs tracking-wider">AGENTIC AI LEADERSHIP FOR WORKFORCE DEVELOPMENT</strong>
          </div>

          {/* Actionable Summary Screen - Must be inside iPhone viewport */}
          <ActionableSummary 
            isOpen={showActionableSummary}
            onClose={() => setShowActionableSummary(false)}
            observation={defaultObservationText}
          />

          {/* Pricing/Subscription Modal */}
          {showPricingModal && (
            <div className="absolute inset-0 bg-white z-[80] overflow-y-auto">
              <PricingPage onClose={() => setShowPricingModal(false)} />
            </div>
          )}
        </div>
      </div>
      
      {/* Report Issue Modal */}
      <ReportIssueModal 
        isOpen={isReportIssueOpen} 
        onClose={() => {
          setIsReportIssueOpen(false);
          setSubmittedObservation("");
        }}
        subscriberEmail={subscriberEmail}
        initialObservation={submittedObservation}
        onSaveReport={(data) => {
          // Open ActionableSummary with the report data
          setShowActionableSummary(true);
        }}
      />
      
      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={isFeedbackOpen} 
        onClose={() => setIsFeedbackOpen(false)} 
      />

      {/* Agent Connections Manager */}
      <AgentConnectionsManager
        isOpen={showAgentConnectionsManager}
        onClose={() => setShowAgentConnectionsManager(false)}
        currentTier={localStorage.getItem('userTier') === 'premium' ? 'Enterprise' : 'Free'}
        onUpgradeClick={() => {
          setShowAgentConnectionsManager(false);
          setShowPricingModal(true);
        }}
      />
      
      {/* Observation Editor Popup */}
      {showObservationPopup && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-[360px] border border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Quick Observation</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetToDefault}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                  title="Reset to Default"
                >
                  <RotateCcw className="size-3.5 text-white" />
                </button>
                <button
                  onClick={handleObservationCancel}
                  className="p-1 rounded hover:bg-white/20 transition-colors"
                >
                  <X className="size-4 text-white" />
                </button>
              </div>
            </div>
            
            {/* Selection Indicator */}
            {isObservationSelected && (
              <div className="bg-green-900/50 border-b border-green-700 px-4 py-2">
                <p className="text-sm font-medium text-green-300">
                  1 observations selected
                </p>
              </div>
            )}
            
            {/* Content */}
            <div className="p-4">
              <p className="text-xs text-gray-300 mb-3">
                Tell us how your team is using the agent and what needs improvement!
              </p>
              
              <label className="text-xs font-medium text-gray-200 mb-1 block">
                Default Observation Template:
              </label>
              <textarea
                value={observationText}
                onChange={(e) => setObservationText(e.target.value)}
                onFocus={() => setIsObservationSelected(true)}
                onClick={() => setIsObservationSelected(true)}
                className="w-full h-24 px-3 py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none mb-3 placeholder:text-gray-500"
                placeholder="Enter your observation..."
              />
              
              <label className="text-xs font-medium text-gray-200 mb-1 block">
                Additional Context (Optional):
              </label>
              <textarea
                value={additionalObservation}
                onChange={(e) => setAdditionalObservation(e.target.value)}
                onFocus={() => setIsObservationSelected(true)}
                onClick={() => setIsObservationSelected(true)}
                className="w-full h-20 px-3 py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none placeholder:text-gray-500"
                placeholder="Add any additional details or context here..."
              />
              
              <div className="mt-4 flex gap-2">
                <button
                  onClick={handleObservationCancel}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Send
                </button>
                <button
                  onClick={handleObservationSubmitToTracker}
                  className="flex-1 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Configuration Instructions Modal */}
      {showConfigInstructions && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[700px] border border-gray-300 overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="bg-yellow-500 text-black px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-base">Configuration Instructions</h3>
              <button
                onClick={() => setShowConfigInstructions(false)}
                className="p-1 rounded hover:bg-black/10 active:bg-black/20 transition-colors touch-manipulation"
              >
                <X className="size-5 text-black" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[600px]">
              <p className="text-sm text-gray-600 mb-6">
                Customize your News, Library, Video, Calendar connections and Subscriber Email for AI reports by typing commands in the chat.
              </p>
              
              {/* Configure Context Library */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Files className="size-4 text-gray-600" /> Configure Context Library:
                </h4>
                <p className="text-xs text-gray-600 mb-2">Type or paste in the chat:</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono">
                    "connect library to SharePoint"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono">
                    "connect library to OneDrive"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono">
                    "connect library to Google Drive"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono">
                    "connect library to Salesforce"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "connect library to https://yourcompany.sharepoint.com..."
                  </div>
                </div>
              </div>
              
              {/* Configure News */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Megaphone className="size-4 text-gray-600" /> Configure News & AI Trends:
                </h4>
                <p className="text-xs text-gray-600 mb-2">Type or paste in the chat:</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "connect news to https://warontherocks.com/?utm_source=copilot.com"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "connect news to https://yournewssite.com"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "connect news to https://techcrunch.com"
                  </div>
                </div>
              </div>

              {/* Add Custom Video Content */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Video className="size-4 text-gray-600" /> Add Custom Video Content:
                </h4>
                <p className="text-xs text-gray-600 mb-2">Add your own videos to the rotation (Premium Feature):</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "add video https://yoursite.com/video.mp4"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "add video https://storage.example.com/training.mp4"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "include video https://cdn.example.com/content.mp4"
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 italic">
                  <span className="text-blue-500 font-bold">ℹ️</span>
                  <span>Up to 6 training video fields can be unlocked with upgrade to configure.</span>
                </div>
              </div>

              {/* Configure AI Avatar */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <User className="size-4 text-gray-600" /> Configure AI Avatar:
                </h4>
                <div className="mb-3">
                  <label className="text-xs text-gray-600 block mb-1">Avatar Id:</label>
                  <input
                    type="text"
                    placeholder="Enter avatar ID..."
                    className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <p className="text-xs text-gray-600 mb-2">Type or paste in the chat:</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "set persona video 1 to https://yourpersona.com/profile"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "set persona video 2 link https://yourpersona.com/persona/abc123"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "set persona video 3 link https://avatar.service.com/v1/persona/xyz789"
                  </div>
                </div>
              </div>

              {/* Featured Training Video Series */}
              <div className="mb-6 relative">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Video className="size-4 text-gray-600" /> Featured Training Video Series:
                  <Lock className="size-3 text-amber-600" />
                </h4>
                <div className="space-y-2 opacity-50 pointer-events-none">
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 1:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-1.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 2:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-2.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 3:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-3.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 4:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-4.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 5:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-5.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 block mb-1">Training Video 6:</label>
                    <input
                      type="url"
                      placeholder="https://example.com/training-video-6.mp4"
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 italic">
                  <span className="text-amber-600 font-bold">🔒</span>
                  <span>Premium Feature: Subscribe to unlock and configure up to 6 featured training videos.</span>
                </div>
              </div>

              {/* Configure Issue Reporting E-mail */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <Mail className="size-4 text-gray-600" /> Configure Issue Reporting E-mail:
                </h4>
                <p className="text-xs text-gray-600 mb-2">Type or paste in the chat:</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "set issue reporting email to support@example.com"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "configure issue reporting email admin@company.com"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "send issue reports to bugs@organization.mil"
                  </div>
                </div>
              </div>

              {/* Reporting Address for Written After Action Reports and Incidents */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-900 flex items-center gap-2">
                  <FileText className="size-4 text-gray-600" /> Reporting Address for Written After Action Reports and Incidents:
                </h4>
                <p className="text-xs text-gray-600 mb-2">Type or paste in the chat:</p>
                <div className="space-y-2">
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "set AAR reporting address to aar.reports@example.com"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "configure incident reporting address incidents@organization.mil"
                  </div>
                  <div className="text-xs bg-gray-100 px-3 py-2 rounded border border-gray-300 font-mono break-words">
                    "send after action reports to reports@company.com"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Default Observation Modal */}
      {showDefaultObservation && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-[360px] max-h-[700px] border border-border overflow-hidden">
            {/* Header */}
            <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-semibold text-sm">Default Observation</h3>
              <button
                onClick={() => {
                  setShowDefaultObservation(false);
                  setIsEditingObservation(false);
                  setDefaultObservationText("I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.");
                }}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="size-4 text-gray-600" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[600px]">
              <p className="text-xs text-muted-foreground mb-4">
                Review the default observation below. You can submit it as-is or edit it before submitting.
              </p>
              
              {isEditingObservation ? (
                <textarea
                  value={defaultObservationText}
                  onChange={(e) => setDefaultObservationText(e.target.value)}
                  className="w-full h-40 px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Enter your observation..."
                />
              ) : (
                <div className="bg-accent/50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-foreground whitespace-pre-wrap">
                    {defaultObservationText}
                  </p>
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-2 mt-4">
                {!isEditingObservation ? (
                  <>
                    <button
                      onClick={handleEditObservation}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleSubmitDefaultObservation}
                      className="flex-1 px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                    >
                      Submit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleSubmitDefaultObservation}
                    className="w-full px-4 py-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Edited Observation
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded Video Overlay */}
      {isVideoExpanded && (
        <div 
          className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center"
          onClick={() => setIsVideoExpanded(false)}
        >
          <button
            onClick={() => setIsVideoExpanded(false)}
            className="absolute top-4 right-4 z-[70] p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Close expanded video"
          >
            <X className="size-6" />
          </button>
          <video
            src={currentVideo}
            className="max-w-[90vw] max-h-[90vh] w-auto h-auto"
            autoPlay
            playsInline
            controls
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}