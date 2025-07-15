export const MESSAGE_TEMPLATES = {
  // Error templates
  LOAD_ERROR: 'Cannot load {{name}}',
  LOAD_LIST_ERROR: 'Cannot load the list of {{name}}',
  LOAD_PRIORITY_ERROR: 'Cannot load priority {{name}}',
  CREATE_ERROR: 'Cannot create {{name}}',
  UPDATE_ERROR: 'Cannot update {{name}}',
  DELETE_ERROR: 'Cannot delete {{name}}',
  LOGIN_FAILED: 'Login failed. Please check your login information again.',

  // System error templates
  SYSTEM_LOAD_ERROR: 'An error occurred while loading {{name}}',
  SYSTEM_LOAD_LIST_ERROR:
    'An error occurred while loading the list of {{name}}',
  SYSTEM_LOAD_PRIORITY_ERROR:
    'An error occurred while loading priority {{name}}',
  SYSTEM_CREATE_ERROR: 'An error occurred while creating {{name}}',
  SYSTEM_UPDATE_ERROR: 'An error occurred while updating {{name}}',
  SYSTEM_DELETE_ERROR: 'An error occurred while deleting {{name}}',

  // Success templates
  CREATE_SUCCESS: '{{name}} created successfully!',
  UPDATE_SUCCESS: '{{name}} updated successfully!',
  DELETE_SUCCESS: '{{name}} deleted successfully!',

  // Info templates
  NO_DATA: 'No {{name}} found',
  LOADING: 'Loading {{name}}...',
  CONFIRM_DELETE: 'Are you sure you want to delete this {{name}}?',
  CONFIRM_DELETE_MULTIPLE:
    'Are you sure you want to delete {{count}} {{name}}?',
  NOT_DATA_PRIORITY: 'There are no important announcements today.',
} as const;
