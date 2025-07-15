import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  Answer,
  Question,
} from '../../../../shared/data-access/model/form.model';

@Component({
  selector: 'app-builder-form',
  templateUrl: 'builder-form.component.html',
  styleUrls: ['builder-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderFormComponent implements OnInit {
  @Input() question?: Question;
  @Input() existingAnswer?: Answer;
  @Output() answerChange = new EventEmitter<Answer>();

  answerForm!: FormGroup;

  private readonly fb = inject(FormBuilder);

  ngOnInit() {
    this.initForm();

    if (this.question) {
      this.initializeCheckboxes();
      this.loadExistingAnswer();
    }
  }

  private initForm() {
    this.answerForm = this.fb.group({
      paragraphAnswer: [''],
      checkboxAnswers: this.fb.array([]),
    });

    if (this.question?.hasOther) {
      this.answerForm.addControl('otherValue', this.fb.control(''));
    }
  }

  get checkboxAnswersArray(): FormArray {
    return this.answerForm.get('checkboxAnswers') as FormArray;
  }

  private initializeCheckboxes() {
    if (this.question?.type === 'checkbox' && this.question.options) {
      this.question.options.forEach(() => {
        this.checkboxAnswersArray.push(this.fb.control(false));
      });
    }
  }

  private loadExistingAnswer() {
    if (!this.existingAnswer || !this.question) return;

    if (this.question.type === 'paragraph') {
      this.answerForm.patchValue({
        paragraphAnswer: this.existingAnswer.value,
      });
    } else if (
      this.question.type === 'checkbox' &&
      Array.isArray(this.existingAnswer.value)
    ) {
      this.existingAnswer.value.forEach((opt: string) => {
        const idx = this.question!.options!.indexOf(opt);
        if (idx > -1) {
          this.checkboxAnswersArray.at(idx).setValue(true);
        }
      });

      if (this.existingAnswer.otherValue) {
        this.answerForm.patchValue({
          otherValue: this.existingAnswer.otherValue,
        });
      }
    }
  }

  onAnswerChange() {
    this.emitAnswer();
  }

  private emitAnswer() {
    const answer = this.buildAnswer();
    this.answerChange.emit(answer);
  }

  private buildAnswer(): Answer {
    if (!this.question) throw new Error('Question is required to build answer');

    if (this.question.type === 'paragraph') {
      return {
        questionId: this.question.id,
        value: this.answerForm.get('paragraphAnswer')?.value || '',
      };
    }

    const selectedOptions: string[] = [];
    this.question.options?.forEach((option, idx) => {
      if (this.checkboxAnswersArray.at(idx).value) {
        selectedOptions.push(option);
      }
    });

    const answer: Answer = {
      questionId: this.question.id,
      value: selectedOptions,
    };

    if (this.question.hasOther) {
      const otherValue = this.answerForm.get('otherValue')?.value?.trim();
      if (otherValue) {
        answer.otherValue = otherValue;
      }
    }
    return answer;
  }
}
