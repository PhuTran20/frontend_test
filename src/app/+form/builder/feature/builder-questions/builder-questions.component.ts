import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
  inject,
  computed,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ModalModule } from 'carbon-components-angular';
import { Question } from '../../../../shared/data-access/model/form.model';
import { BuilderStore } from '../../data-access/store/builder.store';
@Component({
  selector: 'app-builder-questions',
  templateUrl: 'builder-questions.component.html',
  styleUrls: ['builder-questions.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderQuestionsComponent implements OnInit {
  @Output() questionAdded = new EventEmitter<Question>();
  questionForm!: FormGroup;

  isModalOpen = computed(() => this.builderStore.isModalOpen());

  private readonly builderStore = inject(BuilderStore);
  private readonly fb = inject(FormBuilder);
  readonly answersTypeOptions = signal([
    { value: 'paragraph', label: 'Paragraph Answer' },
    { value: 'checkbox', label: 'Check Box List' },
  ]);
  private initForm() {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      type: ['paragraph', Validators.required],
      required: [false],
      options: this.fb.array([]),
      hasOther: [false],
    });
  }

  private resetForm() {
    this.questionForm.reset();
    this.clearOptions();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  ngOnInit() {
    this.initForm();
    this.questionForm.get('type')?.valueChanges.subscribe((type: any) => {
      if (type === 'checkbox') {
        this.initializeOptions();
      } else {
        this.clearOptions();
      }
    });
  }

  get optionsFormArray(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  initializeOptions() {
    this.clearOptions();
    this.addOption();
    this.addOption();
  }

  addOption() {
    if (this.optionsFormArray.length < 5) {
      this.optionsFormArray.push(this.fb.control('', Validators.required));
    }
  }

  removeOption(index: number) {
    if (this.optionsFormArray.length > 1) {
      this.optionsFormArray.removeAt(index);
    }
  }

  clearOptions() {
    while (this.optionsFormArray.length > 0) {
      this.optionsFormArray.removeAt(0);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.questionForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSave() {
    if (this.questionForm.valid) {
      const formValue = this.questionForm.value;
      const question: Question = {
        id: this.generateId(),
        title: formValue.title,
        type: formValue.type,
        required: formValue.required,
        options:
          formValue.type === 'checkbox'
            ? formValue.options.filter((opt: string) => opt.trim())
            : undefined,
        hasOther:
          formValue.type === 'checkbox' ? formValue.hasOther : undefined,
      };

      this.questionAdded.emit(question);
      this.resetForm();
    }
  }

  onCancel() {
    this.resetForm();
    this.builderStore.toggleModal();
  }
}
