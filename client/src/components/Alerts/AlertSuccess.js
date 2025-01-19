import { ThumbsUp, CircleX } from 'lucide-react';

function AlertSuccess({ onDismissAlert }) {

    return (
        <div id='alert-success' className="flex w-1/4 justify-between items-center gap-x-2 px-6 py-4 mx-2 my-4 rounded-md text-sm bg-green-200" data-aos="zoom-in" data-aos-duration="800">
            <div className='flex gap-x-2'>
                <ThumbsUp color='#166534' size={20} />
                <span className="text-green-800">Your account has been saved.</span>
            </div>
            <CircleX color='#166534' size={20} onClick={onDismissAlert} className='cursor-pointer' />
        </div>
    );
}

export default AlertSuccess;