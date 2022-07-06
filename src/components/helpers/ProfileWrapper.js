import { useState, useContext, useEffect } from 'react'
import DashBoardPage from '../../pages/DashBoardPage'
import ProfilePage from '../../pages/ProfilePage'
import AuthContext from '../../store/auth-context'
const ProfileWrapper = () => {
    const authCtx = useContext(AuthContext)
    return (
        <>
            {authCtx.isAdmin ? <DashBoardPage /> : <ProfilePage />}
        </>
    )
}

export default ProfileWrapper