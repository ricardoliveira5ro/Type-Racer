import './Alert.css'
import { ThumbsUp, CircleX, OctagonAlert, TriangleAlert } from 'lucide-react';

function Alert({ text, type, onDismissAlert }) {

    const alertIcon = (type) => {
        if (type === 'SUCCESS') return <ThumbsUp color='#166534' size={20} />
        if (type === 'WARNING') return <TriangleAlert color='#854D0E' size={20} />
        else return <OctagonAlert color='#991B1B' size={20} />
    }

    return (
        <div className={`alert-container flex w-1/4 justify-between items-center gap-x-2 px-6 py-4 mx-2 my-4 rounded-md text-sm bg-green-200
                        ${type === 'SUCCESS' ? 'bg-green-200 text-green-800' :
                            type === 'WARNING' ? 'bg-orange-200 text-yellow-800' :
                                'bg-red-200 text-red-800'}`}
                data-aos="zoom-in" data-aos-duration="800">
            <div className='flex items-center gap-x-2'>
                {alertIcon(type)}
                <span>{text}</span>
            </div>
            <CircleX color={`${type === 'SUCCESS' ? '#166534' :
                                type === 'WARNING' ? '#854D0E' :
                                                    '#991B1B'}`} 
                size={20} onClick={onDismissAlert} className='cursor-pointer' />
        </div>
    );
}

export default Alert;