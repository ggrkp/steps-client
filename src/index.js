import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context'
import { AdminContextProvider } from './store/admin-context'
import { UserContextProvider } from './store/user-context'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <UserContextProvider>
      <AdminContextProvider>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </AdminContextProvider >
    </UserContextProvider>
  </AuthContextProvider>
);


