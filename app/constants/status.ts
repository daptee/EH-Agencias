export type StatusKey = 1 | 2 | 3 | 4 | 'default'

export interface StatusItem {
  name: string
  color: string
  icon: string
}

export const BASE_STATUSES_LIST: Record<StatusKey, StatusItem> = {
  1: {
    name: 'Pendiente',
    color: '#E8B455',
    icon: '$bullet_point_pending',
  },
  2: {
    name: 'Pago Rechazado',
    color: '#3686C3',
    icon: '$bullet_point_rejected',
  },
  3: {
    name: 'Confirmado',
    color: '#0CB4B5',
    icon: '$bullet_point_confirmed',
  },
  4: {
    name: 'Cancelado',
    color: '#FF7B43',
    icon: '$bullet_point_rejected',
  },
  default: {
    name: '',
    color: '#9d9d9d',
    icon: '',
  },
} as const
