import FileForm from '../components/forms/FileForm'
import { useContext } from 'react'

import AuthContext from '../store//auth-context'

const UploadPage = () => {
    const authCtx = useContext(AuthContext)
    return (
        (authCtx.isAdmin) ? <></> : <FileForm />

    )
}

export default UploadPage