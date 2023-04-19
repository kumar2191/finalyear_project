import { REACT_APP_BACKEND_API_PROXY} from '../config/'

const API_CONSTANT = {
    STUDENT_REGISTER: `${REACT_APP_BACKEND_API_PROXY}/student/register`,
    STUDENT_LOGIN: `${REACT_APP_BACKEND_API_PROXY}/student/login`,
    STUDENT_PROFILE: `${REACT_APP_BACKEND_API_PROXY}/student/profile`,
    STUDENT_UPDATE: `${REACT_APP_BACKEND_API_PROXY}/student/update`,
    CHANGE_PASSWORD: `${REACT_APP_BACKEND_API_PROXY}/student/changePassword`,
    GET_FINE_LIST: `${REACT_APP_BACKEND_API_PROXY}/fine/ger`,
    
    
    // Staff
    STAFF_LOGIN: `${REACT_APP_BACKEND_API_PROXY}/staff/login`,
    GET_ALL_FINE_LIST: `${REACT_APP_BACKEND_API_PROXY}/fine/get`,
    UPDATE_FINE:`${REACT_APP_BACKEND_API_PROXY}/fine/update-fine/`,
    GET_FINE_TOTAL: `${REACT_APP_BACKEND_API_PROXY}/fine/paymentAmount`,
    CREATE_FINE: `${REACT_APP_BACKEND_API_PROXY}/fine/add`,
    

    // HOD

    HOD_LOGIN: `${REACT_APP_BACKEND_API_PROXY}/hod/login`,
    CREATE_CASHIER: `${REACT_APP_BACKEND_API_PROXY}/staff/register`,
    FINE_FOR_ALL: `${REACT_APP_BACKEND_API_PROXY}/fine/all`,
    GET_ALL_CASHIER:`${REACT_APP_BACKEND_API_PROXY}/staff/get_all`
};

export {
    API_CONSTANT
}