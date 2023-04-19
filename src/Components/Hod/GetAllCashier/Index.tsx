import { Box, Button, Grid, Modal, NumberInput, PasswordInput, TextInput, Title } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { get } from 'lodash'
import { API_SEVICES } from '../../../config/services';
import { API_CONSTANT } from '../../../Constant/EndPoints';
import { AxiosError, AxiosResponse } from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTableColumn } from 'mantine-datatable';
import CustomTable from '../../CustomTabel';

type ModelProps = {
    onClose: any;
    show: boolean;
};
const Index: React.FC<ModelProps> = (props) => {
    const { onClose, show } = props
    const [data, setData] = useState<any>([])



    useEffect(() => {
        getAll()
    }, [])

    const getAll = () => {
        API_SEVICES.GetRequest(
            API_CONSTANT.GET_ALL_CASHIER,
            (res: AxiosResponse) => {
                // console.log(res.data)
                setData(res.data)
            },
            (err: AxiosError) => {
                console.log(err)
            },

        );
    }
    const colDef: DataTableColumn<any>[] = useMemo(
        () => [

            {
                accessor: 'name',
                title: 'Name',
            },

            {
                accessor: 'email',
                title: 'Email',
            },
            {
                accessor: 'Batch',
                title: 'Batch',

            },

        ],
        []
    )


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
                    <Title order={3}>Create-Fine-For-All</Title>
                </>
            }

        >
            <Grid>
                <Grid.Col xs={12} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }} >
                    <CustomTable
                        records={data} coloumnDef={colDef}
                    />
                </Grid.Col>

            </Grid>
        </Modal>
    )
}

export default Index