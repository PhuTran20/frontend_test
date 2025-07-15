import { computed } from '@angular/core';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  patchState,
} from '@ngrx/signals';
import {
  Answer,
  Question,
} from '../../../../shared/data-access/model/form.model';

type BuilderState = {
  questions: Question[];
  answers: Answer[];
  isLoading: boolean;
  isOpenModal: boolean;
  error: string | null;
};

const initialState: BuilderState = {
  questions: [],
  answers: [],
  isLoading: false,
  isOpenModal: false,
  error: null,
};

export const BuilderStore = signalStore(
  { providedIn: 'root' },

  withState(initialState),

  withComputed((state) => ({
    hasQuestions: computed(() => state.questions().length > 0),
    isModalOpen: computed(() => state.isOpenModal()),
  })),

  withMethods((store) => ({
    addQuestion: (question: Question) => {
      patchState(store, (state) => ({
        questions: [...state.questions, question],
        error: null,
      }));
    },
    updateAnswer: (answer: Answer) => {
      patchState(store, (state) => ({
        answers: [
          ...state.answers.filter((a) => a.questionId !== answer.questionId),
          answer,
        ],
        error: null,
      }));
    },

    resetForm: () => {
      patchState(store, {
        questions: [],
        answers: [],
        isLoading: false,
        error: null,
      });
    },
    getAnswerByQuestionId: (questionId: string): Answer | undefined => {
      return store.answers().find((a) => a.questionId === questionId);
    },

    validateForm: () => {
      const questions = store.questions();
      const answers = store.answers();
      const errors: string[] = [];

      questions.forEach((question) => {
        if (question.required) {
          const answer = answers.find((a) => a.questionId === question.id);
          if (!answer) {
            errors.push(`Question "${question.title}" is required`);
          } else if (Array.isArray(answer.value) && answer.value.length === 0) {
            errors.push(
              `Question "${question.title}" requires at least one selection`
            );
          } else if (
            !Array.isArray(answer.value) &&
            !answer.value.toString().trim()
          ) {
            errors.push(`Question "${question.title}" cannot be empty`);
          }
        }
      });

      if (errors.length > 0) {
        patchState(store, { error: errors.join(', ') });
        return false;
      }

      patchState(store, { error: null });
      return true;
    },
    toggleModal: () => patchState(store, { isOpenModal: !store.isOpenModal() }),
  }))
);
