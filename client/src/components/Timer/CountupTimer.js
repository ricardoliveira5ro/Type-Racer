import { useEffect, useState } from "react";
import { timeFormat } from "../../utils/timeFormat";

function CountUpTimer({ isRacing, setElapsedTime }) {

    const [time, setTime] = useState("00:00");

    const showTimer = (ms) => {
        setTime(timeFormat(ms))
    };

    useEffect(() => {
        if (!isRacing) return;

        const initTime = new Date();

        const id = setInterval(() => {
            const left = new Date() - initTime;
            showTimer(left);
            setElapsedTime(left);
            if (left <= 0) {
                setTime("00:00:00:00");
                clearInterval(id);
            }
        }, 1);
        
        return () => clearInterval(id);
    }, [isRacing]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <span>{time}</span>
    )
}

export default CountUpTimer