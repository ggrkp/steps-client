import { useContext, useEffect } from 'react'

import UserContext from '../store/user-context'
import AuthContext from '../store/auth-context'

import UserDashBoard from '../components/user/UserDashBoard';
import Loader from '../components/layout/Loader';

const ProfilePage = () => {
    // const stringifyNumber = require('../utils/numToStr.js')
    const userCtx = useContext(UserContext)
    const authCtx = useContext(AuthContext)
    const fetchUserDataHandler = () => {
        userCtx.fetchUserData(authCtx.token) 
    }

    const {
        leaderScores,
        userRank,
        totalScore,
        monthlyScores,
        formattedOldestDate,
        formattedLatestDate
    } = userCtx

    return (<>
        {!userCtx.userFetching ?
            <UserDashBoard
                fetchUserData={fetchUserDataHandler}
                leaderScores={leaderScores}
                userRank={userRank}
                totalScore={totalScore}
                formattedOldestDate={formattedOldestDate}
                formattedLatestDate={formattedLatestDate}
                monthlyScores={monthlyScores}
            />
            :
            <>
                <Loader size={64} />
            </>
        }
    </>
    )
}

export default ProfilePage