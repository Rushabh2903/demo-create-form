// src/app/form-builder/form-builder.component.ts
import { Component } from '@angular/core';
import { Question } from '../models/question.model';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css'],
})
export class FormBuilderComponent {
  formTitle = 'Untitled form';
  formDescription = 'Form description';
  questions: Question[] = [];
  questionIdCounter = 1;

  addQuestion() {
    const newQuestion: Question = {
      id: this.questionIdCounter++,
      text: 'Untitled Question',
      type: 'multipleChoice',
      options: ['Option 1'],
      required: false,
    };
    this.questions.push(newQuestion);
  }

  removeQuestion(id: number) {
    this.questions = this.questions.filter((q) => q.id !== id);
  }
}