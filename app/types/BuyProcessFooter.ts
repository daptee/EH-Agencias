export interface Steps {
  id: number
  isCompleted: boolean
  isActual: boolean
}

export interface BuyProcessFooterProps {
  steps: Steps[]
}

export interface BuyProcessFooterEmits {
  (e: 'stopBuyProcess'): void
}
