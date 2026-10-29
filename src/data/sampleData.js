// ⚠️ SAMPLE DATA — DEVELOPMENT ONLY ⚠️
// These are made-up records used to build and preview the pages in Stage 2.
// They are NOT real listings, users or requests. Every page that shows them
// also shows a "Sample data" notice. In Stage 4 they are replaced with real
// data loaded from Supabase, and this file will no longer be used by the pages.

export const SAMPLE_ITEMS = [
  {
    id: 'sample-1',
    title: 'Wooden study desk with drawer',
    description:
      'Solid wood desk, 100 × 50 cm. One drawer runner is loose and needs a screw tightened. Surface has light scratches but is sturdy and usable.',
    category: 'furniture',
    condition: 'needs_repair',
    image_url: null,
    owner: { name: 'Sample User A', location: 'Sample City' },
    created_at: '2026-10-20T10:00:00Z',
  },
  {
    id: 'sample-2',
    title: 'Bluetooth speaker (no sound from left side)',
    description:
      'Portable speaker that charges and pairs fine, but the left driver is silent. Could be a loose wire. Good project for someone who enjoys electronics repair.',
    category: 'electronics',
    condition: 'needs_repair',
    image_url: null,
    owner: { name: 'Sample User B', location: 'Sample Town' },
    created_at: '2026-10-21T14:30:00Z',
  },
  {
    id: 'sample-3',
    title: 'First-year engineering textbooks (set of 4)',
    description:
      'Engineering mathematics, physics, basic electrical and programming in C. Some highlighting inside, all pages intact.',
    category: 'books',
    condition: 'good',
    image_url: null,
    owner: { name: 'Sample User C', location: 'Sample City' },
    created_at: '2026-10-22T09:15:00Z',
  },
  {
    id: 'sample-4',
    title: 'Denim jacket, size M',
    description:
      'Classic blue denim jacket. One button is missing at the cuff; otherwise in good shape. Easy fix with a replacement button.',
    category: 'clothing',
    condition: 'fair',
    image_url: null,
    owner: { name: 'Sample User A', location: 'Sample City' },
    created_at: '2026-10-23T18:45:00Z',
  },
  {
    id: 'sample-5',
    title: 'Non-stick frying pan, 26 cm',
    description:
      'Coating is still good, handle is a little loose. Works on gas stoves. Selling because I bought a bigger one.',
    category: 'kitchen',
    condition: 'good',
    image_url: null,
    owner: { name: 'Sample User D', location: 'Sample Village' },
    created_at: '2026-10-24T08:00:00Z',
  },
  {
    id: 'sample-6',
    title: 'Kids bicycle with flat tyre',
    description:
      '16-inch bicycle suitable for ages 5–8. Rear tyre is flat and the chain needs oil. Frame and brakes are fine.',
    category: 'sports',
    condition: 'needs_repair',
    image_url: null,
    owner: { name: 'Sample User B', location: 'Sample Town' },
    created_at: '2026-10-25T16:20:00Z',
  },
  {
    id: 'sample-7',
    title: 'Cordless drill (battery does not hold charge)',
    description:
      'Drill motor works when plugged into a charged battery, but this battery dies quickly. Could be used for parts or with a new battery.',
    category: 'tools',
    condition: 'for_parts',
    image_url: null,
    owner: { name: 'Sample User C', location: 'Sample City' },
    created_at: '2026-10-26T11:10:00Z',
  },
  {
    id: 'sample-8',
    title: 'Wooden board game set',
    description:
      'Chess, checkers and ludo in one wooden box. All pieces present, box lid hinge is a bit stiff.',
    category: 'toys',
    condition: 'like_new',
    image_url: null,
    owner: { name: 'Sample User D', location: 'Sample Village' },
    created_at: '2026-10-27T13:00:00Z',
  },
]

// Pretend "current user" data for previewing the dashboard layout.
export const SAMPLE_MY_LISTING_IDS = ['sample-1', 'sample-4']
export const SAMPLE_SAVED_IDS = ['sample-2', 'sample-6']

export const SAMPLE_REQUESTS = [
  {
    id: 'req-1',
    direction: 'received',
    item_id: 'sample-1',
    other_person: 'Sample User C',
    type: 'repair',
    status: 'pending',
    message: 'Hi! I have the right screws and can fix the drawer runner. Is the desk still available?',
    created_at: '2026-10-27T10:00:00Z',
  },
  {
    id: 'req-2',
    direction: 'sent',
    item_id: 'sample-2',
    other_person: 'Sample User B',
    type: 'reuse',
    status: 'accepted',
    message: 'I would love to try fixing the speaker for my hostel room.',
    created_at: '2026-10-26T15:30:00Z',
  },
]

export const SAMPLE_REPORTS = [
  {
    id: 'rep-1',
    item_id: 'sample-7',
    reason: 'misleading',
    details: 'Description says for parts but the title suggests it works.',
    status: 'open',
    created_at: '2026-10-27T09:00:00Z',
  },
  {
    id: 'rep-2',
    item_id: 'sample-5',
    reason: 'spam',
    details: 'Same item posted twice.',
    status: 'resolved',
    created_at: '2026-10-25T12:00:00Z',
  },
]

export function getSampleItem(id) {
  return SAMPLE_ITEMS.find((item) => item.id === id)
}
