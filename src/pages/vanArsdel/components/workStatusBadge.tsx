import { FC } from 'react'
import { WorkStatus } from '../data/workspaceData'

interface WorkStatusBadgeProps {
  status: WorkStatus
}

const statusLabels: Record<WorkStatus, string> = {
  'in-progress': 'In progress',
  'at-risk': 'At risk',
  completed: 'Completed',
}

const statusClasses: Record<WorkStatus, string> = {
  'in-progress': 'bg-[#E8F1FB] text-[#185B8C]',
  'at-risk': 'bg-[#FDE7E9] text-[#A4262C]',
  completed: 'bg-[#E7F3EC] text-[#107C41]',
}

const WorkStatusBadge: FC<WorkStatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}

export default WorkStatusBadge
