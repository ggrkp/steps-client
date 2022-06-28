import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import MainHeader from './components/layout/MainHeader'
import Layout from './components/layout/Layout'

import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'
import UploadPage from './pages/UploadPage'
import Page404 from './pages/Page404'

import { useContext } from 'react'
import AuthContext from './store/auth-context';
function App() {
  const authCtx = useContext(AuthContext)
  return (
    <>
      <MainHeader />
      <Layout>
        <Routes>

          <Route path='/' element={<Navigate replace to='/profile' />} />
          {(authCtx.isLoggedIn && !authCtx.isAdmin) && <Route path='/upload' element={<UploadPage />} />}
          <Route path='/auth'
            element={!authCtx.isLoggedIn
              ? < AuthPage />
              : <Navigate replace to='/profile' />} />

          <Route path='/profile'
            element={authCtx.isLoggedIn
              ? < ProfilePage />
              : <Navigate replace to='/auth' />} />

          <Route path='*' element={<Page404 />} />

        </Routes>
      </Layout>
    </>
  );
}

export default App;
