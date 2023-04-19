import { useState, useEffect } from 'react'
import { API_SEVICES } from '../../config/services';
import { API_CONSTANT } from '../../Constant/EndPoints';
import { AxiosError, AxiosResponse } from 'axios'
import { Card, Grid, Image, Text, Group, Center, Menu, ActionIcon, Box } from '@mantine/core';
import { BsThreeDotsVertical, BsFillKeyFill } from 'react-icons/bs';
import { AiTwotoneEdit, AiOutlineUnorderedList } from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './Style';
import StudentEditModal from '../../Components/Student/StudentEditModal/index';
import ChangePasswordModal from '../../Components/Student/ChangePassword/ChangePassword';
import FineListModal from '../../Components/Student/StudentFineList/Index';
const StudentProfile = () => {
    const { classes, theme } = useStyles();
    const [Data, setData] = useState<any>([])
    const [StudentEdit, setStudentEdit] = useState<boolean>(false)
    const [Change_Password, setChangePassword] = useState<boolean>(false)
    const [File_ListModal, setFine_ListModal] = useState<boolean>(false)
    const [fineData, setFineData] = useState<any>([])
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            navigate('/')
        }
        GetData()
        Get_Fine_List()
    }, [])

    const GetData = () => {
        API_SEVICES.GetRequest(
            API_CONSTANT.STUDENT_PROFILE,
            (res: AxiosResponse) => {
                setData(res.data)
            },
            (err: AxiosError) => {
                console.log(err)
            },

        );
    }
    const Get_Fine_List = () => {
        API_SEVICES.GetRequest(
            API_CONSTANT.GET_FINE_LIST,
            (res: AxiosResponse) => {
                setFineData(res.data)
            },
            (err: AxiosError) => {
                console.log(err)
            },

        );
    }

    return (
        <Center>
            <Grid display="flex" align='center' justify="center" >
                <Grid.Col >
                    <Card shadow="sm" p="lg" radius="md" withBorder sx={{
                        width: 400,
                        marginTop: theme.spacing?.xl,
                        maxWidth: 400
                    }} >
                        <Group position='right' >
                            <Menu withinPortal position="bottom-end" shadow="sm">
                                <Menu.Target>
                                    <ActionIcon>
                                        <BsThreeDotsVertical />
                                    </ActionIcon>
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Menu.Item icon={<AiTwotoneEdit />} onClick={() => {
                                        setStudentEdit(true)
                                    }} >Edit</Menu.Item>
                                    <Menu.Item icon={<BsFillKeyFill />}
                                        onClick={() => {
                                            setChangePassword(true)
                                        }}
                                    >Change Password</Menu.Item>
                                    <Menu.Item icon={<AiOutlineUnorderedList />}
                                        onClick={() => {
                                            setFine_ListModal(true)
                                        }}
                                    >Fine List</Menu.Item>
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
                        <Card.Section  >
                            <Center>
                                <Image
                                    src="https://img.collegedekhocdn.com/media/img/institute/logo/RVSIMSR_LOGO.png"
                                    height={100}
                                    width={100}
                                    alt="Norway"
                                // radius={450}
                                />
                            </Center>
                        </Card.Section>

                        <Group position="center" mt="md" mb="xs">
                            {/* <Center> */}
                            <Text weight={500}>Profile</Text>
                            {/* </Center> */}
                        </Group>
                        <Grid p={10} >
                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Name</Text>
                                    <Text>{Data.name}</Text>
                                </Box>
                            </Grid.Col>

                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Email</Text>
                                    <Text>{Data.email}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Register Number</Text>
                                    <Text>{Data.RegNo}</Text>
                                </Box>
                            </Grid.Col>

                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Departmet</Text>
                                    <Text>{Data.Dept}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Section</Text>
                                    <Text>{Data.Section}</Text>
                                </Box>
                            </Grid.Col>
                            <Grid.Col>
                                <Box className={classes.flex} >
                                    <Text>Batch</Text>
                                    <Text>{Data.Batch}</Text>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Card>

                </Grid.Col>



                <StudentEditModal
                    onClose={() => {
                        GetData()
                        setStudentEdit(false)
                    }}
                    show={StudentEdit}
                />

                <ChangePasswordModal
                    onClose={() => {
                        GetData()
                        setChangePassword(false)
                    }}
                    show={Change_Password}
                />

                <FineListModal
                    onClose={() => {
                        setFine_ListModal(false)
                    }}
                    show={File_ListModal}
                    Data={fineData}
                />


            </Grid>
        </Center>
    )
}

export default StudentProfile