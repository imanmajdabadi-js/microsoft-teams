import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import Anchor from './Anchor'

export type TreeNode = {
  title: string
  key: string
  path?: string
  children?: TreeNode[]
}

interface TreeProps {
  data: TreeNode[]
  onNodeSelect?: (key: string) => void
  expandedKeys?: string[]
}

const Tree: FC<TreeProps> = ({ expandedKeys = [], data, onNodeSelect }) => {
  return (
    <ul className='space-y-1'>
      {data.map((node) => {
        const hasChildren = Boolean(node.children?.length)
        const isExpanded = expandedKeys.includes(node.key)

        return (
          <li key={node.key}>
            <div className='flex min-h-8 items-center gap-1 rounded-md px-1 hover:bg-surface-hover'>
              {hasChildren ? (
                <Anchor
                  label={node.title}
                  onClick={() => onNodeSelect?.(node.key)}
                  expanded={isExpanded}
                />
              ) : (
                <span className='block h-6 w-6' aria-hidden='true' />
              )}
              {node.path ? (
                <NavLink
                  to={node.path}
                  className={({ isActive }) =>
                    `flex-1 text-sm font-normal ${isActive ? 'text-brand' : 'text-ink'}`
                  }
                >
                  {node.title}
                </NavLink>
              ) : (
                <span className='text-sm font-normal text-ink'>{node.title}</span>
              )}
            </div>
            {isExpanded && node.children && (
              <div className='ml-4 border-l border-line pl-2'>
                <Tree data={node.children} expandedKeys={expandedKeys} onNodeSelect={onNodeSelect} />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Tree
