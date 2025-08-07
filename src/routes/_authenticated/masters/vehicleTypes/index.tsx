import { createFileRoute } from '@tanstack/react-router'
import VehicleTypes from '@/features/masters/vehicleType'

export const Route = createFileRoute('/_authenticated/masters/vehicleTypes/')({
  component: VehicleTypes,
})