export const CHOICES = {
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
  const options = CHOICES[label];
  return options.map((option, index) => ({label: option, value: index + 1}));
}
