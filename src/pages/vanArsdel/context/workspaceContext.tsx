import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import {
  LaunchDecision,
  WorkItem,
  WorkStatus,
  decisions as initialDecisions,
  workItems as initialWorkItems,
} from '../data/workspaceData'

interface WorkspaceContextValue {
  workItems: WorkItem[]
  decisions: LaunchDecision[]
  updateWorkItemStatus: (workItemId: string, status: WorkStatus) => void
  recordDecision: (decisionId: string, outcome: string) => void
}

interface SavedWorkStatus {
  id: string
  status: WorkStatus
}

interface SavedDecision {
  id: string
  outcome: string
}

export const WORK_STATUS_STORAGE_KEY = 'van-arsdel-work-statuses'
export const DECISION_STORAGE_KEY = 'van-arsdel-decisions'

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

const loadDecisions = () => {
  if (typeof window === 'undefined') {
    return initialDecisions
  }

  try {
    const savedValue = window.localStorage.getItem(DECISION_STORAGE_KEY)

    if (!savedValue) {
      return initialDecisions
    }

    const parsedValue: unknown = JSON.parse(savedValue)

    if (!Array.isArray(parsedValue)) {
      return initialDecisions
    }

    const savedOutcomes = new Map<string, string>()

    parsedValue.forEach((value) => {
      if (typeof value !== 'object' || value === null) {
        return
      }

      const candidate = value as { id?: unknown; outcome?: unknown }

      if (
        typeof candidate.id === 'string' &&
        typeof candidate.outcome === 'string' &&
        candidate.outcome.trim()
      ) {
        savedOutcomes.set(candidate.id, candidate.outcome.trim())
      }
    })

    return initialDecisions.map((decision) => ({
      ...decision,
      outcome: savedOutcomes.get(decision.id) ?? decision.outcome,
    }))
  } catch {
    return initialDecisions
  }
}

export const WorkspaceProvider: FC<PropsWithChildren> = ({ children }) => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(loadWorkItems)
  const [decisions, setDecisions] = useState<LaunchDecision[]>(loadDecisions)

  useEffect(() => {
    const savedStatuses: SavedWorkStatus[] = workItems.map(({ id, status }) => ({ id, status }))

    try {
      window.localStorage.setItem(WORK_STATUS_STORAGE_KEY, JSON.stringify(savedStatuses))
    } catch {
      // Status changes should still work for the current session when storage is unavailable.
    }
  }, [workItems])

  useEffect(() => {
    const savedDecisions: SavedDecision[] = decisions
      .filter((decision): decision is LaunchDecision & { outcome: string } => {
        return Boolean(decision.outcome)
      })
      .map(({ id, outcome }) => ({ id, outcome }))

    try {
      window.localStorage.setItem(DECISION_STORAGE_KEY, JSON.stringify(savedDecisions))
    } catch {
      // Decision updates should still work for the current session when storage is unavailable.
    }
  }, [decisions])

  const updateWorkItemStatus = (workItemId: string, status: WorkStatus) => {
    setWorkItems((currentWorkItems) =>
      currentWorkItems.map((item) => (item.id === workItemId ? { ...item, status } : item)),
    )
  }

  const recordDecision = (decisionId: string, outcome: string) => {
    const normalizedOutcome = outcome.trim()

    if (!normalizedOutcome) {
      return
    }

    setDecisions((currentDecisions) =>
      currentDecisions.map((decision) =>
        decision.id === decisionId ? { ...decision, outcome: normalizedOutcome } : decision,
      ),
    )
  }

  return (
    <WorkspaceContext.Provider
      value={{ workItems, decisions, updateWorkItemStatus, recordDecision }}
    >
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
