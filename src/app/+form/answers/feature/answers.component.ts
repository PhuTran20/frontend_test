import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
} from '@angular/core';
import { BuilderStore } from '../../builder/data-access/store/builder.store';
import { Router } from '@angular/router';
import { Question } from '../../../shared/data-access/model/form.model';
import { GridModule } from 'carbon-components-angular';

@Component({
  selector: 'app-answers',
  templateUrl: 'answers.component.html',
  styleUrls: ['answers.component.scss'],
  imports: [CommonModule, GridModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswersComponent {
  private readonly builderStore = inject(BuilderStore);

  private readonly router = inject(Router);

  hasQuestions = computed(() => this.builderStore.hasQuestions());
  questions = computed(() => this.builderStore.questions());

  formatAnswer(question: Question): string {
    const answer = this.builderStore.getAnswerByQuestionId(question.id);
    if (!answer) {
      return 'No answer provided';
    }

    if (question.type === 'paragraph') {
      return (answer.value as string) || 'No answer provided';
    } else if (question.type === 'checkbox') {
      const selectedOptions = answer.value as string[];
      const result: string[] = [];

      if (selectedOptions && selectedOptions.length > 0) {
        result.push(...selectedOptions);
      }

      if (answer.otherValue && answer.otherValue.trim()) {
        result.push(`Other: ${answer.otherValue.trim()}`);
      }

      return result.length > 0 ? result.join(', ') : 'No options selected';
    }

    return 'No answer provided';
  }

  backToBuilder() {
    this.router.navigate(['/form/builder']);
  }
}
