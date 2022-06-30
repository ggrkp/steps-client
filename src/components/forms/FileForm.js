import styles from './Form.module.css'
import Card from '../layout/Card'
import AuthContext from '../../store/auth-context'
import { useState, useContext, useEffect, useCallback } from 'react'
import Snackbar from '../layout/Snackbar';
import Loader from '../layout/Loader';
import axios from 'axios';

const FileForm = () => {
    const authCtx = useContext(AuthContext)


    const [selectedFile, setSelectedFile] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [uploadingData, setUploadingData] = useState(false)
    const [latestUpload, setLatestUpload] = useState(null)
    const [hasError, setHasError] = useState({
        msg: '',
        error: false
    })

    const getLatestUploadDate = useCallback(() => {
        axios.get('http://localhost:3000/activities/latest-upload', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + authCtx.token,
            }
        }).then(response => {
            setLatestUpload(response.data)
            console.log(response.data)
        }).catch(err => {
            console.log(err.response.data)
            setLatestUpload(null)
        })
    }, [])

    useEffect(() => {
        getLatestUploadDate()
    }, [getLatestUploadDate])


    const submitHandler = (e) => {
        setUploadingData(true)
        e.preventDefault();
        const formData = new FormData()
        formData.append('file', selectedFile)


        axios
            .post('http://localhost:3000/api/add-activities', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' + authCtx.token,
                }
            })
            .then(res => {
                if (!res.statusText === 'OK') {
                    throw new Error('There was an error uploading your data. Please try again.')
                }
                setShowSnackbar(true)
                setTimeout(() => setShowSnackbar(false), 3000)
                // getLatestUploadDate()
                return res
            })
            .finally(() => {
                setUploadingData(false)
            })
            .catch(err => {
                // todo: set error state to show to browser 
                console.log(err.response.data)
                setHasError({ msg: err.response.data, error: true })
                setUploadingData(false)
            })

    }
    let formattedUploadDate
    if (latestUpload) {
        const uploadDate = new Date(latestUpload);
        const year = uploadDate.getFullYear();
        const month = uploadDate.getMonth() + 1;
        const dt = uploadDate.getDate();
        const hour = uploadDate.getHours();
        const minute = uploadDate.getMinutes();
        const second = uploadDate.getSeconds();
        formattedUploadDate = ` Last upload: ${dt}.${month}.${year} | ${hour}:${minute}:${second}`
    } else (
        formattedUploadDate = "You haven't uploaded any data yet"
    )


    return (
        <Card Card className={styles['center-card']} >
            <Snackbar showBar={showSnackbar} snackText="File uploaded successfully!" />
            <div className={styles["card-img"]}>
                <h1 className={styles['form-title']}>Upload File</h1>
                <h4 className={styles['form-title']}>Pick a json file and upload it.</h4>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fillOpacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>

            <h4 className={styles['form-title']}> {formattedUploadDate}</h4>

            <form onSubmit={submitHandler} className={styles.form} encType="multipart/form-data">

                <label className="btn-primary    btn">
                    <input
                        onChange={(e) => {
                            setSelectedFile(e.target.files[0])
                            setHasError({ msg: '', error: false })
                        }}
                        type="file"
                        id="file"
                        name="file" />
                    Browse files
                </label>
                {selectedFile ?
                    <>

                        <span>File: {selectedFile.name}</span> <br />
                        <span>Size: {(selectedFile.size / 1024).toFixed(2) + " KB"}</span>
                    </>
                    : <span>No file selected.</span>
                }
                {
                    uploadingData
                        ? <Loader size={48} />
                        : <button disabled={!selectedFile} className="btn btn-secondary">Upload file</button>
                }
                {hasError.error && <span className="error-msg">{hasError.msg}</span>}
            </form>

        </Card >
    )
}

export default FileForm