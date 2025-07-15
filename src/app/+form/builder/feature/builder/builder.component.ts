import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { BuilderFormComponent } from '../builder-form/builder-form.component';
import { BuilderQuestionsComponent } from '../builder-questions/builder-questions.component';
import { GridModule } from 'carbon-components-angular';
import {
  Answer,
  Question,
} from '../../../../shared/data-access/model/form.model';
import { Router } from '@angular/router';
import { BuilderStore } from '../../data-access/store/builder.store';

@Component({
  selector: 'app-builder',
  templateUrl: 'builder.component.html',
  styleUrls: ['builder.component.scss'],
  imports: [
    CommonModule,
    BuilderFormComponent,
    BuilderQuestionsComponent,
    GridModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuilderComponent {
  private readonly builderStore = inject(BuilderStore);
  private readonly router = inject(Router);
  hasQuestions = computed(() => this.builderStore.hasQuestions());
  questions = computed(() => this.builderStore.questions());
  answers = computed(() => this.builderStore.answers());

  canReviewAnswers = computed(() => {
    const questions = this.questions();
    const answers = this.answers();

    if (questions.length === 0) return false;

    return questions.every((question) => {
      if (!question.required) return true;

      const answer = answers.find((a) => a.questionId === question.id);
      if (!answer) return false;

      if (question.type === 'paragraph') {
        return answer.value && answer.value.toString().trim().length > 0;
      } else if (question.type === 'checkbox') {
        const arrayValue = Array.isArray(answer.value) ? answer.value : [];
        return (
          arrayValue.length > 0 ||
          (answer.otherValue && answer.otherValue.trim().length > 0)
        );
      }

      return false;
    });
  });
  onQuestionAdded(question: Question) {
    this.builderStore.addQuestion(question);
    this.builderStore.toggleModal();
  }
  openModal() {
    this.builderStore.toggleModal();
  }

  onAnswerChange(answer: Answer) {
    this.builderStore.updateAnswer(answer);
  }

  getAnswerByQuestionId(questionId: string): Answer | undefined {
    return this.builderStore.getAnswerByQuestionId(questionId);
  }

  reviewAnswers() {
    if (this.builderStore.validateForm()) {
      this.router.navigate(['/form/answers']);
    }
  }
}
