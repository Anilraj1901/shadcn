import { createFileRoute } from '@tanstack/react-router'
import Users from '@/pages/user-management/users'

// No trailing slash:
export const Route = createFileRoute('/_authenticated/user-managment/user/')({
  component: Users,
})

