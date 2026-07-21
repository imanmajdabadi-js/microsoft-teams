import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { WorkItem, WorkStatus, workItems as initialWorkItems } from '../data/workspaceData'

interface WorkspaceContextValue {
  workItems: WorkItem[]
  updateWorkItemStatus: (workItemId: string, status: WorkStatus) => void
}

interface SavedWorkStatus {
  id: string
  status: WorkStatus
}

export const WORK_STATUS_STORAGE_KEY = 'van-arsdel-work-statuses'

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined)

const isWorkStatus = (value: unknown): value is WorkStatus => {
  return value === 'in-progress' || value === 'at-risk' || value === 'completed'
}

const loadWorkItems = () => {
  if (typeof window === 'undefined') {
    return initialWorkItems
  }

  try {
    const savedValue = window.localStorage.getItem(WORK_STATUS_STORAGE_KEY)

    if (!savedValue) {
      return initialWorkItems
    }

    const parsedValue: unknown = JSON.parse(savedValue)

    if (!Array.isArray(parsedValue)) {
      return initialWorkItems
    }

    const savedStatuses = new Map<string, WorkStatus>()

    parsedValue.forEach((value) => {
      if (typeof value !== 'object' || value === null) {
        return
      }

      const candidate = value as { id?: unknown; status?: unknown }

      if (
        typeof candidate.id === 'string' &&
        isWorkStatus(candidate.status)
      ) {
        savedStatuses.set(candidate.id, candidate.status)
      }
    })

    return initialWorkItems.map((item) => ({
      ...item,
      status: savedStatuses.get(item.id) ?? item.status,
    }))
  } catch {
    return initialWorkItems
  }
}

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(loadWorkItems)

  useEffect(() => {
    const savedStatuses: SavedWorkStatus[] = workItems.map(({ id, status }) => ({ id, status }))

    try {
      window.localStorage.setItem(WORK_STATUS_STORAGE_KEY, JSON.stringify(savedStatuses))
    } catch {
      // Status changes should still work for the current session when storage is unavailable.
    }
  }, [workItems])

  const updateWorkItemStatus = (workItemId: string, status: WorkStatus) => {
    setWorkItems((currentWorkItems) =>
      currentWorkItems.map((item) => (item.id === workItemId ? { ...item, status } : item)),
    )
  }

  return (
    <WorkspaceContext.Provider value={{ workItems, updateWorkItemStatus }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export const useWorkspace = () => {
  const context = useContext(WorkspaceContext)

  if (!context) {
    throw new Error('useWorkspace must be used inside WorkspaceProvider')
  }

  return context
}
