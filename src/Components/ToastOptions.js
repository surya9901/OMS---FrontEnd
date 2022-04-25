import { ToastContainer} from 'react-toastify'

function Toastoptions() {
    return (
        <ToastContainer position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false} />
    )
}

export default Toastoptions