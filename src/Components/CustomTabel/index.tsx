import { DataTable, DataTableColumn } from 'mantine-datatable'

interface Iprops {
    records: any[]
    coloumnDef: DataTableColumn<any>[]
}

export default function CustomTable(props: Iprops) {
    const { records, coloumnDef } = props
    return (
        <DataTable
            withBorder
            borderRadius="sm"
            withColumnBorders
            verticalAlignment="top"
            minHeight={300}
            striped
            highlightOnHover
            records={records}
            columns={coloumnDef}
        />
    )
}
