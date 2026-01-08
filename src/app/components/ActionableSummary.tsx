import { Calendar, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { EditableReportScreen } from "./EditableReportScreen";

interface ActionableSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  observation?: string;
  recommendation?: string;
  topic?: string;
  eventType?: string;
  sentiment?: string;
  location?: string;
  date?: string;
}

export function ActionableSummary({
  isOpen,
  onClose,
  observation = "I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.",
  recommendation = "Enhance training for information systems and intelligence tools by setting measurable standards and coordinating with local authorities for annual updates based on modern capabilities and user feedback. Improve transparency and efficiency in decision-making.\n\nEstablish a support network of modern intelligence analysts, data specialists, trainers, and security experts to share best practices and ensure annual training stays relevant and effective.",
  topic = "AI Bias or Risk",
  eventType = "Event",
  sentiment = "Hopeless",
  location = "Jacksonville, NC (Camp Lejeune)",
  date = "Tuesday, January 6, 2026"
}: ActionableSummaryProps) {
  const [showEditableReport, setShowEditableReport] = useState(false);
  
  if (!isOpen) return null;

  const handleExport = () => {
    // Open the editable report screen
    setShowEditableReport(true);
  };

  return (
    <>
      <div className="absolute inset-0 bg-white dark:bg-gray-900 z-[70] overflow-y-auto">
        {/* Content Container */}
        <div className="w-full h-full px-3 py-4">
          {/* Header */}
          <div className="mb-3">
            <h1 className="text-base font-bold text-center mb-2 text-gray-900 dark:text-white">Actionable Summary</h1>
            
            {/* Date */}
            <div className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400 mb-3">
              <Calendar className="size-3.5" />
              <span>{date}</span>
            </div>
          </div>

          {/* Observation Section */}
          <div className="mb-3">
            <h2 className="text-sm font-bold mb-1.5 text-gray-900 dark:text-white">Observation:</h2>
            <p className="text-xs text-gray-700 dark:text-gray-300 leading-snug">
              {observation}
            </p>
          </div>

          {/* Recommendation Section */}
          <div className="mb-4">
            <h2 className="text-sm font-bold mb-1.5 text-gray-900 dark:text-white">Recommendation:</h2>
            <div className="text-xs text-gray-700 dark:text-gray-300 leading-snug space-y-2">
              {recommendation.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="space-y-1.5 mb-4">
            <div className="flex items-start gap-1.5">
              <span className="text-xs text-gray-900 dark:text-white">•</span>
              <div className="flex gap-1.5 flex-wrap">
                <span className="font-bold text-xs text-gray-900 dark:text-white">Topic:</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">{topic}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-1.5">
              <span className="text-xs text-gray-900 dark:text-white">•</span>
              <div className="flex gap-1.5 flex-wrap">
                <span className="font-bold text-xs text-gray-900 dark:text-white">Event Type:</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">{eventType}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-1.5">
              <span className="text-xs text-gray-900 dark:text-white">•</span>
              <div className="flex gap-1.5 flex-wrap">
                <span className="font-bold text-xs text-gray-900 dark:text-white">Sentiment:</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">{sentiment}</span>
              </div>
            </div>
            
            <div className="flex items-start gap-1.5">
              <span className="text-xs text-gray-900 dark:text-white">•</span>
              <div className="flex gap-1.5 flex-wrap">
                <span className="font-bold text-xs text-gray-900 dark:text-white">Location:</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">{location}</span>
              </div>
            </div>

            <div className="mt-2 space-y-1 ml-3">
              <div className="flex items-start gap-1.5">
                <span className="text-xs text-gray-900 dark:text-white">•</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">Email (professional tone)</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-xs text-gray-900 dark:text-white">•</span>
                <span className="text-xs text-gray-700 dark:text-gray-300">Formal memo (official documentation)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 mt-4">
            <button
              onClick={handleExport}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shadow-lg text-xs"
            >
              Finalize and Export →
            </button>

            <button
              onClick={onClose}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl font-semibold transition-colors text-xs"
            >
              Back to Summary
            </button>
          </div>
        </div>
      </div>

      {/* Editable Report Screen */}
      <EditableReportScreen
        isOpen={showEditableReport}
        onClose={() => setShowEditableReport(false)}
        observation={observation}
        recommendation={recommendation}
        topic={topic}
        sentiment={sentiment}
        location={location}
        date={date}
      />
    </>
  );
}