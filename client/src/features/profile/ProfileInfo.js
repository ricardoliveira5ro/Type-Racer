import './Profile.css'

function ProfileInfo({ userInfo }) {

    return (
        <div className="flex flex-col justify-around items-center bg-white rounded-md p-7 w-fit gap-y-5">
            <div className='flex justify-between items-center gap-x-10 w-full'>
                <div className='flex items-center gap-x-6'>
                    <img src={require('../../assets/images/profile-helmet.webp')} alt='Avatar icon' />
                    <div className='flex flex-col'>
                        <span>{userInfo.username}</span>
                        <span className='text-[var(--green)]'>Email: <span className='display-email'>{userInfo.email}</span></span>
                    </div>
                </div>
                <p className='text-lg'><span className='text-3xl'>{userInfo.wpm}</span> WPM</p>
            </div>
            <div className="flex flex-col">
                <ul className="profile-stats">
                    <li>Races: {userInfo.races}</li>
                    <li>Wins: {userInfo.wins}</li>
                    <li>Accuracy: {userInfo.accuracy}%</li>
                </ul>
                <div className='flex gap-x-4 mt-3'>
                    <div>
                        <p>Last 10 races</p>
                        <ul className="profile-stats">
                            <li>WPM: {userInfo.wpmLast10Races}</li>
                            <li>Accuracy: {userInfo.accuracyLast10Races}%</li>
                        </ul>
                    </div>
                    <div>
                        <p>Best & Last</p>
                        <ul className="profile-stats">
                            <li>WPM: {userInfo.bestRaceWPM}</li>
                            <li>WPM: {userInfo.lastRaceWPM}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo