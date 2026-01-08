import { useState } from "react";
import { X, Copy, Download, Mic, Eye } from "lucide-react";
import { FinalReportScreen } from "./FinalReportScreen";

interface EditableReportScreenProps {
  isOpen: boolean;
  onClose: () => void;
  onPreview?: () => void;
  observation?: string;
  recommendation?: string;
  topic?: string;
  sentiment?: string;
  location?: string;
  date?: string;
}

export function EditableReportScreen({
  isOpen,
  onClose,
  onPreview,
  observation = "I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.",
  recommendation = "Enhance training for information systems and intelligence tools by setting measurable standards and coordinating with local authorities for annual updates based on modern capabilities and user feedback. Improve transparency and efficiency in decision-making.\n\nEstablish a support network of modern intelligence analysts, data specialists, trainers, and security experts to share best practices and ensure annual training stays relevant and effective.",
  topic = "AI Bias or Risk",
  sentiment = "Hopeless",
  location = "Jacksonville, NC (Camp Lejeune)",
  date = "Tuesday, January 6, 2026"
}: EditableReportScreenProps) {
  // Calculate yesterday's date
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = yesterday.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const [reportDate, setReportDate] = useState("JAN 06 2026");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [fromField, setFromField] = useState("Rank F Name M L Name, Billet");
  const [toField, setToField] = useState("Operations Officer");
  const [viaField, setViaField] = useState("Rank Name, Billet");
  const [subjectField, setSubjectField] = useState("AFTER ACTION REPORT FOR EVENT CONDUCTED FROM JANUARY 6, 2026");
  const [referenceText, setReferenceText] = useState("(a) MCO 3504.1 Marine Corps Lessons Learned Program (MCLLP) and the Marine Corps Center for Lessons Learned (MCCLL)");
  const [backgroundText, setBackgroundText] = useState(
    `This report summarizes observation(s) recorded on ${yesterdayFormatted}. The observations are categorized into areas for improvement or practices to sustain. Specific objectives during this observation include:\n• [objective]\n• [objective]`
  );
  const [discussionText, setDiscussionText] = useState(observation);
  const [recommendationText, setRecommendationText] = useState(recommendation);
  const [isRecording, setIsRecording] = useState(false);
  const [showFinalReport, setShowFinalReport] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const reportContent = `
Report Header:
Date: ${reportDate}
Reference Number: ${referenceNumber}
From: ${fromField}
To: ${toField}
Via: ${viaField}
Subject: ${subjectField}
Reference: ${referenceText}

Report Body:

1. Background.
${backgroundText}

2. Areas for Improvement.

a. Topic: ${topic}

(1) Discussion. ${discussionText}

(2) Recommendation. ${recommendationText}
    `.trim();

    navigator.clipboard.writeText(reportContent);
    alert("Report copied to clipboard!");
  };

  const handleDownload = () => {
    const reportContent = `
Report Header:
Date: ${reportDate}
Reference Number: ${referenceNumber}
From: ${fromField}
To: ${toField}
Via: ${viaField}
Subject: ${subjectField}
Reference: ${referenceText}

Report Body:

1. Background.
${backgroundText}

2. Areas for Improvement.

a. Topic: ${topic}

(1) Discussion. ${discussionText}

(2) Recommendation. ${recommendationText}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `After_Action_Report_${reportDate.replace(/\s/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    // Open the final report preview
    setShowFinalReport(true);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-[75] overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="bg-black text-white px-3 py-2 flex items-center justify-center shrink-0 z-10 relative">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-white text-black px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            <Copy className="size-3" />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-blue-700 transition-colors"
          >
            <Download className="size-3" />
            Save
          </button>
        </div>
        <button
          onClick={onClose}
          className="absolute right-3 text-white hover:text-gray-300 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-3 pt-2 pb-2">
        {/* Report Header Section */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-1.5">
            <span className="text-gray-500">✎</span> Report Header
          </h2>

          <div className="space-y-2.5">
            {/* Date */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="text"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Reference Number */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reference Number (Optional)
              </label>
              <input
                type="text"
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(e.target.value)}
                placeholder="Reference Number"
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* From */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                From
              </label>
              <input
                type="text"
                value={fromField}
                onChange={(e) => setFromField(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* To */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                To
              </label>
              <input
                type="text"
                value={toField}
                onChange={(e) => setToField(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Via */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                Via (Optional)
              </label>
              <input
                type="text"
                value={viaField}
                onChange={(e) => setViaField(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <input
                type="text"
                value={subjectField}
                onChange={(e) => setSubjectField(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Reference */}
            <div>
              <label className="block text-[11px] font-medium text-gray-700 dark:text-gray-300 mb-1">
                Reference (Optional)
              </label>
              <textarea
                value={referenceText}
                onChange={(e) => setReferenceText(e.target.value)}
                rows={3}
                className="w-full px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] font-mono leading-snug focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Report Body Section */}
        <div className="mb-4">
          <h2 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-1.5">
            <span className="text-gray-500">✎</span> Report Body
          </h2>

          <div className="space-y-3">
            {/* 1. Background */}
            <div>
              <h3 className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5">1. Background.</h3>
              <textarea
                value={backgroundText}
                onChange={(e) => setBackgroundText(e.target.value)}
                rows={5}
                className="w-full px-2.5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* 2. Areas for Improvement */}
            <div>
              <h3 className="font-semibold text-xs text-gray-900 dark:text-white mb-2">2. Areas for Improvement.</h3>
              
              <div className="ml-3 space-y-2.5">
                <div>
                  <p className="font-semibold text-xs text-gray-900 dark:text-white mb-1.5">a. Topic: {topic}</p>
                  
                  <div className="ml-3 space-y-2.5">
                    {/* Discussion */}
                    <div>
                      <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1">(1) Discussion.</h4>
                      <textarea
                        value={discussionText}
                        onChange={(e) => setDiscussionText(e.target.value)}
                        rows={5}
                        className="w-full px-2.5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono leading-snug resize-none"
                      />
                    </div>

                    {/* Recommendation */}
                    <div>
                      <h4 className="font-semibold text-xs text-gray-900 dark:text-white mb-1">(2) Recommendation.</h4>
                      <textarea
                        value={recommendationText}
                        onChange={(e) => setRecommendationText(e.target.value)}
                        rows={6}
                        className="w-full px-2.5 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-[10px] focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono leading-snug resize-none"
                      />
                      
                      {/* Preview Report Button - Below Recommendation */}
                      <button
                        onClick={handlePreview}
                        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-lg text-xs"
                      >
                        <Eye className="size-4" />
                        Preview Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Microphone Button */}
      <button
        onClick={toggleRecording}
        className={`fixed right-3 bottom-3 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${
          isRecording 
            ? 'bg-red-600 hover:bg-red-700 animate-pulse' 
            : 'bg-black hover:bg-gray-800'
        }`}
      >
        <Mic className="size-4 text-white" />
      </button>

      {/* Final Report Preview */}
      {showFinalReport && (
        <FinalReportScreen
          isOpen={showFinalReport}
          onClose={() => setShowFinalReport(false)}
          reportDate={reportDate}
          referenceNumber={referenceNumber}
          fromField={fromField}
          toField={toField}
          viaField={viaField}
          subjectField={subjectField}
          referenceText={referenceText}
          backgroundText={backgroundText}
          discussionText={discussionText}
          recommendationText={recommendationText}
        />
      )}
    </div>
  );
}