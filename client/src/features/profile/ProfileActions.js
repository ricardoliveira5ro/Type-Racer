import { LogOut, KeyRound } from 'lucide-react';

function ProfileActions({ onLogout, onPasswordChange }) {

    return (
        <div className='flex gap-x-4 mt-5 justify-between px-2'>
            <button onClick={(e) => onLogout(e)} className='flex items-center text-red-600 gap-x-1'><LogOut size={24} color='#dc2626' />Logout</button>
            <button onClick={() => onPasswordChange()} className='flex items-center text-white underline gap-x-1'><KeyRound size={24} />Change Password</button>
        </div>
    )
}

export default ProfileActions