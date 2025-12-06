import { createFileRoute } from '@tanstack/react-router'
import NetworkError from '@/pages/errors/network-error'

export const Route = createFileRoute('/(errors)/NetworkError')({
  component: NetworkError,
})
