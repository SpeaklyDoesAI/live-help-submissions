// The one list of form fields. index.html builds the form from it; admin.html uses it for labels and the detail view.
// Field: { key, label, type, required, options, help, full, showIf: { key, equals }, check: v => true | 'error message', link: { text, href } }
//   type: 'text' | 'textarea' | 'select' | 'email' | 'phone' | 'money' | 'percent' | 'checkbox'
// Section heading: { section, intro, addressPicker } — starts a new card; addressPicker adds the Google address search to it.
(() => {
  const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
    'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
    'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const letters = min => v => v.replace(/[^A-Za-z]/g, '').length >= min || `Must have at least ${min} letters.`;
  const ifMortgage = { key: 'has_mortgage', equals: 'Yes' };

  window.FIELDS = [
    { section: 'About you' },
    { key: 'member_name', label: 'Your name (Skool name)', type: 'text', required: true, check: letters(2) },

    { section: 'The property', addressPicker: true },
    { key: 'street_address', label: 'Street Address', type: 'text', required: true, full: true,
      check: v => /^\d+[A-Za-z]?(-\d+)?\s+\S.*[A-Za-z]/.test(v) || 'Start with the house number, then the street name (e.g. 123 Main St).' },
    { key: 'city', label: 'City', type: 'text', required: true },
    { key: 'state', label: 'State', type: 'select', required: true, options: STATES },
    { key: 'postal_code', label: 'Postal Code', type: 'text', required: true,
      check: v => /^\d{5}$/.test(v) || 'Postal code must be 5 digits.' },

    { section: "Who we're calling" },
    { key: 'contact_type', label: "We'll be calling the", type: 'select', required: true, options: ['Seller', 'Agent'] },
    { key: 'contact_name', label: 'Their name', type: 'text', required: true, check: letters(2) },
    { key: 'contact_phone', label: 'Their phone', type: 'phone', required: true },
    { key: 'call_day', label: 'Which call works for them', type: 'select', required: true, options: ['Tuesday', 'Thursday', 'Either'] },

    { section: 'The 4 questions', intro: 'We call Leads, not Prospects. Answer all 4 before submitting.' },
    { key: 'need_to_sell', label: '1. Why does the seller NEED to sell the house?', type: 'textarea', required: true,
      help: "We're looking for urgency. If they just want to sell, we'll likely be wasting time." },
    { key: 'has_mortgage', label: '2. Is there a mortgage?', type: 'select', required: true, options: ['Yes', 'No', 'Not sure'], full: true },
    { key: 'mortgage_balance', label: 'Mortgage balance', type: 'money', required: true, showIf: ifMortgage },
    { key: 'mortgage_rate', label: 'Interest rate', type: 'percent', required: true, showIf: ifMortgage },
    { key: 'mortgage_payment', label: 'Monthly payment ($ per month)', type: 'money', required: true, showIf: ifMortgage },
    { key: 'open_to', label: '3. Are they open to a mortgage takeover or seller financing?', type: 'select', required: true,
      options: ['Mortgage takeover', 'Seller financing', 'Both', 'Neither'], full: true },
    { key: 'asking_terms', label: 'What terms are they asking for?', type: 'textarea', required: true },
    { key: 'ran_calculator', label: 'I ran their price and terms in creativecalculator.io', type: 'checkbox', required: true,
      link: { text: 'creativecalculator.io', href: 'https://www.creativecalculator.io' } },
    { key: 'plan', label: '4. What do you plan to do with this property?', type: 'select', required: true,
      options: ['Live in it', 'Rent it out', "Finder's fee"], full: true },
  ];
})();
