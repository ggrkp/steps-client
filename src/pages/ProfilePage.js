import Snackbar from '../components/layout/Snackbar'
import { useState } from 'react'

const ProfilePage = (props) => {

    const [showSnackbar, setShowSnackbar] = useState(false)

    const clickHandler = () => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => {
                setShowSnackbar(true)
                setTimeout(() => setShowSnackbar(false), 3000)
                console.log(data.message)
            })
    }
    return (
        <div>
            <Snackbar showBar={showSnackbar} snackText="Hello baby!" />
            <button className="btn btn-primary" onClick={clickHandler}>click to fetch</button>
        </div>
    )
}

export default ProfilePage