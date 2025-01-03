function Header() {
    return (
        <div className='w-100 px-10 py-5'>
            <div className='flex justify-between items-center bg-white rounded-md px-5 py-3'>
                <span className='text-lg'>Type Racer</span>
                <div className='flex gap-x-4'>
                    <button className='bg-[var(--dark)] text-white w-28 py-1 rounded-md'>Login</button>
                    <button className='bg-[var(--green)] w-28 py-1 rounded-md'>Sign Up</button>
                </div>
            </div>
        </div>
    );
}

export default Header;