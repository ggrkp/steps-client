import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import MainHeader from './components/layout/MainHeader'
import Layout from './components/layout/Layout'

import ProfilePage from './pages/ProfilePage'
import AuthPage from './pages/AuthPage'


function App() {
  return (
    <>
      <MainHeader />
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/auth' />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
