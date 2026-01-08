import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, CheckCircle2, XCircle } from "lucide-react";

export function AIResearchActivity() {
  const [userAnswer, setUserAnswer] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctAnswer = "GPT-5 Mini";
  
  const handleCheck = () => {
    const normalizedAnswer = userAnswer.trim().toLowerCase();
    const normalizedCorrect = correctAnswer.toLowerCase();
    const isAnswerCorrect = normalizedAnswer === normalizedCorrect;
    
    setIsCorrect(isAnswerCorrect);
    setIsChecked(true);
  };

  const handleReset = () => {
    setUserAnswer("");
    setIsChecked(false);
    setIsCorrect(false);
  };

  return (
    <Card className="bg-accent/20">
      <CardContent className="pt-6 space-y-4">
        <p className="text-sm leading-relaxed">
          Visit OpenAI - ask questions for a price comparison with an array of language models. Then identify the language model (LM) that is Balanced and cheap with full functionality for many apps. Paste the results of your AI research here.
        </p>

        {/* Button to OpenAI */}
        <Button 
          onClick={() => window.open('https://openai.com/', '_blank')}
          className="w-full gap-2"
          variant="default"
        >
          Visit OpenAI
          <ExternalLink className="size-4" />
        </Button>

        {/* Input field for answer */}
        <div className="space-y-2">
          <label htmlFor="research-answer" className="text-sm font-medium">
            Your Answer:
          </label>
          <input
            id="research-answer"
            type="text"
            value={userAnswer}
            onChange={(e) => {
              setUserAnswer(e.target.value);
              setIsChecked(false);
            }}
            placeholder="Type the language model name here..."
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isChecked && isCorrect}
          />
        </div>

        {/* Check/Reset Button */}
        {!isChecked || !isCorrect ? (
          <Button 
            onClick={handleCheck}
            disabled={!userAnswer.trim()}
            className="w-full"
            variant="secondary"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleReset}
            className="w-full"
            variant="outline"
          >
            Reset
          </Button>
        )}

        {/* Feedback */}
        {isChecked && (
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            isCorrect ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'
          }`}>
            {isCorrect ? (
              <CheckCircle2 className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="size-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <p className={`text-sm font-medium ${
                isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </p>
              {!isCorrect && (
                <p className="text-sm text-muted-foreground">
                  Hint: Look for a model that balances cost and functionality. The correct answer is {correctAnswer}.
                </p>
              )}
              {isCorrect && (
                <p className="text-sm text-muted-foreground">
                  Great job! {correctAnswer} is indeed the balanced and cost-effective language model with full functionality for many applications.
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}