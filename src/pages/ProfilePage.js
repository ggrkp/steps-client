import Snackbar from '../components/layout/Snackbar'
import { useState, useContext } from 'react'
import AuthContext from '../store/auth-context'

const ProfilePage = (props) => {
    const authCtx = useContext(AuthContext)
    const [showSnackbar, setShowSnackbar] = useState(false)

    const clickHandler = () => {

        fetch('/api/hello', {
            headers: {
                Authorization: 'Bearer ' + authCtx.token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch hello.');
                }
                return res.json();
            })
            .then(data => {
                setShowSnackbar(true)
                setTimeout(() => setShowSnackbar(false), 3000)
                console.log(data.message)
            })
            .catch(err => console.error(err))
    }


    return (
        <div>
            <Snackbar showBar={showSnackbar} snackText={"Hello baby!"} />
            <button className="btn btn-primary" onClick={clickHandler}>click to fetch</button>
        </div>
    )
}

export default ProfilePage