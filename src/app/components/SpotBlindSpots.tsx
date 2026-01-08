import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface BlindSpot {
  id: string;
  text: string;
}

const BLIND_SPOTS: BlindSpot[] = [
  { id: "vendor-lock-in", text: "Vendor Lock-in" },
  { id: "lost-investment", text: "Low or No ROI" },
  { id: "wasteful-spending", text: "Wasteful, Redundant Spending" },
  { id: "inability-to-scale", text: "Inability to scale, train, & equip workforce" }
];

interface DraggableItemProps {
  blindSpot: BlindSpot;
  isPlaced: boolean;
}

function DraggableItem({ blindSpot, isPlaced }: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "blind-spot",
    item: { id: blindSpot.id, text: blindSpot.text },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }), [blindSpot]);

  if (isPlaced) return null;

  return (
    <div
      ref={drag}
      className={`px-4 py-2 bg-card border rounded-md text-sm cursor-move transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {blindSpot.text}
    </div>
  );
}

interface DropZoneProps {
  targetId: string;
  label: string;
  droppedItem: BlindSpot | null;
  onDrop: (item: BlindSpot, targetId: string) => void;
  isChecked: boolean;
  isCorrect: boolean | null;
}

function DropZone({ targetId, label, droppedItem, onDrop, isChecked, isCorrect }: DropZoneProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "blind-spot",
    drop: (item: BlindSpot) => onDrop(item, targetId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  }), [targetId, onDrop]);

  const getBorderColor = () => {
    if (isChecked && isCorrect !== null) {
      return isCorrect ? "border-green-600" : "border-red-600";
    }
    if (isOver) return "border-primary";
    return "border-border";
  };

  return (
    <div className="border rounded-md p-3 space-y-2">
      <h3 className="font-semibold text-sm">{label}</h3>
      <div
        ref={drop}
        className={`min-h-[50px] border-2 border-dashed rounded-md p-2 transition-colors ${getBorderColor()} ${
          isOver ? "bg-accent" : "bg-background"
        }`}
      >
        {droppedItem ? (
          <div className="text-sm">{droppedItem.text}</div>
        ) : (
          <div className="text-sm text-muted-foreground">Drop blind spot here</div>
        )}
      </div>
    </div>
  );
}

interface SpotBlindSpotsProps {
  onComplete?: () => void;
}

export function SpotBlindSpots({ onComplete }: SpotBlindSpotsProps) {
  const [placements, setPlacements] = useState<Record<string, BlindSpot | null>>({
    "vendor-lock-in": null,
    "lost-investment": null,
    "wasteful-spending": null,
    "inability-to-scale": null
  });
  const [isChecked, setIsChecked] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  const handleDrop = (item: BlindSpot, targetId: string) => {
    setPlacements((prev) => {
      // Remove the item from its previous location
      const newPlacements = { ...prev };
      Object.keys(newPlacements).forEach((key) => {
        if (newPlacements[key]?.id === item.id) {
          newPlacements[key] = null;
        }
      });
      // Place it in the new location
      newPlacements[targetId] = item;
      return newPlacements;
    });
    setIsChecked(false);
  };

  const checkAnswers = () => {
    setIsChecked(true);
    const allCorrect = Object.keys(placements).every(
      (key) => placements[key]?.id === key
    );
    
    if (allCorrect && !hasCompleted) {
      setHasCompleted(true);
      onComplete?.();
    }
  };

  const isItemPlaced = (blindSpotId: string) => {
    return Object.values(placements).some((item) => item?.id === blindSpotId);
  };

  const isCorrectPlacement = (targetId: string) => {
    const placed = placements[targetId];
    if (!placed) return null;
    return placed.id === targetId;
  };

  const allCorrect = Object.keys(placements).every(
    (key) => placements[key]?.id === key
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <Card>
        <CardHeader>
          <CardTitle>Interactive Exercise: Spot the Blind Spots</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground mb-4">
            Test your ability to identify these common pitfalls in the interactive exercise. Drag each blind spot into the matching description box.
          </p>

          {/* Draggable Items */}
          <div className="flex flex-wrap gap-3">
            {BLIND_SPOTS.map((blindSpot) => (
              <DraggableItem
                key={blindSpot.id}
                blindSpot={blindSpot}
                isPlaced={isItemPlaced(blindSpot.id)}
              />
            ))}
          </div>

          {/* Drop Zones */}
          <div className="space-y-3">
            <DropZone
              targetId="vendor-lock-in"
              label="Dependent upon a single vendor or consultants, lack of resilience."
              droppedItem={placements["vendor-lock-in"]}
              onDrop={handleDrop}
              isChecked={isChecked}
              isCorrect={isCorrectPlacement("vendor-lock-in")}
            />
            <DropZone
              targetId="lost-investment"
              label="95% of AI projects fail to produce measurable return on investment, despite large lump spending."
              droppedItem={placements["lost-investment"]}
              onDrop={handleDrop}
              isChecked={isChecked}
              isCorrect={isCorrectPlacement("lost-investment")}
            />
            <DropZone
              targetId="wasteful-spending"
              label="Incomplete RACI Matrix"
              droppedItem={placements["wasteful-spending"]}
              onDrop={handleDrop}
              isChecked={isChecked}
              isCorrect={isCorrectPlacement("wasteful-spending")}
            />
            <DropZone
              targetId="inability-to-scale"
              label="Workforce unreadiness and missing infrastructure"
              droppedItem={placements["inability-to-scale"]}
              onDrop={handleDrop}
              isChecked={isChecked}
              isCorrect={isCorrectPlacement("inability-to-scale")}
            />
          </div>

          <Button
            onClick={checkAnswers}
            className="w-full"
            disabled={Object.values(placements).some((item) => item === null)}
          >
            Check Answers
          </Button>

          {isChecked && allCorrect && (
            <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-600 rounded-md">
              <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                ✓ Perfect! You've correctly matched all the blind spots.
              </p>
            </div>
          )}

          {isChecked && !allCorrect && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950 border border-amber-600 rounded-md">
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Some matches aren't quite right. Try adjusting your answers.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </DndProvider>
  );
}