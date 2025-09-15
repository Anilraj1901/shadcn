import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type UserRoleDialogType = 'add' | 'edit' | 'delete'

interface UserRoleContextType {
  open: UserRoleDialogType | null
  setOpen: (str: UserRoleDialogType | null) => void
  currentRow: any
  setCurrentRow: React.Dispatch<React.SetStateAction<any>>
}

// Context object
const UserRoleContext = React.createContext<UserRoleContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function UserRolesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UserRoleDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any>(null)

  return (
    <UserRoleContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UserRoleContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserRoles = () => {
  const userRoleContext = React.useContext(UserRoleContext)

  if (!userRoleContext) {
    throw new Error('useUserRoles must be used within <UserRolesProvider>')
  }

  return userRoleContext
}
