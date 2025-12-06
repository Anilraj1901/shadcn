import { createFileRoute, redirect } from '@tanstack/react-router'
import Dashboard from '@/pages/dashboard'

export const Route = createFileRoute('/_authenticated/')({
  beforeLoad: () => {
    const isLoggedIn = !!localStorage.getItem("token")

    if (!isLoggedIn) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirectTo: '/',
        },
      })
    }
    return null
  },

  component: Dashboard,
})
