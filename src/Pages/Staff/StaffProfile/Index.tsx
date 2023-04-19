import { useEffect, useState } from 'react'
import { API_SEVICES } from '../../../config/services';
import { API_CONSTANT } from '../../../Constant/EndPoints';
import { AxiosError, AxiosResponse } from 'axios'
import { ActionIcon, Button, Grid, Group, Menu, Table, Text } from '@mantine/core';
import { AiFillPlusCircle } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { RxUpdate } from 'react-icons/rx'
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import CreateFineModal from '../../../Components/Staff/CreateFineModal/CreateFine'
import UpdateFineModal from '../../../Components/Staff/UpdateFineModal/Index'
const Index = () => {
    const [fineData, setFineData] = useState<any>([])
    const [CreateModal, setCreateModal] = useState<boolean>(false)
    const [FineAmount, setFineAmount] = useState<any>({})
    const [updateModal, setUpdateModal] = useState<boolean>(false)
    const [data, setData] = useState<any>({})
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            navigate('/')
        }
        Get_FineList()
        // GetFineTotalAmount()
    }, [])
    const Get_FineList = () => {
        API_SEVICES.GetRequest(
            API_CONSTANT.GET_ALL_FINE_LIST,
            (res: AxiosResponse) => {
                // console.log(res.data)
                setFineData(res.data)
            },
            (err: AxiosError) => {
                console.log(err)
            },

        );
    }
    const GetFineTotalAmount = async () => {
        API_SEVICES.GetRequest(
            API_CONSTANT.GET_FINE_TOTAL,
            (res: AxiosResponse) => {
                console.log(res.data)
                setFineAmount(res.data)
            },
            (err: AxiosError) => {
                console.log(err)
            },

        );
    }
    const RowData = fineData.map((element: any, i: number) => {
        return <tr key={i}>
            <td>{i + 1}</td>
            <td>{element.RegNo}</td>
            <td>{element.reason}</td>
            <td>{element.status}</td>
            <td>{element.amount}</td>
            <td>{element.date}</td>

            <td><Button size='xs' onClick={async () => {
                setData(element)
                setUpdateModal(true)


            }} leftIcon={<RxUpdate />} variant="gradient" gradient={{ from: 'cyan', to: 'teal', deg: 35 }} >update</Button></td>
        </tr>
    })
    return (
        <Grid>
            <Grid.Col xs={12} p={20} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }} >

                <Button
                    size="xs"
                    leftIcon={<AiFillPlusCircle color='cyan' />}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    onClick={() => {
                        setCreateModal(true);
                    }}
                >Create Fine</Button>
                {/* {
                    FineAmount.length > 0 ?
                        <>
                            <Text c="cyan" >Paid-Amount : {FineAmount.Paid.total}</Text>
                            <Text c="teal" >Total : {FineAmount.Not_Paid.total}</Text>
                            <Text c="red">Non-Paid-Amount : {FineAmount.Not_Paid.total}</Text>
                        </>

                        : <>
                            <Text c="cyan" >Paid-Amount : 0</Text>
                            <Text c="teal" >Total :0</Text>
                            <Text c="red">Non-Paid-Amount : 0</Text>
                        </>
                } */}
                {/* <Text c="cyan" >Paid-Amount : 0</Text>
                <Text c="teal" >Total :0</Text>
                <Text c="red">Non-Paid-Amount : 0</Text> */}

                <Group position='apart' >
                    <Menu withinPortal position="bottom-end" shadow="sm">
                        <Menu.Target>
                            <ActionIcon>
                                <BsThreeDotsVertical size={100} />
                            </ActionIcon>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item color="red" icon={<BiLogOut />}
                                onClick={() => {
                                    localStorage.clear()
                                    navigate('/')
                                }}>
                                Log Out
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </Grid.Col>
            <Grid.Col xs={12} mt={0} p={30} >
                <Table striped highlightOnHover withBorder withColumnBorders>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Register Number</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Data</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>{RowData}</tbody>
                </Table>
            </Grid.Col>

            <UpdateFineModal
                data={data}
                onClose={() => setUpdateModal(false)}
                show={updateModal}
                FineList={Get_FineList()}
            />

            <CreateFineModal

                onClose={() => {
                    setCreateModal(false)
                }}
                show={CreateModal}
            />

        </Grid>
    )
}

export default Index