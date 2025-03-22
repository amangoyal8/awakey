import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QuizQuestion } from "./quiz/QuizQuestion";
import { QuizResults } from "./quiz/QuizResults";
import { QuizProps, QuizOption, QuizQuestionType } from "./quiz/types";
import { translateText } from "@/utils/translate";

export function Quiz({ questions, onComplete, passingScore = 70 }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [translatedQuestion, setTranslatedQuestion] = useState<QuizQuestionType | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex] as QuizQuestionType;
  console.log(currentQuestion, "currentQuestion", translatedQuestion)
  // Translate current question
  useEffect(() => {
    const translateCurrent = async () => {
      if (language === "hi") {
        const translatedQ = await translateText(currentQuestion.question, "hi");

        const translatedOptions: QuizOption[] = await Promise.all(
          currentQuestion.training_quiz_options.map(async (option: QuizOption) => ({
            ...option,
            text: await translateText(option.text, "hi")
          }))
        );

        setTranslatedQuestion({
          ...currentQuestion,
          question: translatedQ,
          training_quiz_options: translatedOptions
        });
      } else {
        setTranslatedQuestion(currentQuestion); // default to English
      }
    };

    translateCurrent();
  }, [currentQuestion, language]);

  const handleAnswer = (optionId: string) => {
    if (hasSubmitted) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setHasSubmitted(true);
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;

    questions.forEach((question) => {
      const selectedOptionId = answers[question.id];
      const selectedOption = question.training_quiz_options.find(
        (option) => option.id === selectedOptionId
      );

      if (selectedOption && selectedOption.is_correct) {
        correctAnswers++;
      }
    });

    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    const passed = finalScore >= passingScore;

    setScore(finalScore);
    setQuizComplete(true);
    setShowResults(true);
    onComplete(finalScore, passed);
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const selectedOptionId = answers[currentQuestion.id];
  const isPassed = score >= passingScore;

  if (!currentQuestion) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No questions available</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          disabled={hasSubmitted}
        >
          {language === "en" ? "Show in Hindi" : "Show in English"}
        </Button>
        <CardTitle>
          {showResults ? "Quiz Results" : "Training Quiz"}
        </CardTitle>
        <CardDescription>
          {showResults
            ? `You scored ${score}% (${isPassed ? "Passed" : "Failed"})`
            : `Question ${currentQuestionIndex + 1} of ${totalQuestions}`}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!showResults ? (
          <>
            <div className="mb-4">
              <Progress value={progressPercentage} />
            </div>

            {translatedQuestion ? (
              <QuizQuestion
                question={translatedQuestion}
                selectedOptionId={selectedOptionId}
                onAnswerSelect={handleAnswer}
                showResults={false}
                disabled={hasSubmitted}
              />
            ) : (
              <p>Loading question...</p>
            )}
          </>
        ) : (
          <QuizResults
            score={score}
            isPassed={isPassed}
            passingScore={passingScore}
            questions={questions}
            answers={answers}
          />
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        {!showResults && (
          <>
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || hasSubmitted}
            >
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!selectedOptionId || hasSubmitted}
            >
              {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Submit"}
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
