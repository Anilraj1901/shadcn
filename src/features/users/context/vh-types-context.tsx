import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'

type VhTypeDialogType =  'add' | 'edit' | 'delete'

interface VhTypeContextType {
  open: VhTypeDialogType | null
  setOpen: (str: VhTypeDialogType | null) => void
  currentRow: any
  setCurrentRow: React.Dispatch<React.SetStateAction<any>>
}

const VhTypeContextType = React.createContext<VhTypeContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function VhTypesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<VhTypeDialogType>(null)
  const [currentRow, setCurrentRow] = useState<any>(null)

  return (
    <VhTypeContextType value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </VhTypeContextType>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVhTypes = () => {
  const VhTypeContext = React.useContext(VhTypeContextType)

  if (!VhTypeContext) {
    throw new Error('useVhTypes has to be used within <VhTypeContext>')
  }

  return VhTypeContext
}
