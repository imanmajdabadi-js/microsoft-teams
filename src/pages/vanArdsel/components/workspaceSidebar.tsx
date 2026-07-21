import { useState } from 'react'
import Tree, { TreeNode } from '@/components/tree'
import { workstreams } from '../data/workspaceData'

const workspaceTree: TreeNode[] = [
  {
    title: 'Product launch',
    key: 'launch',
    children: workstreams
      .filter((workstream) => workstream.group === 'Product launch')
      .map((workstream) => ({
        title: workstream.title,
        key: workstream.id,
        path: `/van-ardsel/workstreams/${workstream.id}`,
      })),
  },
  {
    title: 'Website',
    key: 'website',
    children: workstreams
      .filter((workstream) => workstream.group === 'Website refresh')
      .map((workstream) => ({
        title: workstream.title,
        key: workstream.id,
        path: `/van-ardsel/workstreams/${workstream.id}`,
      })),
  },
]

const WorkspaceSidebar = () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['launch', 'website'])

  const handleNodeSelect = (key: string) => {
    setExpandedKeys((currentKeys) => {
      if (currentKeys.includes(key)) {
        return currentKeys.filter((currentKey) => currentKey !== key)
      }

      return [...currentKeys, key]
    })
  }

  return (
    <aside className='hidden w-60 shrink-0 border-r border-[#E1E1E8] bg-white px-4 py-6 lg:block'>
      <h2 className='mb-3 text-xs font-semibold uppercase tracking-wide text-[#616161]'>
        Workstreams
      </h2>
      <Tree data={workspaceTree} expandedKeys={expandedKeys} onNodeSelect={handleNodeSelect} />
    </aside>
  )
}

export default WorkspaceSidebar
