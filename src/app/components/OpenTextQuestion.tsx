import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, X, Lightbulb } from "lucide-react";
import type { OpenTextQuestion as OpenTextQuestionType } from "../data/content";

interface OpenTextQuestionProps {
  question: OpenTextQuestionType;
  onComplete: () => void;
}

export function OpenTextQuestion({ question, onComplete }: OpenTextQuestionProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    // Trim and normalize the answer for comparison
    const normalizedUserAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrectAnswer = question.correctAnswer.trim().toLowerCase();
    
    const correct = normalizedUserAnswer === normalizedCorrectAnswer;
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const resetActivity = () => {
    setUserAnswer("");
    setShowFeedback(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  return (
    <Card className="border-2 border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-lg">Knowledge Check</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-medium">{question.question}</p>

        <div className="space-y-2">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={showFeedback && isCorrect}
            placeholder={question.placeholder || "Paste the URL here..."}
            className="w-full p-3 rounded-lg border-2 border-border focus:border-primary focus:outline-none transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
          />
        </div>

        {question.hint && (
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHint(!showHint)}
              className="text-sm"
              disabled={showFeedback && isCorrect}
            >
              <Lightbulb className="size-4 mr-2" />
              {showHint ? "Hide hint" : "Show hint"}
            </Button>
            {showHint && (
              <div className="mt-2 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-sm text-muted-foreground">{question.hint}</p>
              </div>
            )}
          </div>
        )}

        {showFeedback && (
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            isCorrect 
              ? "bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800" 
              : "bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
          }`}>
            {isCorrect ? (
              <>
                <Check className="size-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="font-medium text-green-900 dark:text-green-100">Correct!</p>
                  {question.explanation && (
                    <p className="text-sm text-green-700 dark:text-green-300">{question.explanation}</p>
                  )}
                  <p className="text-sm text-green-700 dark:text-green-300">Moving to next section...</p>
                </div>
              </>
            ) : (
              <>
                <X className="size-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">Not quite right</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Please check the URL and try again!</p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            disabled={!userAnswer.trim() || (showFeedback && isCorrect)}
            className="flex-1"
          >
            Submit Answer
          </Button>
          {showFeedback && !isCorrect && (
            <Button variant="outline" onClick={resetActivity}>
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
