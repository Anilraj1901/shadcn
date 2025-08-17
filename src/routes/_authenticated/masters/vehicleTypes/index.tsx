import { createFileRoute } from '@tanstack/react-router'
import VehicleTypes from '@/pages/masters/vehicleType'

export const Route = createFileRoute('/_authenticated/masters/vehicleTypes/')({
  component: VehicleTypes,
})