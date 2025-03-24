import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formBuilder: FormGroup;
  questions: FormArray;

  constructor(private fb: FormBuilder) {
    this.formBuilder = this.fb.group({
      title: [''],
      description: [''],
      questions: this.fb.array([]),
    });
    this.questions = this.formBuilder.get('questions') as FormArray;
  }
  
  addQuestion() {
    this.questions.push(this.fb.group({
      questionText: ['Question text'],
      type: ['shortText'],
      options: this.fb.array([]),
      required: false, 
    }));    
  }

  duplicateQuestion(index: number) {
    const originalQuestion = this.questions.at(index).value; 
    const duplicatedQuestion = this.fb.group({
      questionText: [originalQuestion.questionText],
      type: [originalQuestion.type],
      required: [originalQuestion.required],
      options: this.fb.array(
        originalQuestion.options ? originalQuestion.options.map((opt: any) => this.fb.control(opt)) : []
      )
    });
    this.questions.insert(index + 1, duplicatedQuestion); 
    
  }
  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  addOption(questionIndex: number) {
    const question = this.questions.at(questionIndex) as FormGroup;
    let options = question.get('options') as FormArray;

    if (!options) {
      options = this.fb.array([]);
      question.setControl('options', options);
    }

    options.push(new FormControl(''));
  }

  removeOption(questionIndex: number, optionIndex: number) {
    const options = this.getOptions(this.questions.at(questionIndex));
    options.removeAt(optionIndex);
  }

  getOptions(question: any): FormArray {
    return question.get('options') as FormArray;
  }

  onSubmit() {
    console.log("Form saved");
    console.log(this.formBuilder.value);
    // console.log('Form before saving:', JSON.stringify(this.formBuilder.value, null, 2));
    // this.formService.addForm(this.formBuilder.value);
  }
}
