import { MESSAGE_TEMPLATES } from '../constants/message.constants';

export class MessageBuilder {
  static format(
    template: string,
    replacements: Record<string, string | number>
  ): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return replacements[key]?.toString() || match;
    });
  }

  static createErrorMessages(entityName: string) {
    return {
      LOAD_LIST: this.format(MESSAGE_TEMPLATES.LOAD_LIST_ERROR, {
        name: entityName,
      }),
      LOAD_PRIORITY: this.format(MESSAGE_TEMPLATES.LOAD_PRIORITY_ERROR, {
        name: entityName,
      }),
      CREATE: this.format(MESSAGE_TEMPLATES.CREATE_ERROR, { name: entityName }),
      UPDATE: this.format(MESSAGE_TEMPLATES.UPDATE_ERROR, { name: entityName }),
      DELETE: this.format(MESSAGE_TEMPLATES.DELETE_ERROR, { name: entityName }),
      LOAD_LIST_ERROR: this.format(MESSAGE_TEMPLATES.SYSTEM_LOAD_LIST_ERROR, {
        name: entityName,
      }),
      LOAD_PRIORITY_ERROR: this.format(
        MESSAGE_TEMPLATES.SYSTEM_LOAD_PRIORITY_ERROR,
        { name: entityName }
      ),
      CREATE_ERROR: this.format(MESSAGE_TEMPLATES.SYSTEM_CREATE_ERROR, {
        name: entityName,
      }),
      UPDATE_ERROR: this.format(MESSAGE_TEMPLATES.SYSTEM_UPDATE_ERROR, {
        name: entityName,
      }),
      DELETE_ERROR: this.format(MESSAGE_TEMPLATES.SYSTEM_DELETE_ERROR, {
        name: entityName,
      }),
      LOGIN_FAILED: MESSAGE_TEMPLATES.LOGIN_FAILED,
    };
  }

  static createSuccessMessages(entityName: string) {
    return {
      CREATE: this.format(MESSAGE_TEMPLATES.CREATE_SUCCESS, {
        name: entityName,
      }),
      UPDATE: this.format(MESSAGE_TEMPLATES.UPDATE_SUCCESS, {
        name: entityName,
      }),
      DELETE: this.format(MESSAGE_TEMPLATES.DELETE_SUCCESS, {
        name: entityName,
      }),
    };
  }

  static createInfoMessages(entityName: string) {
    return {
      NO_DATA: this.format(MESSAGE_TEMPLATES.NO_DATA, { name: entityName }),
      LOADING: this.format(MESSAGE_TEMPLATES.LOADING, { name: entityName }),
      CONFIRM_DELETE: this.format(MESSAGE_TEMPLATES.CONFIRM_DELETE, {
        name: entityName,
      }),
      NOT_DATA_PRIORITY: MESSAGE_TEMPLATES.NOT_DATA_PRIORITY,
      CONFIRM_DELETE_MULTIPLE: (count: number) =>
        this.format(MESSAGE_TEMPLATES.CONFIRM_DELETE_MULTIPLE, {
          count,
          name: entityName,
        }),
    };
  }
}
