// The one list of form fields. index.html builds the form from it and admin.html builds its columns from it.
// Each entry: { key, label, type: 'text' | 'textarea' | 'select' | 'email' | 'phone', required, options (select only) }
window.FIELDS = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'question', label: 'Question', type: 'textarea', required: true },
];
