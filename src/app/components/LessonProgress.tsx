import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Circle } from "lucide-react";
import { useState } from "react";

interface LessonProgressProps {
  surveyResponses?: {
    clarity: string;
    engagement: string;
    application: string;
  };
}

export function LessonProgress({ surveyResponses }: LessonProgressProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");

  const progressItems = [
    "Welcome Objectives",
    "Introduction",
    "AI Costs & Tokens",
    "What is AI Literacy?",
    "AI Research",
    "Trusted Frameworks",
    "Applied Agentic AI",
    "Build Trust",
    "AI Governance KPIs",
    "Summary",
    "Feedback"
  ];

  const handleCompleteLesson = () => {
    console.log("Lesson completed", { selectedEmoji });
    // Handle lesson completion
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-center">Lesson Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {/* Survey Responses */}
        <div>
          <p className="font-semibold text-muted-foreground mb-2">Your survey responses:</p>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>Clarity: {surveyResponses?.clarity || "Not answered"}</p>
            <p>Engagement: {surveyResponses?.engagement || "Not answered"}</p>
            <p>Apply: {surveyResponses?.application || "Not answered"}</p>
          </div>
        </div>

        {/* Your Progress Section */}
        <div>
          <p className="font-semibold mb-2">Your Progress</p>
          <p className="text-sm text-muted-foreground mb-3">Click any section to complete that lesson</p>
          
          <div className="space-y-2">
            {progressItems.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <Circle className="size-5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Survey */}
        <div>
          <p className="text-muted-foreground">Completed the Survey</p>
        </div>

        {/* Emoji Feedback */}
        <div className="space-y-4 pt-2">
          <p className="text-center text-muted-foreground">
            Let us know how you feel about this Micro learning experience.
          </p>
          
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setSelectedEmoji("great")}
              className={`flex flex-col items-center gap-2 transition-transform ${
                selectedEmoji === "great" ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div className="text-4xl">😊</div>
              <span className="text-sm text-muted-foreground">Great</span>
            </button>
            
            <button
              onClick={() => setSelectedEmoji("okay")}
              className={`flex flex-col items-center gap-2 transition-transform ${
                selectedEmoji === "okay" ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div className="text-4xl">😐</div>
              <span className="text-sm text-muted-foreground">Okay</span>
            </button>
            
            <button
              onClick={() => setSelectedEmoji("hard")}
              className={`flex flex-col items-center gap-2 transition-transform ${
                selectedEmoji === "hard" ? "scale-110" : "hover:scale-105"
              }`}
            >
              <div className="text-4xl">😔</div>
              <span className="text-sm text-muted-foreground">Hard</span>
            </button>
          </div>
        </div>

        {/* Question about entertaining/motivating part */}
        <div>
          <p className="text-center text-muted-foreground">
            Which part did you find most entertaining or motivating?
          </p>
        </div>

        {/* Complete Lesson Button */}
        <div className="pt-4">
          <button
            onClick={handleCompleteLesson}
            className="w-full py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold"
          >
            Complete this lesson
          </button>
        </div>
      </CardContent>
    </Card>
  );
}