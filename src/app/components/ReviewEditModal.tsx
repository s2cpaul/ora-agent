import { useState, useEffect } from "react";
import { X, Mic, Calendar, User, Building2, AlertCircle, Hash } from "lucide-react";

interface ReviewEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  observationData: {
    topic: string;
    observation: string;
    type: "event" | "routine";
    pointOfContact: string;
    location: string;
    sentiment: string | null;
  };
  subscriberEmail: string;
  onSaveReport?: (data: any) => void;
}

export function ReviewEditModal({ isOpen, onClose, observationData, subscriberEmail, onSaveReport }: ReviewEditModalProps) {
  const [observation, setObservation] = useState(observationData.observation);
  const [recommendation, setRecommendation] = useState(
    "Enhance training for information systems and intelligence tools by setting measurable standards and coordinating with local authorities for annual updates based on modern capabilities and user feedback. Improve transparency and efficiency in decision-making.\n\nEstablish a support network of modern intelligence analysts, data specialists, trainers, and security experts to share best practices and ensure annual training."
  );
  const [eventName, setEventName] = useState("");
  const [pointOfContact, setPointOfContact] = useState(observationData.pointOfContact);
  const [from, setFrom] = useState("");
  const [impact, setImpact] = useState("");
  const [eid, setEid] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Sync observation with incoming data when modal opens or data changes
  useEffect(() => {
    if (isOpen) {
      setObservation(observationData.observation);
      setPointOfContact(observationData.pointOfContact);
    }
  }, [isOpen, observationData.observation, observationData.pointOfContact]);

  if (!isOpen) return null;

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real implementation, this would use speech recognition for recommendations
  };

  const handleSave = () => {
    const fullReport = {
      ...observationData,
      observation,
      recommendation,
      eventName,
      pointOfContact,
      from,
      impact,
      eid,
      subscriberEmail,
      reviewDate: new Date().toLocaleDateString('en-US'),
      timestamp: Date.now(),
    };
    
    const stored = localStorage.getItem("issueReports");
    const reports = stored ? JSON.parse(stored) : [];
    reports.push(fullReport);
    localStorage.setItem("issueReports", JSON.stringify(reports));
    
    // Log to console for verification (in production, this would send to backend/email service)
    console.log('📧 AI Report submitted to:', subscriberEmail);
    console.log('📋 Report data:', fullReport);
    console.log('💡 Note: To enable actual email delivery, integrate with Supabase Edge Functions or email service (SendGrid, AWS SES, etc.)');
    
    if (onSaveReport) {
      onSaveReport(fullReport);
    }
    
    onClose();
  };

  const getSentimentEmoji = (sentiment: string | null) => {
    const sentimentMap: { [key: string]: string } = {
      "Afraid": "😨",
      "Acceptance": "🤝",
      "Alone": "🤔",
      "Angry": "😈",
      "Anxious": "😰",
      "Appreciated": "🥰",
      "Ashamed": "😳",
      "Calm": "😌",
      "Confused": "😕",
      "Curious": "🧐",
      "Depleted": "😫",
      "Depressed": "😞",
      "Disappointed": "😔",
      "Embarrassed": "😳",
      "Empowered": "💪",
      "Excited": "😃",
      "Frustrated": "😤",
      "Grateful": "🙏",
      "Grief": "😢",
      "Guilty": "😔",
      "Happy": "😊",
      "Hopeful": "🌟",
      "Hopeless": "😩",
      "Inspired": "✨",
      "Unsafe": "⚠️",
    };
    return sentiment ? sentimentMap[sentiment] : "";
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[70] p-4">
      {/* Modal Container - iPhone sized */}
      <div className="relative w-full max-w-[393px] h-[852px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden">
        <div className="relative w-full h-full bg-white flex flex-col overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Review & Edit</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="size-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-6 py-4 space-y-6">
            {/* Observation Section */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Observation:</h3>
              <p className="text-sm text-gray-600 mb-3">{new Date().toLocaleDateString('en-US')}</p>
              <div className="bg-gray-100 rounded-lg p-4 mb-3">
                <textarea
                  value={observation}
                  onChange={(e) => setObservation(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-800 resize-none border-none focus:outline-none min-h-[100px]"
                />
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {observationData.type === "event" ? "Event" : "Routine"}
                </span>
                <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                  {observationData.topic}
                </span>
                {observationData.sentiment && (
                  <span className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs font-medium text-gray-700">
                    {getSentimentEmoji(observationData.sentiment)} {observationData.sentiment}
                  </span>
                )}
              </div>
            </div>

            {/* Recommendation Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-base font-bold text-gray-900">Recommendation:</h3>
                <span className="px-2 py-0.5 bg-yellow-200 text-yellow-900 rounded text-xs font-semibold">
                  Improve
                </span>
              </div>
              
              <div className="relative">
                <textarea
                  value={recommendation}
                  onChange={(e) => setRecommendation(e.target.value)}
                  className="w-full px-4 py-3 pr-16 text-sm text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[280px]"
                />
                
                {/* Floating Mic Button */}
                <button
                  onClick={toggleRecording}
                  className={`absolute bottom-4 right-4 p-4 rounded-full shadow-lg transition-colors ${
                    isRecording ? "bg-red-500 text-white" : "bg-black text-white hover:bg-gray-800"
                  }`}
                  title={isRecording ? "Stop recording" : "Start voice recording"}
                >
                  <Mic className="size-5" />
                </button>
              </div>
            </div>

            {/* Optional Context Data */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-4">Optional Context Data</h3>
              
              <div className="space-y-4">
                {/* EVENT */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                    <Calendar className="size-4" />
                    EVENT: [Acronym, Title or Descriptor]
                  </label>
                  <select
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value=""></option>
                    <option value="CPX">CPX</option>
                    <option value="MEU">MEU</option>
                    <option value="ITX">ITX</option>
                    <option value="RIMPAC">RIMPAC</option>
                    <option value="BALTOPS">BALTOPS</option>
                    <option value="Red Flag">Red Flag</option>
                    <option value="Training Exercise">Training Exercise</option>
                  </select>
                </div>

                {/* POINT OF CONTACT */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                    <User className="size-4" />
                    POINT OF CONTACT: [Phone representative, event organizer, or witness]
                  </label>
                  <input
                    type="text"
                    value={pointOfContact}
                    onChange={(e) => setPointOfContact(e.target.value)}
                    placeholder="Enter point of contact (Optional)"
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-gray-400"
                  />
                </div>

                {/* FROM */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                    <Building2 className="size-4" />
                    FROM: [Unit/Organization, Team]
                  </label>
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value=""></option>
                    <option value="G3">G3</option>
                    <option value="G2">G2</option>
                    <option value="G4">G4</option>
                    <option value="G6">G6</option>
                    <option value="S3">S3</option>
                    <option value="S2">S2</option>
                    <option value="Battalion Staff">Battalion Staff</option>
                    <option value="Company Command">Company Command</option>
                  </select>
                </div>

                {/* IMPACT */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                    <AlertCircle className="size-4" />
                    IMPACT: [Estimate affect on our people first]
                  </label>
                  <select
                    value={impact}
                    onChange={(e) => setImpact(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-400 appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                    }}
                  >
                    <option value="">Select impact level (Optional)</option>
                    <option value="critical">Critical - Immediate action required</option>
                    <option value="high">High - Significant impact on operations</option>
                    <option value="medium">Medium - Moderate impact</option>
                    <option value="low">Low - Minor impact</option>
                  </select>
                </div>

                {/* EID */}
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-2">
                    <Hash className="size-4" />
                    EID: [Electronic Identification Number, School, Organization, Operation]
                  </label>
                  <input
                    type="text"
                    value={eid}
                    onChange={(e) => setEid(e.target.value)}
                    placeholder=""
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Subscriber Email Display */}
            {subscriberEmail && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 text-lg">📧</span>
                  <div>
                    <p className="text-xs font-semibold text-blue-900">Report will be sent to:</p>
                    <p className="text-sm font-medium text-blue-700">{subscriberEmail}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full py-3.5 bg-green-600 text-white rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors"
            >
              {subscriberEmail ? 'Save & Send Report' : 'Save Report'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}