import { useEffect, useState } from "react";

function CountUpTimer({ isRacing, setElapsedTime }) {

    const [time, setTime] = useState("00:00");

    const showTimer = (ms) => {
        const second = Math.floor((ms / 1000) % 60)
            .toString()
            .padStart(2, "0");
        const minute = Math.floor((ms / 1000 / 60) % 60)
            .toString()
            .padStart(2, "0");
        setTime(minute + ":" + second);
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