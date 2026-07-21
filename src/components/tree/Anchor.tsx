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
      <svg className='h-3.5 w-3.5' viewBox='0 0 16 16' fill='none' aria-hidden='true'>
        <path
          d={expanded ? 'M3.5 6 8 10.5 12.5 6' : 'M6 3.5 10.5 8 6 12.5'}
          stroke='currentColor'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>
  )
}

export default Anchor
