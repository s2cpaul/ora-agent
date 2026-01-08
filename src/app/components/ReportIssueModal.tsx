import { useState, useRef } from "react";
import { X, Mic, Calendar, Clock } from "lucide-react";
import { ReviewEditModal } from "./ReviewEditModal";

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberEmail: string;
  onSaveReport?: (data: any) => void;
}

const sentimentOptions = [
  { emoji: "😨", label: "Afraid" },
  { emoji: "🤝", label: "Acceptance" },
  { emoji: "🤔", label: "Alone" },
  { emoji: "😈", label: "Angry" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "🥰", label: "Appreciated" },
  { emoji: "😳", label: "Ashamed" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😕", label: "Confused" },
  { emoji: "🧐", label: "Curious" },
  { emoji: "😫", label: "Depleted" },
  { emoji: "😞", label: "Depressed" },
  { emoji: "😔", label: "Disappointed" },
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
  { emoji: "⚠️", label: "Unsafe" },
];

export function ReportIssueModal({ isOpen, onClose, subscriberEmail, onSaveReport }: ReportIssueModalProps) {
  const [topic, setTopic] = useState("AI Bias or Risk");
  const [observation, setObservation] = useState("I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.");
  const [type, setType] = useState<"event" | "routine">("event");
  const [pointOfContact, setPointOfContact] = useState("");
  const [location, setLocation] = useState("Jacksonville, NC (Camp Lejeune)");
  const [selectedSentiment, setSelectedSentiment] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [topicReady, setTopicReady] = useState(true);
  const [isReviewEditOpen, setIsReviewEditOpen] = useState(false);
  const observationRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen && !isReviewEditOpen) return null;

  const handleSubmit = () => {
    // Open Review & Edit modal instead of saving directly
    setIsReviewEditOpen(true);
  };

  const handleReviewEditClose = () => {
    setIsReviewEditOpen(false);
    // Reset form
    setObservation("I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.");
    setPointOfContact("");
    setSelectedSentiment(null);
    // Close the report issue modal
    onClose();
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would use speech recognition
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4">
      {/* Modal Container - iPhone sized */}
      <div className="relative w-full max-w-[393px] h-[852px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
        <div className="relative w-full h-full bg-white flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-start justify-between">
            <div className="flex-1 pr-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Share Observation or<br />
                Report AI Issue
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>

          {/* Form Content */}
          <div className="flex-1 px-6 py-2 space-y-4">
            {/* Topic */}
            <div>
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-2">
                Topic <span className="text-red-500">*</span>
                {topicReady && (
                  <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    Ready
                  </span>
                )}
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>AI Bias or Risk</option>
                <option>System Performance</option>
                <option>Data Quality</option>
                <option>User Experience</option>
                <option>Security Concern</option>
                <option>Other</option>
              </select>
            </div>

            {/* Observation */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                Observation <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  ref={observationRef}
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  placeholder="I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information."
                  className="w-full px-4 py-3 pr-12 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
                />
                <button
                  onClick={toggleRecording}
                  className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${
                    isRecording ? "bg-red-500 text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  title={isRecording ? "Stop recording" : "Start voice recording"}
                >
                  <Mic className="size-4" />
                </button>
              </div>
            </div>

            {/* Type */}
            <div className="-mt-2">
              <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                Type <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setType("event")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    type === "event"
                      ? "bg-black text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Calendar className="size-4" />
                  Event
                </button>
                <button
                  onClick={() => setType("routine")}
                  className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    type === "routine"
                      ? "bg-black text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Clock className="size-4" />
                  Routine
                </button>
              </div>
            </div>

            {/* Point of Contact */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 block">
                Point of Contact (Optional)
              </label>
              <input
                type="text"
                value={pointOfContact}
                onChange={(e) => setPointOfContact(e.target.value)}
                placeholder="Phone representative, event organizer, or witness"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                Location <span className="text-red-500">*</span>
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option>Jacksonville, NC (Camp Lejeune)</option>
                <option>San Diego, CA (Camp Pendleton)</option>
                <option>Quantico, VA (Marine Corps Base)</option>
                <option>Okinawa, Japan (Camp Hansen)</option>
                <option>Twenty-Nine Palms, CA (MCAGCC)</option>
                <option>Remote/Virtual</option>
                <option>Other</option>
              </select>
            </div>

            {/* Sentiment */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-1">
                Tap a sentiment about your observation <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-5 gap-2">
                {sentimentOptions.map((sentiment) => (
                  <button
                    key={sentiment.label}
                    onClick={() => setSelectedSentiment(sentiment.label)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg border-2 transition-all ${
                      selectedSentiment === sentiment.label
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    title={sentiment.label}
                  >
                    <span className="text-2xl mb-0.5">{sentiment.emoji}</span>
                    <span className="text-[9px] text-gray-700 text-center leading-tight">
                      {sentiment.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!observation || !selectedSentiment}
              className="w-full py-3.5 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Observation
            </button>
          </div>
        </div>
      </div>

      {/* Review & Edit Modal */}
      <ReviewEditModal
        isOpen={isReviewEditOpen}
        onClose={handleReviewEditClose}
        observationData={{
          topic,
          observation,
          type,
          pointOfContact,
          location,
          sentiment: selectedSentiment
        }}
        subscriberEmail={subscriberEmail}
        onSaveReport={onSaveReport}
      />
    </div>
  );
}