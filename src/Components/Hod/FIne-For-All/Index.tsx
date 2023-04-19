import { Box, Button, Grid, Modal, NumberInput, PasswordInput, TextInput, Title } from '@mantine/core';
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
        Amount: Yup.number().required('Please enter Amount'),
        Reason: Yup.string().required('Please Enter Reason').min(3).max(56).trim(),
        Batch: Yup.number().required('Please enter Batch'),
    })
    const formik = useFormik({
        initialValues: {
            Amount: '',
            Reason: '',
            Batch: ''

        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            // console.log(values)
            setLoader(true)
            API_SEVICES.PostRequest(
                API_CONSTANT.FINE_FOR_ALL,
                (res: AxiosResponse) => {
                    setLoader(false)
                    toast(res.data, {
                        hideProgressBar: true,
                        autoClose: 1000,
                        type: "success",
                    });
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
                    amount: values.Amount,
                    reason: values.Reason,
                    batch: values.Batch
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
                    <Title order={3}>Create-Fine-For-All</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        type="number"
                        label="Amount"
                        placeholder="Amount"
                        required
                        name="Amount"
                        value={formik.values.Amount}
                        error={formik.touched.Amount && get(formik.errors, 'Amount')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />

                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Reason"
                        placeholder="Reason"
                        required
                        name="Reason"
                        value={formik.values.Reason}
                        error={formik.touched.Reason && get(formik.errors, 'Reason')}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />

                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        type="number"
                        label="Batch"
                        placeholder="Batch"
                        required
                        name="Batch"
                        value={formik.values.Batch}
                        error={formik.touched.Batch && get(formik.errors, 'Batch')}
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

                        >Create </Button>

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