import { Box, Button, Grid, Modal, PasswordInput, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { get } from 'lodash'
import { API_SEVICES } from '../../../config/services';
import { API_CONSTANT } from '../../../Constant/EndPoints';
import { AxiosError, AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
type ModelProps = {
    onClose: any;
    show: boolean;
};
const Index: React.FC<ModelProps> = (props) => {
    const { onClose, show } = props
    const navigate = useNavigate()
    const [loader, setLoader] = useState<boolean>(false)
    const SignupSchema = Yup.object().shape({
        Email: Yup.string().email('Field should contain a valid e-mail').max(255).required('Please enter your email').trim(),
        Password: Yup.string().required('Please Enter Password').min(3).max(56).trim(),
    })
    const formik = useFormik({
        initialValues: {
            Email: '',
            Password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            // console.log(values)
            setLoader(true)
            API_SEVICES.PostRequest(
                API_CONSTANT.STAFF_LOGIN,
                (res: AxiosResponse) => {
                    setLoader(false)
                    console.log(res.data)
                    localStorage.setItem('Token', res.data)
                    navigate('/StaffProfile')
                    // toast("Student Registered successfully", {
                    //     hideProgressBar: true,
                    //     autoClose: 1000,
                    //     type: "success",
                    // });
                },
                (err: AxiosError) => {
                    setLoader(false)
                    toast(`${err.response?.data}`, {
                        hideProgressBar: true,
                        autoClose: 1000,
                        type: "error",
                    });

                },
                {
                    email: formik.values.Email,
                    password: formik.values.Password,
                }
            );
        }
    })

    return (
        <Modal
            closeOnClickOutside={false}
            transition="fade"
            transitionDuration={300}
            transitionTimingFunction="ease"

            overlayOpacity={0.55}
            overlayBlur={3}
            size="sm"
            opened={show}
            onClose={
                () => {
                    onClose()
                    formik.resetForm()
                }

            }
            overflow="outside"
            radius={10}
            title={
                <>
                    <Title order={3}>Staff Login</Title>
                </>
            }

        >
            <Grid>

                <Grid.Col xs={12} >
                    <TextInput
                        label="Email"
                        type="email"
                        placeholder='Email'
                        required
                        name='Email'
                        value={formik.values.Email}
                        error={formik.touched.Email && get(formik.errors, 'Email')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></TextInput>

                </Grid.Col>
                <Grid.Col xs={12} >
                    <PasswordInput
                        label="Password"
                        placeholder="password"
                        required
                        name="Password"
                        value={formik.values.Password}
                        error={formik.touched.Password && get(formik.errors, 'Password')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />

                </Grid.Col>

                <Grid.Col span={12} >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: "space-evenly",
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            sx={{
                                width: 100
                            }}
                            radius="lg"
                            variant="gradient"
                            gradient={{ from: 'violet', to: 'cyan', deg: 105 }}
                            loading={loader}
                            onClick={() => {
                                formik.handleSubmit()
                            }}

                        >Login</Button>

                        <Button
                            sx={{
                                width: 100
                            }}
                            radius="lg"
                            variant="gradient"
                            gradient={{ from: 'red', to: 'orange', deg: 105 }}
                            onClick={() => {
                                formik.resetForm()
                                onClose()
                            }}
                        >Cancel</Button>
                    </Box>
                </Grid.Col>
            </Grid>
            <ToastContainer />
        </Modal>
    )
}

export default Index