import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';

import MainHeader from './components/layout/MainHeader'
import Layout from './components/layout/Layout'

import Welcome from './pages/Welcome'
import Signup from './pages/Signup'
import Login from './pages/Login'


function App() {
  return (
    <>
      <MainHeader />
      <Layout>
        <Routes>
          <Route path='/' element={<Navigate replace to='/welcome' />} />
          <Route path='/welcome' element={<Welcome />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
