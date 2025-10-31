export interface TableProps {
  headers: any[]
  items: any[]
  hideDefaultTableHeader: boolean
  quantityPerPage: number
  sortOptions: any
  search: string
  canBeClicked: boolean
}

export interface TableEmits {
  (e: 'rowClicked', item: any, rowData: any): void
}
