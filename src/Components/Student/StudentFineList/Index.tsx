import { Grid, Modal, Text, Title } from '@mantine/core';
import { DataTableColumn } from 'mantine-datatable'
import { useMemo } from 'react';
import CustomTable from '../../CustomTabel';

type ModelProps = {
    onClose: any;
    show: boolean;
    Data?: any
};
const Index: React.FC<ModelProps> = (props) => {
    const { onClose, show, Data } = props


    // const Rows = Data.map((element: any, i: number) => {
    //     return <tr key={i}>
    //         <td>{element.reason}</td>
    //         <td>{element.RegNo}</td>
    //         <td>{element.status}</td>
    //         <td>{element.amount}</td>

    //     </tr>
    // })

    const colDef: DataTableColumn<any>[] = useMemo(
        () => [
            // {
            //     accessor: 'sno',
            //     title: 'S.No',
            // },
            {
                accessor: 'reason',
                title: 'Reason',
            },

            {
                accessor: 'RegNo',
                title: 'Register Number',
            },
            {
                accessor: 'status',
                title: 'Paid Status',
            },

            {
                accessor: 'amount',
                title: 'Amount',

            },
        ],
        []
    )

    return (
        <Modal
            closeOnClickOutside={false}
            transition="fade"
            transitionDuration={300}
            transitionTimingFunction="ease"

            overlayOpacity={0.55}
            overlayBlur={3}
            size="lg"
            opened={show}
            onClose={
                () => {
                    onClose()
                }

            }
            overflow="outside"
            radius={10}
            title={
                <>
                    <Title order={3}>Fine List</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12}>

                    {/* <Table captionSide='bottom' striped highlightOnHover withBorder withColumnBorders >
                        {
                            Rows.length > 0 ? null : <caption>No Fine Data</caption>
                        }
                        <thead>
                            <tr>
                                <th>Reason</th>
                                <th>Register Number</th>
                                <th>Paid Status</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Rows
                            }
                        </tbody>

                    </Table> */}
                    <CustomTable
                        records={Data} coloumnDef={colDef}
                    />
                </Grid.Col>
                <Grid.Col xs={12} sx={{
                    display: 'flex',
                    justifyContent: "space-around"
                }} >
                    <Text>Paid:50</Text>
                    <Text>Not-paid:50</Text>
                </Grid.Col>

            </Grid>
        </Modal>
    )
}

export default Index