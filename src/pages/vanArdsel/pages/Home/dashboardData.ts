export type WorkStatus = 'in-progress' | 'at-risk' | 'completed'

export type WorkFilter = 'all' | 'at-risk' | 'due-soon' | 'completed'

export interface WorkItem {
  id: number
  title: string
  workstream: string
  owner: string
  dueInDays: number
  status: WorkStatus
}

export const workItems: WorkItem[] = [
  {
    id: 1,
    title: 'Review spring campaign numbers',
    workstream: 'Spring campaign',
    owner: 'Neda',
    dueInDays: 1,
    status: 'at-risk',
  },
  {
    id: 2,
    title: 'Fix checkout analytics events',
    workstream: 'Website refresh',
    owner: 'You',
    dueInDays: 2,
    status: 'at-risk',
  },
  {
    id: 3,
    title: 'Approve retail partner deck',
    workstream: 'Retail partners',
    owner: 'Arman',
    dueInDays: 4,
    status: 'in-progress',
  },
  {
    id: 4,
    title: 'Publish support playbook',
    workstream: 'Launch operations',
    owner: 'Sara',
    dueInDays: 6,
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Confirm product photography',
    workstream: 'Creative assets',
    owner: 'Mina',
    dueInDays: 10,
    status: 'in-progress',
  },
  {
    id: 6,
    title: 'Share weekly launch report',
    workstream: 'Launch overview',
    owner: 'You',
    dueInDays: 0,
    status: 'completed',
  },
  {
    id: 7,
    title: 'Update store locator content',
    workstream: 'Retail partners',
    owner: 'Reza',
    dueInDays: 0,
    status: 'completed',
  },
  {
    id: 8,
    title: 'Prepare launch email sequence',
    workstream: 'Spring campaign',
    owner: 'You',
    dueInDays: 0,
    status: 'completed',
  },
]
