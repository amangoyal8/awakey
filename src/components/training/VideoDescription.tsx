import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface VideoDescriptionProps {
  title: string;
  description: string;
  userCompleted: boolean;
  hasQuiz: boolean;
  quizUnlocked: boolean;
  quizCompleted: boolean;
  onTakeQuiz: () => void;
}

export function VideoDescription({
  title,
  description,
  userCompleted,
  hasQuiz,
  quizUnlocked,
  quizCompleted,
  onTakeQuiz
}: VideoDescriptionProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {userCompleted ? (
            <span className="text-green-500">You've completed this training!</span>
          ) : hasQuiz ? (
            <span>
              {quizUnlocked
                ? "You've watched enough to take the quiz"
                : "Watch 80% of the video to unlock the quiz"}
            </span>
          ) : (
            <span>Watch the entire video to complete this training</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </CardContent>

      {hasQuiz && quizUnlocked && !quizCompleted && (
        <CardFooter>
          <Button onClick={onTakeQuiz} className="w-full gap-2">
            <GraduationCap className="h-4 w-4" />
            Take Quiz Now
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
