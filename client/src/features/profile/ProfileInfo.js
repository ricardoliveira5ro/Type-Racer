import './Profile.css'

function ProfileInfo() {

    return (
        <div className="flex flex-col justify-around items-center bg-white rounded-md p-7 w-fit gap-y-5">
            <div className='flex justify-between items-center gap-x-10 w-full'>
                <div className='flex items-center gap-x-6'>
                    <img src={require('../../assets/images/profile-helmet.webp')} alt='Avatar icon' />
                    <div className='flex flex-col'>
                        <span>ricardo5ro</span>
                        <span className='text-[var(--green)]'>Email: <span className='display-email'>ricardo@gmail.com</span></span>
                    </div>
                </div>
                <span className='text-3xl'>143.2 WPM</span>
            </div>
            <div className="flex flex-col">
                <ul className="profile-stats">
                    <li>Races: 12</li>
                    <li>Wins: 7</li>
                    <li>Accuracy: 97%</li>
                </ul>
                <div className='flex gap-x-4 mt-3'>
                    <div>
                        <p>Last 10 races</p>
                        <ul className="profile-stats">
                            <li>WPM: 156.7</li>
                            <li>Accuracy: 96%</li>
                        </ul>
                    </div>
                    <div>
                        <p>Best & Last</p>
                        <ul className="profile-stats">
                            <li>WPM: 159.7</li>
                            <li>WPM: 143.2</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo