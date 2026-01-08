import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";

export function SurveyFeedback() {
  const [clarity, setClarity] = useState<string>("");
  const [engagement, setEngagement] = useState<string>("");
  const [application, setApplication] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle form submission
    console.log({ clarity, engagement, application, feedback });
    setSubmitted(true);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setClarity("");
      setEngagement("");
      setApplication("");
      setFeedback("");
      setSubmitted(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="font-semibold text-lg text-center">Survey: Your Feedback Matters!</CardTitle>
        <p className="text-center text-muted-foreground text-sm pt-2">
          We value your feedback to improve our AI governance lessons. This survey is optional and anonymous.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-semibold">Thank you for your feedback!</p>
          </div>
        ) : (
          <>
            {/* Question 1 */}
            <div className="space-y-3">
              <p className="font-semibold">1. How clear were the lesson objectives?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setClarity("very-clear")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    clarity === "very-clear"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Very Clear
                </button>
                <button
                  onClick={() => setClarity("somewhat-clear")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    clarity === "somewhat-clear"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Somewhat Clear
                </button>
                <button
                  onClick={() => setClarity("not-clear")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    clarity === "not-clear"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Not Clear
                </button>
              </div>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <p className="font-semibold">2. How engaging did you find the lesson content?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setEngagement("very-engaging")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    engagement === "very-engaging"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Very Engaging
                </button>
                <button
                  onClick={() => setEngagement("somewhat-engaging")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    engagement === "somewhat-engaging"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Somewhat Engaging
                </button>
                <button
                  onClick={() => setEngagement("not-engaging")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    engagement === "not-engaging"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Not Engaging
                </button>
              </div>
            </div>

            {/* Question 3 */}
            <div className="space-y-3">
              <p className="font-semibold">3. How likely are you to apply what you learned?</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setApplication("very-likely")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    application === "very-likely"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Very Likely
                </button>
                <button
                  onClick={() => setApplication("somewhat-likely")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    application === "somewhat-likely"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Somewhat Likely
                </button>
                <button
                  onClick={() => setApplication("not-likely")}
                  className={`px-6 py-1.5 rounded-full border-2 transition-all ${
                    application === "not-likely"
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:border-primary/50"
                  }`}
                >
                  Not Likely
                </button>
              </div>
            </div>

            {/* Feedback textarea */}
            <div className="space-y-3">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Your feedback here..."
                className="w-full min-h-[120px] p-4 rounded-lg border-2 border-border bg-background resize-none focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Submit button */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold"
              >
                Submit Feedback
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}