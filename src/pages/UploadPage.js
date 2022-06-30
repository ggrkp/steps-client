import FileForm from '../components/forms/FileForm'
// import { useEffect, useContext } from 'react'
// import axios from 'axios'

// import AuthContext from '../store//auth-context'

const UploadPage = () => {
    // const authCtx = useContext(AuthContext)
    // useEffect(() => {
    //     axios.get('http://localhost:3000/api/hello', {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //             Authorization: 'Bearer ' + authCtx.token,
    //         }
    //     })
    //         .then(res => {

    //             console.log(res.data.message)
    //         })
    //         .catch(err => {
    //             console.log(err.response.data)
    //             authCtx.logout()
    //         }
    //         )

    // }, [authCtx]);
    return (
        <FileForm />
    )
}

export default UploadPage