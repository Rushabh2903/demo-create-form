// question.model.ts
export interface Question {
    id: number;
    text: string;
    type: 'multipleChoice' | 'text' | 'checkboxes' | 'dropdown'; // Add more types
    options?: string[]; // For multiple choice, checkboxes, dropdown
    required: boolean;
  }