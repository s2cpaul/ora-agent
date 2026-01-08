import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";

interface EmojiOption {
  emoji: string;
  label: string;
}

interface CheckInLog {
  question: string;
  feeling: string;
  learningWish: string;
  timestamp: number;
}

export function CheckingIn() {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [learningWish, setLearningWish] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const maxChars = 256;

  const emojiOptions: EmojiOption[] = [
    // Row 1
    { emoji: "😊", label: "Very Happy" },
    { emoji: "🙂", label: "Happy" },
    { emoji: "😁", label: "Excited" },
    { emoji: "🥳", label: "Curious" },
    { emoji: "😌", label: "Peaceful" },
    { emoji: "😎", label: "Confident" },
    { emoji: "😃", label: "Amazed" },
    { emoji: "😇", label: "Blessed" },
    // Row 2
    { emoji: "🤗", label: "Grateful" },
    { emoji: "😏", label: "Satisfied" },
    { emoji: "😐", label: "Neutral" },
    { emoji: "🤔", label: "Thinking" },
    { emoji: "😶", label: "Speechless" },
    { emoji: "😬", label: "Awkward" },
    { emoji: "☹️", label: "Concerned" },
    { emoji: "😕", label: "Confused" },
    // Row 3
    { emoji: "😟", label: "Worried" },
    { emoji: "😔", label: "Sad" },
    { emoji: "😞", label: "Disappointed" },
    { emoji: "😫", label: "Tired" },
    { emoji: "😩", label: "Frustrated" },
    { emoji: "😠", label: "Annoyed" },
    { emoji: "😡", label: "Angry" },
    { emoji: "🤯", label: "Overwhelmed" }
  ];

  const handleSave = () => {
    // Save to tracking system
    const checkInLog: CheckInLog = {
      question: "How are you feeling about AI enabled micro-learning?",
      feeling: selectedEmoji,
      learningWish: learningWish,
      timestamp: Date.now()
    };

    // Get existing logs
    const stored = localStorage.getItem("checkInLogs");
    const logs: CheckInLog[] = stored ? JSON.parse(stored) : [];
    
    // Add new log
    logs.unshift(checkInLog); // Add to beginning
    
    // Save back to localStorage
    localStorage.setItem("checkInLogs", JSON.stringify(logs));

    console.log("Saved:", { selectedEmoji, learningWish });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleClose = () => {
    console.log("Closing check-in");
  };

  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-xl">Checking-in</h2>
          <div className="flex items-center gap-2">
            <Button 
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSaved ? "Saved!" : "Save"}
            </Button>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Question */}
        <p className="text-center mb-4">
          How are you feeling about AI enabled micro-learning?
        </p>

        {/* Emoji Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-6">
          {emojiOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedEmoji(option.label)}
              className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                selectedEmoji === option.label
                  ? "bg-accent ring-2 ring-primary"
                  : "hover:bg-accent/50"
              }`}
            >
              <div className="text-3xl">{option.emoji}</div>
              <span className="text-xs text-center text-muted-foreground leading-tight">
                {option.label}
              </span>
            </button>
          ))}
        </div>

        {/* Text Input */}
        <div className="space-y-2">
          <textarea
            value={learningWish}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setLearningWish(e.target.value);
              }
            }}
            placeholder="Care to tell us what you wish to learn?"
            className="w-full min-h-[100px] p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            maxLength={maxChars}
          />
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{learningWish.length}/{maxChars}</span>
            <span>Tap Save at the top when ready</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}