import { useState } from "react";
import { X } from "lucide-react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  const [additionalFeedback, setAdditionalFeedback] = useState("");

  if (!isOpen) return null;

  const feelings = [
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
    { emoji: "😟", label: "Concerned" },
    { emoji: "😕", label: "Confused" },
    
    { emoji: "😟", label: "Worried" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😞", label: "Disappointed" },
    { emoji: "😫", label: "Tired" },
    
    { emoji: "😩", label: "Frustrated" },
    { emoji: "😠", label: "Annoyed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🤯", label: "Overwhelmed" },
  ];

  const handleSave = () => {
    const feedbackData = {
      feeling: selectedFeeling,
      additionalFeedback,
      timestamp: Date.now(),
      date: new Date().toLocaleDateString('en-US'),
    };

    const stored = localStorage.getItem("feedbackLogs");
    const logs = stored ? JSON.parse(stored) : [];
    logs.push(feedbackData);
    localStorage.setItem("feedbackLogs", JSON.stringify(logs));

    // Reset form
    setSelectedFeeling(null);
    setAdditionalFeedback("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] p-4">
      {/* Modal Container - iPhone sized */}
      <div className="relative w-full max-w-[393px] h-[852px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
        <div className="relative w-full h-full bg-white flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Checking-in</h2>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Question */}
            <p className="text-base text-gray-700 mb-6">
              How are you feeling about AI enabled micro-learning?
            </p>

            {/* Emoji Grid */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {feelings.map((feeling, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFeeling(feeling.label)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    selectedFeeling === feeling.label
                      ? "bg-gray-200 border-2 border-black"
                      : "bg-transparent hover:bg-gray-100"
                  }`}
                >
                  <span className="text-3xl">{feeling.emoji}</span>
                  <span className="text-xs text-gray-700 text-center leading-tight">
                    {feeling.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Additional Feedback Text Area */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional feedback (optional)
              </label>
              <textarea
                value={additionalFeedback}
                onChange={(e) => {
                  if (e.target.value.length <= 256) {
                    setAdditionalFeedback(e.target.value);
                  }
                }}
                placeholder="Share more about how you're feeling..."
                maxLength={256}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none min-h-[100px]"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-gray-500">
                  {additionalFeedback.length}/256
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}