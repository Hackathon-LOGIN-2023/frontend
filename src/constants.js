export const URI_IMAGE = 'data:image/jpeg;base64,';

export const ISSUE_FIELDS_CHOICES = {
  severity: ['Low Impact', 'Significant Impact', 'Very High Impact'],
  category: [
    'Trash',
    'Traffic',
    'Public Property Damage',
    'Public Transport',
    'Other',
  ],
};

export function createPicker(label) {
  const options = ISSUE_FIELDS_CHOICES[label];
  return options.map((option, index) => ({label: option, value: index + 1}));
}

export const SCREENS = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  ISSUE_LIST: 'IssueList',
  ISSUE_DETAIL: 'IssueDetail',
  ISSUE_EDIT: 'IssueUpdate',
};
