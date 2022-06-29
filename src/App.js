import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import MainHeader from './components/layout/MainHeader'
import Layout from './components/layout/Layout'

import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import UploadPage from './pages/UploadPage'
import DashBoardPage from './pages/DashBoardPage'
import Page404 from './pages/Page404'

import { useContext, useState, useEffect } from 'react'
import AuthContext from './store/auth-context';

import axios from 'axios'

function App() {
  const authCtx = useContext(AuthContext)

  const [role, setRole] = useState()

  useEffect(() => {
    axios.get('/auth/role', {
      headers: {
        Authorization: 'Bearer ' + authCtx.token,
      }
    }).then(res => { setRole(res.data.role); localStorage.setItem('isAdmin', (res.data.role === 'Admin')) })
  }, [authCtx])

  const isAdmin = role === 'Admin'

  return (
    <>
      <MainHeader role={role} />
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
              ? !isAdmin ? < ProfilePage /> : <DashBoardPage />
              : <Navigate replace to='/auth' />} />

          <Route path='*' element={<Page404 />} />

        </Routes>
      </Layout>
    </>
  );
}

export default App;
