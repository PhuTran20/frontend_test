export interface Question {
  id: string;
  title: string;
  type: 'paragraph' | 'checkbox';
  required: boolean;
  options?: string[];
  hasOther?: boolean;
}

export interface Answer {
  questionId: string;
  value: string | string[];
  otherValue?: string;
}
