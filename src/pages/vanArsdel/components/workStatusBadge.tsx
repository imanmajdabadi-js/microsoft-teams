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
  'in-progress': 'bg-info-100 text-info-700',
  'at-risk': 'bg-danger-200 text-danger-700',
  completed: 'bg-success-200 text-success-700',
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
