import { useState } from "react";
import { Search, Volume2, X, ArrowLeft } from "lucide-react";

interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
  status: "SUSTAIN" | "IMPROVE";
  sentiment: "Excited" | "Confused" | "Concerned";
  category: string;
  selected: boolean;
}

export function RecentActivity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showReportGenerator, setShowReportGenerator] = useState(false);
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  
  // Report Generator fields
  const [reportDate, setReportDate] = useState(new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase());
  const [reportReference, setReportReference] = useState("");
  const [reportFrom, setReportFrom] = useState("Rank F Name MI L Name, Billet");
  const [reportTo, setReportTo] = useState("Operations Officer");
  const [reportVia, setReportVia] = useState("Rank Name, Billet");
  const [reportSubject, setReportSubject] = useState("");
  const [reportReferenceText, setReportReferenceText] = useState("");
  const [reportBody, setReportBody] = useState("");

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      date: "Jan 31, 2026",
      title: "Library Community success with Makers space",
      description: "Continue supporting the Makers space innovation initiative. Expand programming to include local high schools, private partnerships, more workshops and community-led sessions. Document success stories to share with other libraries and secure additional funding.",
      status: "SUSTAIN",
      sentiment: "Excited",
      category: "Cross Functional Collaboration",
      selected: false,
    },
    {
      id: "2",
      date: "Jan 30, 2026",
      title: "Girlfriend is angry again - feeling stuck",
      description: 'Relationships are called "RE-lationships" for a reason. Humans tend to repeat many of the same patterns. Forgiveness doesn\'t ignore truth and it doesn\'t mean enabling harmful behavior. Most people are not mind readers, so we must learn to communicate and identify wrongdoings. Keeping a mistake or wrongdoing silent is wrong too. Forgiveness isn\'t a one-time act; it\'s a practice that requires humor and humility. And it takes a lifetime. Advice too. Advice in the book of Matthew includes 18:15-17: Confront wrongdoing with love and clarity. Advice from Luke 17:3-4: If someone repents, forgive — but accountability matters.',
      status: "IMPROVE",
      sentiment: "Confused",
      category: "Relationships & Boundaries",
      selected: false,
    },
    {
      id: "3",
      date: "Jan 30, 2026",
      title: "Performance review process needs standardization and improved feedback quality",
      description: "Implement a standardized performance management framework with clear evaluation criteria, regular feedback cycles, and training for all supervisors. Include employee self-assessments, peer feedback options, and development planning. Establish measurable goals. Establish quarterly check-ins in addition to annual reviews to ensure continuous improvement and alignment with organizational objectives.",
      status: "IMPROVE",
      sentiment: "Concerned",
      category: "Performance Management",
      selected: false,
    },
    {
      id: "4",
      date: "Jan 29, 2026",
      title: "Attendance at library Makers space events has grown by 300%",
      description: "Continue supporting the Makers space initiative. Expand programming to include private partnerships, more workshops and community-led sessions. Document success stories to share with other libraries and secure additional funding.",
      status: "SUSTAIN",
      sentiment: "Excited",
      category: "Community Outreach",
      selected: false,
    },
  ]);

  const toggleSelection = (id: string) => {
    setActivities(prev => 
      prev.map(activity => 
        activity.id === id 
          ? { ...activity, selected: !activity.selected }
          : activity
      )
    );
  };

  const toggleSelectAll = () => {
    const allSelected = activities.every(a => a.selected);
    setActivities(prev => 
      prev.map(activity => ({ ...activity, selected: !allSelected }))
    );
  };

  const clearSelection = () => {
    setActivities(prev => 
      prev.map(activity => ({ ...activity, selected: false }))
    );
  };

  const selectedCount = activities.filter(a => a.selected).length;
  const allSelected = activities.length > 0 && activities.every(a => a.selected);

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case "Excited": return "😃";
      case "Confused": return "😕";
      case "Concerned": return "😟";
      default: return "😐";
    }
  };

  const handleGenerateReport = () => {
    // Generate report body from selected activities
    const selectedActivities = activities.filter(a => a.selected);
    const sustainItems = selectedActivities.filter(a => a.status === "SUSTAIN");
    const improveItems = selectedActivities.filter(a => a.status === "IMPROVE");
    
    let body = `1. Background.\n\nThis report summarizes ${selectedCount} observation${selectedCount !== 1 ? 's' : ''} recorded over the last 120 days. The observations are categorized into areas for improvement and practices to sustain.\n\n`;
    
    if (improveItems.length > 0) {
      body += `2. Areas for Improvement.\n\n`;
      improveItems.forEach((item, index) => {
        const letter = String.fromCharCode(97 + index); // a, b, c, etc.
        body += `   ${letter}. ${item.category}\n\n`;
        body += `      (1) Discussion. ${item.title}. ${item.description}\n\n`;
        body += `      (2) Recommendation. [Add specific recommendations here]\n\n`;
      });
    }
    
    if (sustainItems.length > 0) {
      body += `${improveItems.length > 0 ? '3' : '2'}. Practices to Sustain.\n\n`;
      sustainItems.forEach((item, index) => {
        const letter = String.fromCharCode(97 + index); // a, b, c, etc.
        body += `   ${letter}. ${item.category}\n\n`;
        body += `      (1) Discussion. ${item.title}. ${item.description}\n\n`;
      });
    }
    
    setReportBody(body);
    setShowReportGenerator(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 -mx-4 sm:-mx-6 -my-8">
      {/* Header */}
      <div className="bg-[#1e3a8a] text-white px-6 py-8">
        <h1 className="text-2xl font-bold mb-2">Recent Activity</h1>
        <p className="text-sm text-blue-100">
          Select observations to generate comprehensive "After Action Reports" or memos. Newest items are displayed first.
        </p>
        
        {/* Search Bar */}
        <div className="mt-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search observations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Select All Link */}
      <div className="px-6 pt-4">
        <button 
          onClick={toggleSelectAll}
          className="text-blue-600 font-medium text-sm hover:underline"
        >
          {allSelected ? "Deselect All" : "Select All"}
        </button>
      </div>

      {/* Activity List */}
      <div className="px-6 py-4 space-y-4 pb-32">
        {filteredActivities.map((activity) => (
          <div 
            key={activity.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 relative"
          >
            {/* Checkbox */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => toggleSelection(activity.id)}
                className="size-5 rounded border-2 border-gray-300 flex items-center justify-center bg-white hover:border-blue-600 transition-colors"
              >
                {activity.selected && (
                  <svg className="size-4 text-white" viewBox="0 0 24 24" fill="#2563eb">
                    <rect width="24" height="24" rx="2" />
                    <path 
                      d="M9 12l2 2 4-4" 
                      stroke="white" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 pr-8 mb-2">
              {activity.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              {activity.description}
            </p>

            {/* Metadata Row */}
            <div className="flex items-center gap-3 text-xs flex-wrap">
              {/* Date */}
              <div className="flex items-center gap-1.5 text-gray-500">
                <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" fill="none"/>
                  <line x1="16" y1="2" x2="16" y2="6" strokeWidth="2"/>
                  <line x1="8" y1="2" x2="8" y2="6" strokeWidth="2"/>
                  <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2"/>
                </svg>
                <span>{activity.date}</span>
              </div>

              {/* Status Badge */}
              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                activity.status === "SUSTAIN" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-orange-100 text-orange-800"
              }`}>
                {activity.status}
              </span>

              {/* Sentiment */}
              <div className="flex items-center gap-1.5">
                <span>{getSentimentEmoji(activity.sentiment)}</span>
                <span className="text-gray-700">{activity.sentiment}</span>
              </div>

              {/* Category */}
              <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-700 font-medium">
                {activity.category}
              </span>

              {/* Audio Icon */}
              <button 
                className="ml-auto p-1.5 hover:bg-gray-100 rounded transition-colors"
                aria-label="Play audio"
              >
                <Volume2 className="size-4 text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Bar */}
      {selectedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                {selectedCount} observation{selectedCount !== 1 ? 's' : ''} selected
              </span>
              <button 
                onClick={clearSelection}
                className="text-sm text-blue-600 hover:underline"
              >
                Clear selection
              </button>
            </div>
            <button 
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              onClick={handleGenerateReport}
            >
              Generate Report
            </button>
          </div>
        </div>
      )}

      {/* Report Generator Screen */}
      {showReportGenerator && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="bg-black text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowReportGenerator(false)}
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
                onClick={() => setShowReportGenerator(false)}
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
                onClick={() => setShowReportGenerator(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close Report Generator"
              >
                <svg className="size-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Report Header Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-700">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <label className="font-semibold">Report Header (Editable)</label>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="text"
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Reference Number */}
              <div className="space-y-2">
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">From</label>
                <input
                  type="text"
                  value={reportFrom}
                  onChange={(e) => setReportFrom(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* To */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <input
                  type="text"
                  value={reportTo}
                  onChange={(e) => setReportTo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Via */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Reference (Optional)</label>
                <textarea
                  value={reportReferenceText}
                  onChange={(e) => setReportReferenceText(e.target.value)}
                  placeholder="(a) MCO 3504.1 Marine Corps Lessons Learned Program (MCLLP) and the Marine Corps Center for Lessons Learned (MCCLL)"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[60px]"
                  rows={3}
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
                  placeholder="1. Background.&#10;&#10;This report summarizes observations recorded over time..."
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
      {showReportPreview && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col" onClick={(e) => e.stopPropagation()}>
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
                onClick={() => setShowEmailPrompt(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </button>
              <button 
                onClick={() => setShowReportPreview(false)}
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
                onClick={() => setShowReportPreview(false)}
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
            <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4" onClick={() => setShowEmailPrompt(false)}>
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