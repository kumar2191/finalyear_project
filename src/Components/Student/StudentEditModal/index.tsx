import { Box, Button, Grid, Modal, TextInput, Title } from '@mantine/core';
import React, { useState } from 'react';
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

    const [name, setName] = useState<string>()
    const [DepartMent, setDepartMent] = useState<string>()
    const [Section, setSection] = useState<string>()

    const Update = () => {
        setLoader(true)
        API_SEVICES.PostRequest(
            API_CONSTANT.STUDENT_UPDATE,
            (res: AxiosResponse) => {
                setLoader(false)
                onClose()
                toast(`Updated SuccessFully!!`, {
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
                name: name,
                Dept: DepartMent,
                Section: Section,
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
                    <Title order={3}>Student-Edit</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12} md={6} >
                    <TextInput
                        label="Name"
                        placeholder='Name'
                        name='name'
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    ></TextInput>
                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="section"
                        placeholder="section"
                        name="section"
                        onChange={(e) => {
                            setSection(e.target.value)
                        }}
                    />

                </Grid.Col>
                <Grid.Col xs={12} md={6}>
                    <TextInput
                        label="Department"
                        placeholder='Department'
                        name="Department"
                        onChange={(e) => {
                            setDepartMent(e.target.value)
                        }}
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
                                Update()
                            }}

                        >Update</Button>

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