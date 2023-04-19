import { Box, Button, Grid, Modal, Select, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
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
    const [reason, setReason] = useState<string>('')
    const [amount, setAmount] = useState<number>()
    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required('Please enter Name')
            .min(3)
            .max(56).trim(),
        RegNo: Yup.string().required('Please enter Register Number').trim(),
        Reason: Yup.string().max(255).required('Please select a Reason').trim(),
        Amount: Yup.number().required('Please enter  Amount'),
        Batch: Yup.number().required('Please Enter  Batch ')
    })
    useEffect(() => {
        (() => {
            switch (reason) {
                case 'Assignment':
                    return setAmount(10)
                case 'dress-code':
                    return (
                        setAmount(5)
                    )
                case 'late-for class':
                    return (
                        setAmount(20)
                    )
                case 'ID-Card':
                    return (
                        setAmount(5
                        ))
                case 'Leave-Letter':
                    return (
                        setAmount(10)
                    )
                default:
                    return (
                        setAmount(0
                        ))
            }

        })()
    }, [reason])

    const formik = useFormik({
        initialValues: {
            name: '',
            RegNo: '',
            Amount: 0,
            Batch: 2021,
            Reason: '',
        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            console.log(values)
            setLoader(true)
            API_SEVICES.PostRequest(
                API_CONSTANT.CREATE_FINE,
                (res: AxiosResponse) => {
                    setLoader(false)
                    toast("Fine created successfully", {
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
                    RegNo: formik.values.RegNo,
                    amount: amount,
                    reason: reason,
                    Batch: formik.values.Batch
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
                    <Title order={3}>Create-Fine</Title>
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
                    <Select
                        label="Reason"
                        placeholder="Select the Reason"
                        name='Reason'
                        value={formik.values.Reason}
                        error={formik.touched.Reason && get(formik.errors, 'Reason')}
                        onBlur={formik.handleBlur}
                        data={[
                            { value: 'Assignment', label: 'Assignment' },
                            { value: 'dress-code', label: 'dress-code' },
                            { value: 'late-for class', label: 'late-for class' },
                            { value: 'ID-Card', label: 'ID-Card' },
                            { value: 'Leave-Letter', label: 'Leave-Letter' },

                        ]}
                        onChange={(e: string) => {
                            formik.values.Reason = e
                            setReason(e)

                        }}

                    />

                </Grid.Col>

                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Amount"
                        type="number"
                        placeholder='Amount'
                        required
                        name="Amount"
                        value={amount}
                        readOnly
                    ></TextInput>


                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Batch"
                        type="number"
                        placeholder='Batch'
                        required
                        name="Batch"
                        readOnly
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

                        >Add fine</Button>

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