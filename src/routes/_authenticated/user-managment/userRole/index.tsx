import { createFileRoute } from '@tanstack/react-router'
import UserRoles from '@/pages/user-management/userRole'

// No trailing slash:
export const Route = createFileRoute('/_authenticated/user-managment/userRole/')({
  component: UserRoles,
})
