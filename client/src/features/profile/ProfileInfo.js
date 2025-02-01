import './Profile.css'

function ProfileInfo() {

    return (
        <div className="flex justify-around items-center bg-white rounded-md px-5 py-3 w-fit">
            <div className='flex justify-between items-center gap-x-10 w-full'>
                <div className='flex items-center gap-x-6'>
                    <img src={require('../../assets/images/profile-helmet.webp')} alt='Avatar icon' />
                    <div className='flex flex-col'>
                        <span>ricardo5ro</span>
                        <span className='text-[var(--green)]'>Email: <span className='display-email'>ricardo@gmail.com</span></span>
                    </div>
                </div>
                <span className='text-3xl'>0 WPM</span>
            </div>
        </div>
    )
}

export default ProfileInfo