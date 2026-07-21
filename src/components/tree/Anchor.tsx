import { ArrowDown2, ArrowRight2 } from 'iconsax-react'
import IconElement from '../iconElement/IconElement'

interface AnchorProps {
  onClick: () => void
  expanded?: boolean
  label: string
}

const Anchor = ({ expanded, label, onClick }: AnchorProps) => {
  return (
    <button
      type='button'
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`}
      className='flex h-6 w-6 items-center justify-center rounded text-[#424242] hover:bg-[#ECECF3]'
    >
      <IconElement icon={expanded ? ArrowDown2 : ArrowRight2} className='h-3.5 w-3.5' />
    </button>
  )
}

export default Anchor
