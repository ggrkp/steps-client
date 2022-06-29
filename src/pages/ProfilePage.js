import Snackbar from '../components/layout/Snackbar'
import { useState, useContext } from 'react'
import AuthContext from '../store/auth-context'

const ProfilePage = (props) => {
    const authCtx = useContext(AuthContext)
    const [showSnackbar, setShowSnackbar] = useState(false)

    const addActHandler = () => {
        const values = {
            type: 'RUNNING',
            latitude: 123456,
            longtitude: 123456,
            accuracy: 1,
            date: '2022-06-28 12:27:15'
        }

        fetch('/api/add-activities', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                Authorization: 'Bearer ' + authCtx.token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (!res.ok) {
                throw new Error('Failed to add activity.');
            }
            return res;
        }).then(data => {
            console.log('Added activity.')
        }).catch(err => console.log(err.message))
    }

    
    const helloHandler = () => {

        fetch('/api/hello', {
            headers: {
                Authorization: 'Bearer ' + authCtx.token,
                'Content-Type': 'application/json'
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
            .catch(err => console.log(err.message))
    }


    return (
        <div>
            <Snackbar showBar={showSnackbar} snackText={"Hello baby!"} />
            <button className="btn btn-primary" onClick={helloHandler}>Say Hello!</button>
            <button className="btn btn-secondary" onClick={addActHandler}>Add Activity</button>
        </div>
    )
}

export default ProfilePage