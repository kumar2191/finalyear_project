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
type ModelProps = {
    onClose: any;
    show: boolean;
};
const Index: React.FC<ModelProps> = (props) => {
    const { onClose, show } = props
    const [loader, setLoader] = useState<boolean>(false)
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Please enter your Name')
            .min(3)
            .max(56).trim(),
        RegNo: Yup.string().required('Please enter Register Number').trim(),
        Email: Yup.string().email('Field should contain a valid e-mail').max(255).required('Please enter your email').trim(),
        Batch: Yup.string().required('Please enter your batch').trim(),
        Password: Yup.string().required('Please Enter Password').min(3).max(56).trim(),
        Department: Yup.string().required('Please Enter your Department ').trim(),
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            RegNo: '',
            Email: '',
            Batch: '',
            Password: '',
            Department: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log(values)
            setLoader(true)
            API_SEVICES.PostRequest(
                API_CONSTANT.STUDENT_REGISTER,
                (res: AxiosResponse) => {
                    setLoader(false)
                    toast("Student Registered successfully", {
                        hideProgressBar: true,
                        autoClose: 1000,
                        type: "success",
                    });
                },
                (err: AxiosError) => {
                    // console.error(err.response?.data);
                    setLoader(false)
                    toast(`${err.response?.data}`, {
                        hideProgressBar: true,
                        autoClose: 1000,
                        type: "error",
                    });

                },
                {
                    name: formik.values.name,
                    RegNo: formik.values.RegNo,
                    Dept: formik.values.Department,
                    email: formik.values.Email,
                    password: formik.values.Password,
                    Batch: formik.values.Batch,
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
            size="lg"
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
                    <Title order={3}>Student Registeration</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12} md={6} >
                    <TextInput
                        label="Name"
                        placeholder='Name'
                        required
                        name='name'
                        value={formik.values.name}
                        error={formik.touched.name && get(formik.errors, 'name')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></TextInput>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Register Number"
                        placeholder='Register Number'
                        required
                        name='RegNo'
                        value={formik.values.RegNo}
                        error={formik.touched.RegNo && get(formik.errors, 'RegNo')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></TextInput>

                </Grid.Col>
                <Grid.Col xs={12} md={6}>
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
                <Grid.Col xs={12} md={6}>
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
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Department"
                        placeholder='Department'
                        required
                        name="Department"
                        value={formik.values.Department}
                        error={formik.touched.Department && get(formik.errors, 'Department')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></TextInput>

                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Batch"
                        type="number"
                        placeholder='Batch'
                        required
                        name="Batch"
                        value={formik.values.Batch}
                        error={formik.touched.Batch && get(formik.errors, 'Batch')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    ></TextInput>

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
                            radius="md"
                            sx={{
                                width: 200
                            }}
                            variant="gradient"
                            gradient={{ from: 'violet', to: 'cyan', deg: 105 }}
                            loading={loader}
                            onClick={() => {
                                formik.handleSubmit()
                            }}

                        >SinUp</Button>

                        <Button
                            sx={{
                                width: 200
                            }}
                            radius="md"
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