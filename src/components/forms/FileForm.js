import styles from './Form.module.css'
import Card from '../layout/Card'

import { useRef, useState } from 'react'
import Snackbar from '../layout/Snackbar';
const FileForm = () => {
    const fileRef = useRef()

    const [selectedFile, setSelectedFile] = useState(null);
    const [showSnackbar, setShowSnackbar] = useState(false)

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Uploading...')
        setShowSnackbar(true)
        setTimeout(() => setShowSnackbar(false), 3000)
        console.log(selectedFile)
    }

    return (
        <Card Card className={styles['center-card']} >
            <Snackbar showBar={showSnackbar} snackText="File uploaded!" />
            <div className={styles["card-img"]}>
                <h1 className={styles['form-title']}>Upload File</h1>
                <h4 className={styles['form-title']}>Pick a json file and upload it.</h4>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#013237" fillOpacity="1" d="M0,224L30,192C60,160,120,96,180,101.3C240,107,300,181,360,176C420,171,480,85,540,48C600,11,660,21,720,53.3C780,85,840,139,900,144C960,149,1020,107,1080,74.7C1140,43,1200,21,1260,32C1320,43,1380,85,1410,106.7L1440,128L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path></svg>

            <form onSubmit={submitHandler} className={styles.form}>


                <label className="btn-primary    btn">
                    <input
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                        ref={fileRef}
                        type="file"
                        id="file"
                        name="filename" />
                    Browse files
                </label>

                {selectedFile &&
                    <>

                        <span>File: {selectedFile.name}</span> <br />
                        <span>Size: {(selectedFile.size / 1048576).toFixed(2) + " MB"}</span>
                    </>
                }
                <button disabled={!selectedFile} className="btn btn-secondary">Upload file</button>
            </form>
        </Card >
    )
}

export default FileForm