import { Link, useNavigate } from "react-router-dom";
import { UserRound } from 'lucide-react';

import './Header.css'

function Header() {

    const navigate = useNavigate()

    return (
        <div className='flex justify-between items-center bg-white rounded-md px-5 py-3'>
            <Link to={'/home'} className='text-xl brand-title'>Type Racer</Link>
            <div className='flex items-center gap-x-5'>
                <UserRound onClick={() => navigate('/profile')} size={28} />
                <button onClick={() => navigate('/auth')} className='bg-[var(--green)] w-28 py-1 rounded-md'>Sign In</button>
                <button onClick={() => {}} className='bg-[var(--dark)] text-white w-28 py-1 rounded-md'>Logout</button>
            </div>
        </div>
    );
}

export default Header;