import { Badge } from "@/components/ui/badge";

interface ScoreCardProps {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
}

export function ScoreCard({ score, correctAnswers, totalQuestions }: ScoreCardProps) {
  return (
    <div className="bg-muted p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-semibold">Quiz Score</h2>
      <div className="text-lg">
        <p>
          You answered <strong>{correctAnswers}</strong> out of <strong>{totalQuestions}</strong> questions correctly.
        </p>
        <p>
          Final Score: <Badge variant="outline" className="ml-2 text-base">{score}%</Badge>
        </p>
      </div>
    </div>
  );
}
