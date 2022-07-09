import DashBoard from '../components/admin/DashBoard'
import { useContext, useState } from 'react'
import Loader from '../components/layout/Loader'
import AdminContext from '../store/admin-context'
import AuthContext from '../store/auth-context'


const DashBoardPage = () => {
    // Add backend isAdmin verification middleware before requests.
    const adminCtx = useContext(AdminContext)
    const authCtx = useContext(AuthContext)

    const monthlyData = adminCtx.monthlyData
    const perUserData = adminCtx.perUserData
    const dailyData = adminCtx.dailyData
    const yearlyData = adminCtx.yearlyData
    const typePercentage = adminCtx.typePercentage
    
    const refreshHandler = () => {
       
        adminCtx.fetchDashData(authCtx.token)
        adminCtx.fetchMapData(authCtx.token)
        
    }


    return (<>
        {!adminCtx.fetching ?
            <DashBoard
                refreshData={refreshHandler}
                monthlyData={monthlyData}
                perUserData={perUserData}
                dailyData={dailyData}
                yearlyData={yearlyData}
                typePercentage={typePercentage}
            />
            :
            <>
                <Loader size={64} />
            </>
        }
    </>

    )
}

export default DashBoardPage