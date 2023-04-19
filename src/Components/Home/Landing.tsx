import { Box, Button, Card, Container, Grid, Image, Text, Title } from '@mantine/core'
import { useState } from 'react'
import RegisterModal from '../Student/RegisterModal/Index'
import Student_LoginModal from '../Student/StudentLoginModal/Login'
import StaFFLoginModal from '../Staff/StaffLogin/index'
import HodLogin from '../Hod/HodLogin/Index'

import Image_ from './home.jpg'

function Landing() {
    const [Register_Modal, setRegister_Modal] = useState<boolean>(false)
    const [StudentLoginModal, setStudentLogin_Modal] = useState<boolean>(false)
    const [Staff_LoginModal, setStaffLogin_Modal] = useState<boolean>(false)
    const [HOD_LOGIN, setHod_Login] = useState<boolean>(false)
    return (
        <Container sx={{
            display: 'flex',
            justifyContent: 'center',
        }}  >

            <Card sx={{
                width: '100%'
            }} >
                {/* <Button
                onClick={() => {
                    setRegister_Modal(true)
                }}
                >Register</Button>
                
                <Button
                onClick={() => {
                    setStudentLogin_Modal(true)
                }}
                >Login</Button>
                
                <Button onClick={() => {
                    setStaffLogin_Modal(true)
            }}>
                Staff Login
            </Button> */}

                <Grid sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }} >
                    <Grid.Col xs={6}  >
                        <Grid >
                            <Grid.Col xs={12} >

                                <Title>Fine-Management</Title>
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <Title order={4} >Login to your Account</Title>
                                <Text>Welcome Back! Selecte way to Login</Text>
                            </Grid.Col>
                            <Grid.Col xs={12}>
                                <Title order={2} >Students</Title>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: "space-around",
                                    padding: 20
                                }} >
                                    <Button size='lg' onClick={() => {
                                        setRegister_Modal(true)
                                    }} variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} >Register</Button>

                                    <Button size='lg' onClick={() => {
                                        setStudentLogin_Modal(true)
                                    }} variant="gradient" gradient={{ from: 'orange', to: 'red' }} >Login</Button>
                                </Box>
                            </Grid.Col>
                            <Grid.Col xs={6} p={20} >
                                <Title order={2} >Cashier</Title>
                                <Box sx={{
                                    display: 'flex',
                                    padding: 20
                                }} >

                                    <Button size='lg' onClick={() => {
                                        setStaffLogin_Modal(true)
                                    }} variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} >Login</Button>
                                </Box>
                            </Grid.Col>
                            <Grid.Col xs={6} p={20} >
                                <Title order={2} >HOD</Title>
                                <Box sx={{
                                    display: 'flex',
                                    padding: 20
                                }} >

                                    <Button size='lg' onClick={() => {
                                        setHod_Login(true)
                                    }} variant="gradient" gradient={{ from: 'teal', to: 'cyan', deg: 35 }} >Login</Button>
                                </Box>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col xs={6}  >
                        <Image radius="md" src={Image_} alt="Random image" />
                    </Grid.Col>
                </Grid>















                <RegisterModal
                    onClose={() => {
                        setRegister_Modal(false)

                    }}
                    show={Register_Modal}

                />
                <Student_LoginModal
                    onClose={() => {
                        setStudentLogin_Modal(false)

                    }}
                    show={StudentLoginModal}
                />
                <StaFFLoginModal
                    onClose={() => {
                        setStaffLogin_Modal(false)

                    }}
                    show={Staff_LoginModal}

                />
                <HodLogin
                    onClose={() => {
                        setHod_Login(false)
                    }}
                    show={HOD_LOGIN}
                />
            </Card>
        </Container>
    )
}

export default Landing