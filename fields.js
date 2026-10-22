// The one list of form fields. index.html builds the form from it; admin.html uses it for labels and the detail view.
// Field: { key, label, type, required, options, help, full, short, showIf: get => bool, check: v => true | 'error message',
//          link: { text, href }, list: [{ text, link }] }
//   type: 'text' | 'textarea' | 'select' | 'buttons' | 'date' | 'email' | 'phone' | 'money' | 'percent' | 'number' | 'checkbox'
//   showIf gets a getter for other field values (get('has_mortgage')); hidden fields are cleared and not sent.
// Section heading: { section, intro, addressPicker } — starts a new card; addressPicker adds the Google address search to it.
(() => {
  const STATES = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
    'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
    'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  const letters = min => v => v.replace(/[^A-Za-z]/g, '').length >= min || `Must have at least ${min} letters.`;
  const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const callDate = v => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
    const day = m && new Date(+m[1], m[2] - 1, +m[3]);
    if (!day || ymd(day) !== v) return 'Pick a valid date.';
    if (v < ymd(new Date())) return "The call date can't be in the past.";
    if (![2, 4].includes(day.getDay())) return 'Live calls are Tuesdays and Thursdays only.';
    return true;
  };

  const hasMortgage = get => get('has_mortgage') === 'Yes';
  const askFinancing = get => get('has_mortgage') === 'No' || (hasMortgage(get) && get('open_to_takeover') === 'No');
  const sellerFinancing = get => askFinancing(get) && get('financing_or_cash') === 'Seller financing';

  window.FIELDS = [
    { section: 'About you', intro: 'We call leads, not prospects. Answer everything before submitting.' },
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
    { key: 'call_date', label: 'What date did you schedule the call?', type: 'date', required: true,
      help: 'Live calls are Tuesdays and Thursdays only.', check: callDate },

    { section: 'The questions' },
    { key: 'need_to_sell', label: '1. Why does the seller NEED to sell the house?', type: 'textarea', required: true,
      help: "The keyword is NEED. We're looking for urgency: behind on payments, divorce, job relocation, inherited and vacant, can't afford the insurance or repairs. If they just want to sell, or just want or need to move, that's not motivation." },
    { key: 'has_mortgage', label: '2. Is there a mortgage?', type: 'buttons', required: true, options: ['Yes', 'No'], full: true },
    { key: 'mortgage_balance', label: 'Mortgage balance', type: 'money', required: true, showIf: hasMortgage },
    { key: 'mortgage_rate', label: 'Interest rate', type: 'percent', required: true, showIf: hasMortgage },
    { key: 'mortgage_payment', label: 'Monthly payment ($ per month)', type: 'money', required: true, showIf: hasMortgage },
    { key: 'open_to_takeover', label: 'Are they open to a mortgage takeover?', type: 'buttons', required: true,
      options: ['Yes', 'No'], full: true, showIf: hasMortgage },
    { key: 'financing_or_cash', label: 'Are they open to seller financing, or is this a cash deal?', type: 'buttons', required: true,
      options: ['Seller financing', 'Cash'], full: true, showIf: askFinancing,
      help: 'For a cash deal, the seller must be open to a 40% to 50% discount on the property.' },
    { key: 'sf_price', label: 'Price', type: 'money', required: true, showIf: sellerFinancing },
    { key: 'sf_down_payment', label: 'Down payment', type: 'money', required: true, showIf: sellerFinancing },
    { key: 'sf_rate', label: 'Interest rate', type: 'percent', required: true, showIf: sellerFinancing },
    { key: 'sf_years', label: 'How many years will they finance?', type: 'number', required: true, showIf: sellerFinancing },
    { key: 'additional_notes', label: 'Additional notes', type: 'textarea' },
    { key: 'plan', label: '3. What do you plan to do with this property?', type: 'select', required: true,
      options: ['Live in it', 'Rent it out', "Get paid a finder's fee"], full: true },
    { key: 'acknowledged', label: 'I confirm that:', short: 'Acknowledged', type: 'checkbox', required: true, list: [
      { text: 'I ran the numbers in creativecalculator.io', link: { text: 'creativecalculator.io', href: 'https://www.creativecalculator.io' } },
      { text: "The seller or agent knows you'll be reaching out." },
      { text: "I understand you won't be able to get to every seller or agent during the Zoom, and the purpose of the Zoom calls is to teach us how to fish, not feed us fish." },
    ] },
  ];
})();
