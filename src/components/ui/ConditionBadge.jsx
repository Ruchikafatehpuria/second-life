import { getConditionLabel } from '../../lib/constants.js'

// Colour-codes the item condition so it is easy to scan.
const CONDITION_STYLES = {
  like_new: 'badge-green',
  good: 'badge-green',
  fair: 'badge-info',
  needs_repair: 'badge-warning',
  for_parts: 'badge-danger',
}

export default function ConditionBadge({ condition }) {
  return (
    <span className={`badge ${CONDITION_STYLES[condition] ?? ''}`}>
      {getConditionLabel(condition)}
    </span>
  )
}
