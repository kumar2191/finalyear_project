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
    data: any;
    FineList: any
};
const Index: React.FC<ModelProps> = (props) => {
    const { onClose, show, data, FineList } = props
    const [loader, setLoader] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("")

    const Update = () => {
        API_SEVICES.PutRequest(
            `${API_CONSTANT.UPDATE_FINE}${data._id}`,
            (res: AxiosResponse) => {
                setLoader(false)
                onClose()
                FineList()
                toast("Updated  successfully", {
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
                status: status

            }
        );

    }



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
                    <Title order={3}>Create-Fine</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        value={data.RegNo}
                        readOnly
                        label="Register Number"
                    />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        value={data.reason}
                        readOnly
                        label="Reason"
                    />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Amount"
                        readOnly
                        value={data.amount}
                    />
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <Select
                        label="Status"
                        placeholder='Select the Status'
                        value={status}
                        onChange={(e: string) => {

                            setStatus(e)
                        }}
                        data={[
                            { value: 'Not paid', label: 'Not paid' },
                            { value: 'paid', label: 'Paid' },
                        ]}

                    />
                </Grid.Col>

                <Grid.Col xs={12} >
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
                                Update()
                            }}

                        >Update fine</Button>

                        <Button
                            sx={{
                                width: 200
                            }}
                            radius="md"
                            variant="gradient"
                            gradient={{ from: 'red', to: 'orange', deg: 105 }}
                            onClick={() => {
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