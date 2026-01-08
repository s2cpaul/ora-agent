import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Check, X } from "lucide-react";
import type { KnowledgeCheck as KnowledgeCheckType } from "../data/content";

interface KnowledgeCheckProps {
  check: KnowledgeCheckType;
  onComplete: () => void;
}

export function KnowledgeCheck({ check, onComplete }: KnowledgeCheckProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const isMultipleChoice = check.multipleCorrect === true;

  const handleToggleAnswer = (index: number) => {
    if (showFeedback) return;
    
    if (isMultipleChoice) {
      setSelectedAnswers(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      );
    } else {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    let correct = false;
    
    if (isMultipleChoice) {
      const correctAnswers = Array.isArray(check.correctAnswer) 
        ? check.correctAnswer 
        : [check.correctAnswer];
      
      // Check if selected answers match correct answers exactly
      correct = selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every(ans => correctAnswers.includes(ans));
    } else {
      if (selectedAnswer === null) return;
      correct = selectedAnswer === check.correctAnswer;
    }
    
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const resetActivity = () => {
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowFeedback(false);
    setIsCorrect(false);
  };

  const isSelected = (index: number) => {
    return isMultipleChoice 
      ? selectedAnswers.includes(index)
      : selectedAnswer === index;
  };

  const canSubmit = isMultipleChoice 
    ? selectedAnswers.length > 0
    : selectedAnswer !== null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Knowledge Check</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="mb-4">{check.question}</p>
        {isMultipleChoice && (
          <p className="text-sm text-muted-foreground mb-3 italic">Select all that apply</p>
        )}
        
        <div className="space-y-2 mb-4">
          {check.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleToggleAnswer(index)}
              disabled={showFeedback}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                isSelected(index)
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-accent"
              } ${showFeedback ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
            >
              <div className="flex items-start gap-3">
                {isMultipleChoice ? (
                  <div className={`size-5 border-2 flex items-center justify-center flex-shrink-0 mt-0.5 rounded ${
                    isSelected(index) ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {isSelected(index) && (
                      <Check className="size-3 text-white" strokeWidth={3} />
                    )}
                  </div>
                ) : (
                  <div className={`size-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isSelected(index) ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}>
                    {isSelected(index) && (
                      <div className="size-2 rounded-full bg-white"></div>
                    )}
                  </div>
                )}
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>

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
                  {check.explanation && (
                    <p className="text-sm text-green-700 dark:text-green-300">{check.explanation}</p>
                  )}
                  <p className="text-sm text-green-700 dark:text-green-300">Moving to next section...</p>
                </div>
              </>
            ) : (
              <>
                <X className="size-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-red-900 dark:text-red-100">Not quite right</p>
                  <p className="text-sm text-red-700 dark:text-red-300">Please try again!</p>
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit} 
            disabled={!canSubmit || (showFeedback && isCorrect)}
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