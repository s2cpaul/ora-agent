import { X, Copy, Download, Mail, Mic } from "lucide-react";
import { useState } from "react";

interface FinalReportScreenProps {
  isOpen: boolean;
  onClose: () => void;
  reportDate?: string;
  referenceNumber?: string;
  fromField?: string;
  toField?: string;
  viaField?: string;
  subjectField?: string;
  referenceText?: string;
  backgroundText?: string;
  topic?: string;
  discussionText?: string;
  recommendationText?: string;
  sustainTopic?: string;
  sustainDiscussion?: string;
  sustainRecommendation?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export function FinalReportScreen({
  isOpen,
  onClose,
  reportDate = "04JAN2026",
  referenceNumber = "",
  fromField = "Rank F Name MI L Name, Billet",
  toField = "Operations Officer",
  viaField = "Rank Name, Billet",
  subjectField = "AFTER ACTION REPORT FOR EVENT CONDUCTED FROM JANUARY 6, 2026",
  referenceText = "",
  backgroundText = "This report summarizes observation(s) recorded on January 6, 2026. The observations are categorized into areas for improvement or practices to sustain. Specific objectives during this observation include:\n• [objective]\n• [objective]\n• [objective]",
  topic = "AI Bias or Risk",
  discussionText = "I saw several participants struggling to navigate the information system during the event. Most were unable to locate and share critical information in a timely manner and mistakes were made. This can compromise data quality, integrity and availability of information.",
  recommendationText = "Enhance training for information systems and intelligence tools by setting measurable standards and coordinating with local authorities for annual updates based on modern capabilities and user feedback. Improve transparency and efficiency in decision-making.\n\nEstablish a support network of modern intelligence analysts, data specialists, trainers, and security experts to share best practices and ensure annual training stays relevant and effective.",
  sustainTopic = "[Topic Name]",
  sustainDiscussion = "[Discussion text]",
  sustainRecommendation = "[Recommendation text]",
  contactName = "Rank F Name MI L Name",
  contactPhone = "(XXX) XXX-XXXX",
  contactEmail = "email@usmc.mil"
}: FinalReportScreenProps) {
  const [isRecording, setIsRecording] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    const reportContent = document.getElementById('final-report-content')?.innerText || '';
    navigator.clipboard.writeText(reportContent);
    alert("Report copied to clipboard!");
  };

  const handleDownload = () => {
    const reportContent = document.getElementById('final-report-content')?.innerText || '';
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `After_Action_Report_${reportDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleEmail = () => {
    const reportContent = document.getElementById('final-report-content')?.innerText || '';
    const mailtoLink = `mailto:?subject=${encodeURIComponent(subjectField)}&body=${encodeURIComponent(reportContent)}`;
    window.location.href = mailtoLink;
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-900 z-[80] overflow-y-auto">
      {/* Header Bar */}
      <div className="sticky top-0 bg-black text-white px-3 py-2 flex items-center justify-between z-10">
        <h1 className="text-sm font-semibold">Preview</h1>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="bg-white text-black px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            <Copy className="size-3" />
            Copy
          </button>
          <button
            onClick={handleDownload}
            className="bg-white text-black px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            <Download className="size-3" />
            Save
          </button>
          <button
            onClick={handleEmail}
            className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 hover:bg-blue-700 transition-colors"
          >
            <Mail className="size-3" />
            Email
          </button>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors ml-1"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>

      {/* Report Content */}
      <div className="px-3 py-4 bg-white dark:bg-gray-900">
        <div id="final-report-content" className="bg-white dark:bg-gray-900 font-mono text-[10px] leading-snug text-gray-900 dark:text-gray-100">
          {/* Department Header */}
          <div className="text-center mb-4">
            <div className="space-y-0.5">
              <div className="font-bold">DEPARTMENT OF THE NAVY</div>
              <div className="font-bold">HEADQUARTERS UNITED STATES MARINE CORPS</div>
              <div className="font-bold">TRAINING AND EDUCATION COMMAND</div>
            </div>
          </div>

          {/* Reference Number */}
          <div className="mb-3">
            <div className="mb-1.5">IN REPLY REFER TO:</div>
            <div>{referenceNumber || reportDate}</div>
          </div>

          {/* From, To, Via */}
          <div className="mb-3 space-y-1">
            <div className="flex">
              <span className="w-12 flex-shrink-0">FROM:</span>
              <span className="break-words">{fromField}</span>
            </div>
            <div className="flex">
              <span className="w-12 flex-shrink-0">TO:</span>
              <span className="break-words">{toField}</span>
            </div>
            {viaField && (
              <div className="flex">
                <span className="w-12 flex-shrink-0">VIA:</span>
                <span className="break-words">{viaField}</span>
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="mb-3">
            <div className="flex">
              <span className="w-12 flex-shrink-0">SUBJ:</span>
              <span className="flex-1 break-words">{subjectField}</span>
            </div>
          </div>

          {/* Reference (if provided) */}
          {referenceText && (
            <div className="mb-3">
              <div className="flex">
                <span className="w-12 flex-shrink-0">REF:</span>
                <span className="flex-1 break-words">{referenceText}</span>
              </div>
            </div>
          )}

          {/* 1. Background */}
          <div className="mb-3">
            <div className="font-bold mb-1.5">1. Background.</div>
            <div className="whitespace-pre-wrap">{backgroundText}</div>
          </div>

          {/* 2. Areas for Improvement */}
          <div className="mb-3">
            <div className="font-bold mb-1.5">2. Areas for Improvement.</div>
            
            <div className="ml-3 mb-2">
              <div className="font-bold mb-1.5">a. Topic. {topic}</div>
              
              <div className="ml-3 space-y-2">
                <div>
                  <div className="mb-1">(1) Discussion. {discussionText}</div>
                </div>
                
                <div>
                  <div className="mb-1">(2) Recommendation. {recommendationText}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Practices to Sustain */}
          <div className="mb-3">
            <div className="font-bold mb-1.5">3. Practices to Sustain.</div>
            
            <div className="ml-3 mb-2">
              <div className="font-bold mb-1.5">a. Topic. {sustainTopic}</div>
              
              <div className="ml-3 space-y-2">
                <div>
                  <div className="mb-1">(1) Discussion. {sustainDiscussion}</div>
                </div>
                
                <div>
                  <div className="mb-1">(2) Recommendation. {sustainRecommendation}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Conclusion */}
          <div className="mb-3">
            <div className="font-bold mb-1.5">4. Conclusion.</div>
            <div>
              These observations reflect ongoing efforts to enhance operational effectiveness and maintain 
              successful practices. Implementation of the recommended improvements and continuation of 
              highlighted best practices will contribute to mission success.
            </div>
          </div>

          {/* 5. Point of Contact */}
          <div className="mb-4">
            <div className="mb-1">
              5. The point of contact regarding this report is {contactName} at {contactPhone} or {contactEmail}.
            </div>
          </div>

          {/* Signature */}
          <div className="mb-4">
            <div className="mb-8">Signature</div>
          </div>

          {/* Enclosure */}
          <div>
            <div>Enclosure (12)</div>
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
    </div>
  );
}