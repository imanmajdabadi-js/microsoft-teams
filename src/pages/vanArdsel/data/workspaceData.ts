export type WorkStatus = 'in-progress' | 'at-risk' | 'completed'

export type WorkFilter = 'all' | 'at-risk' | 'due-soon' | 'completed'

export type WorkPriority = 'high' | 'medium' | 'low'

export interface Workstream {
  id: string
  title: string
  group: 'Product launch' | 'Website refresh'
  lead: string
  description: string
}

export interface WorkItem {
  id: string
  title: string
  description: string
  workstreamId: string
  workstream: string
  owner: string
  dueInDays: number
  priority: WorkPriority
  status: WorkStatus
  blocker?: string
}

export const workstreams: Workstream[] = [
  {
    id: 'spring-campaign',
    title: 'Spring campaign',
    group: 'Product launch',
    lead: 'Neda',
    description: 'Coordinate campaign reporting, messaging, and launch emails.',
  },
  {
    id: 'retail-partners',
    title: 'Retail partners',
    group: 'Product launch',
    lead: 'Arman',
    description: 'Prepare partner materials and store content for launch.',
  },
  {
    id: 'creative-assets',
    title: 'Creative assets',
    group: 'Product launch',
    lead: 'Mina',
    description: 'Track the final product imagery and reusable launch assets.',
  },
  {
    id: 'launch-operations',
    title: 'Launch operations',
    group: 'Product launch',
    lead: 'Sara',
    description: 'Keep support and internal launch materials ready for release.',
  },
  {
    id: 'website-refresh',
    title: 'Website refresh',
    group: 'Website refresh',
    lead: 'You',
    description: 'Validate tracking and content changes before launch.',
  },
]

export const workItems: WorkItem[] = [
  {
    id: 'review-campaign-numbers',
    title: 'Review spring campaign numbers',
    description: 'Confirm the final campaign report before the weekly launch review.',
    workstreamId: 'spring-campaign',
    workstream: 'Spring campaign',
    owner: 'Neda',
    dueInDays: 1,
    priority: 'high',
    status: 'at-risk',
    blocker: 'The paid media totals still need confirmation from finance.',
  },
  {
    id: 'fix-checkout-analytics',
    title: 'Fix checkout analytics events',
    description: 'Verify that the checkout funnel reports the correct launch events.',
    workstreamId: 'website-refresh',
    workstream: 'Website refresh',
    owner: 'You',
    dueInDays: 2,
    priority: 'high',
    status: 'at-risk',
    blocker: 'The event name used by the analytics dashboard is not confirmed.',
  },
  {
    id: 'approve-partner-deck',
    title: 'Approve retail partner deck',
    description: 'Review the final pricing and product details shared with retail partners.',
    workstreamId: 'retail-partners',
    workstream: 'Retail partners',
    owner: 'Arman',
    dueInDays: 4,
    priority: 'high',
    status: 'in-progress',
  },
  {
    id: 'publish-support-playbook',
    title: 'Publish support playbook',
    description: 'Prepare the support team for the most likely launch questions.',
    workstreamId: 'launch-operations',
    workstream: 'Launch operations',
    owner: 'Sara',
    dueInDays: 6,
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: 'confirm-product-photography',
    title: 'Confirm product photography',
    description: 'Select the final images for campaign and partner materials.',
    workstreamId: 'creative-assets',
    workstream: 'Creative assets',
    owner: 'Mina',
    dueInDays: 10,
    priority: 'medium',
    status: 'in-progress',
  },
  {
    id: 'share-weekly-report',
    title: 'Share weekly launch report',
    description: 'Summarize completed work, current risks, and decisions for the team.',
    workstreamId: 'launch-operations',
    workstream: 'Launch operations',
    owner: 'You',
    dueInDays: 0,
    priority: 'medium',
    status: 'completed',
  },
  {
    id: 'update-store-locator',
    title: 'Update store locator content',
    description: 'Publish the confirmed retail locations on the launch website.',
    workstreamId: 'retail-partners',
    workstream: 'Retail partners',
    owner: 'Reza',
    dueInDays: 0,
    priority: 'low',
    status: 'completed',
  },
  {
    id: 'prepare-launch-emails',
    title: 'Prepare launch email sequence',
    description: 'Complete the customer email sequence for launch week.',
    workstreamId: 'spring-campaign',
    workstream: 'Spring campaign',
    owner: 'You',
    dueInDays: 0,
    priority: 'medium',
    status: 'completed',
  },
]

export const getDueLabel = (item: WorkItem) => {
  if (item.status === 'completed') {
    return 'Completed'
  }

  if (item.dueInDays === 0) {
    return 'Due today'
  }

  if (item.dueInDays === 1) {
    return 'Due tomorrow'
  }

  return `Due in ${item.dueInDays} days`
}
