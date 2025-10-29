export interface TableProps {
    headers: any[]
    items: any[]
    hideDefaultTableHeader: boolean
    quantityPerPage: number
    sortOptions: any
    search: string
}

export interface TableEmits {
    (e: 'rowClicked', item: any, rowData: any): void
}