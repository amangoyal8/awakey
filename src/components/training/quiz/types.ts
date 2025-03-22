
// export interface QuizOption {
//   id: string;
//   option_text: string;
//   is_correct: boolean;
// }

// export interface QuizQuestion {
//   id: string;
//   question: string;
//   training_quiz_options: QuizOption[];
// }

// export interface QuizProps {
//   questions: QuizQuestion[];
//   onComplete: (score: number, passed: boolean) => void;
//   passingScore?: number;
// }


export interface QuizOption {
  id: string;
  text: string;
  is_correct: boolean;
}

export interface QuizQuestionType {
  id: string;
  question: string;
  training_quiz_options: QuizOption[];
}

export interface QuizProps {
  questions: QuizQuestionType[];
  onComplete: (score: number, passed: boolean) => void;
  passingScore?: number;
}