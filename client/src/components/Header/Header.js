import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UsersAPI } from "../../api/usersAPI";
import { UserRound } from 'lucide-react';

import './Header.css'

function Header() {

    const navigate = useNavigate()

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const { success } = await UsersAPI.verifyToken();
                setIsAuthenticated(success);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        verifyToken()
    }, [])

    return (
        <div className='flex justify-between items-center bg-white rounded-md px-5 py-3 w-full'>
            <Link to={'/home'} className='text-xl brand-title'>Type Racer</Link>
            <div className='flex items-center gap-x-5'>
                {isAuthenticated ?
                    <Link to={'/profile'}><UserRound size={28} /></Link> 
                    :
                    <>
                        <button onClick={() => navigate('/auth')} className='bg-[var(--green)] w-28 py-1 rounded-md'>Sign In</button>
                        <button onClick={() => { }} className='bg-[var(--dark)] text-white w-28 py-1 rounded-md'>Logout</button>
                    </>    
                }
            </div>
        </div>
    );
}

export default Header;