import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import MainHeader from './components/layout/MainHeader'
import Layout from './components/layout/Layout'

// import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import UploadPage from './pages/UploadPage'
import AdminHeatmap from './pages/AdminHeatmap'
import Page404 from './pages/Page404'
import ProfileWrapper from './components/helpers/ProfileWrapper';

import { useContext, useState, useEffect } from 'react'
import AuthContext from './store/auth-context';

import axios from 'axios'

function App() {
  const authCtx = useContext(AuthContext)

  const [isAdmin, setisAdmin] = useState()

  useEffect(() => {
    axios.get('http://localhost:3000/auth/role', {
      headers: {
        Authorization: 'Bearer ' + authCtx.token,
      }
    }).then(res => { setisAdmin(res.data.role === 'Admin'); localStorage.setItem('isAdmin', (res.data.role === 'Admin')) })
  }, [authCtx])

  return (
    <>
      <MainHeader isAdmin={authCtx.isAdmin} />
      <Layout>

        <Routes>
          <Route path='/' element={<Navigate replace to='/profile' />} />

          {(authCtx.isLoggedIn && !isAdmin) && <Route path='/upload' element={<UploadPage />} />}

          <Route path='/auth'
            element={!authCtx.isLoggedIn
              ? < AuthPage />
              : <Navigate replace to='/profile' />} />

          <Route path='/profile'
            element={authCtx.isLoggedIn
              ? <ProfileWrapper />
              : <Navigate replace to='/auth' />} />

          <Route path='/heatmap'
            element={authCtx.isLoggedIn
              ? <AdminHeatmap />
              : <Navigate replace to='/auth' />} />

          <Route path='*' element={<Page404 />} />

        </Routes>
      </Layout>
    </>
  );
}

export default App;
