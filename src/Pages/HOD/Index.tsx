import React, { useState, useEffect } from 'react'
import { ActionIcon, Button, Grid, Group, Menu, Table } from '@mantine/core';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom'
import { API_SEVICES } from '../../config/services';
import { API_CONSTANT } from '../../Constant/EndPoints';
import { AxiosError, AxiosResponse } from 'axios';
import { MdCreateNewFolder } from 'react-icons/md'
import { FaCashRegister, FaClipboardList } from 'react-icons/fa'
import { FcConferenceCall } from 'react-icons/fc'
import Create_Cashier from '../../Components/Hod/CreateCashier/Index'
import FineForAll from '../../Components/Hod/FIne-For-All/Index'
import Cashiergetallfrom from '../../Components/Hod/GetAllCashier/Index'
const Index = () => {
    const [fineData, setFineData] = useState<any>([])
    const [createCashier, setCreateCashier] = useState<boolean>(false)
    const [bulkFine, setBulkFine] = useState<boolean>(false)
    const [getAllCashier, setGetAllCashier] = useState<boolean>(false)
    const navigate = useNavigate()
    useEffect(() => {
        Get_FineList()
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
    const RowData = fineData.map((element: any, i: number) => {
        return <tr key={i}>
            <td>{i + 1}</td>
            <td>{element.RegNo}</td>
            <td>{element.reason}</td>
            <td>{element.status}</td>
            <td>{element.amount}</td>
            <td>{element.date}</td>


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
                    leftIcon={<MdCreateNewFolder color='cyan' />}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    onClick={() => {
                        setCreateCashier(true)
                    }}
                >Cashier Register</Button>
                <Button
                    size="xs"
                    leftIcon={<FcConferenceCall color='cyan' />}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    onClick={() => {
                        setBulkFine(true)
                    }}
                >Fine-For-All</Button>
                <Button
                    size="xs"
                    leftIcon={<FaClipboardList color='cyan' />}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    onClick={() => {
                    }}
                >Student-List</Button>
                <Button
                    size="xs"
                    leftIcon={<FaCashRegister color='cyan' />}
                    variant="gradient"
                    gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                    onClick={() => {
                        setGetAllCashier(true)
                    }}
                >Cashier-List</Button>

                {/* <Text c="cyan" >Paid-Amount : {FineAmount.Paid.total}</Text>
                <Text c="teal" >Total : {FineAmount.Paid.total + FineAmount.Not_Paid.total}</Text>
                <Text c="red">Non-Paid-Amount : {FineAmount.Not_Paid.total}</Text> */}

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
                        </tr>
                    </thead>
                    <tbody>{RowData}</tbody>
                </Table>
            </Grid.Col>
            <Create_Cashier
                show={createCashier}
                onClose={() => {

                    setCreateCashier(false)
                }}

            />
            <FineForAll
                show={bulkFine}
                onClose={() => setBulkFine(false)}

            />
            <Cashiergetallfrom
                show={getAllCashier}
                onClose={() => setGetAllCashier(false)}
            />


        </Grid>)
}

export default Index