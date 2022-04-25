import { toast } from "react-toastify"

export const toastinfo = () => {
    toast.info('Cleared!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'dark'
    });
}

export const toastsuccess = () => {
    toast.success('Success!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    })
}

export const toasterror = () => {
    toast.error('Server Error!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    })
}

export const toastmismatch = () => {
    toast.error('Email/Password Mismatch!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        draggable: false,
        progress: undefined,
        theme: 'dark',
    })
}

// export const toastmismatch = () => {
//     toast.error('Email/Password Mismatch!', {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: false,
//         pauseOnFocusLoss: false,
//         draggable: false,
//         progress: undefined,
//         theme: 'dark',
//     })
// }

