import { useEffect, useState } from "react";

function CountUpTimer({ isRacing }) {

    //const [start, setStart] = useState(false);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState("00:00:00");

    const initTime = new Date();

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

        const id = setInterval(() => {
            const left = count + (new Date() - initTime);
            setCount(left);
            showTimer(left);
            if (left <= 0) {
                setTime("00:00:00:00");
                clearInterval(id);
            }
        }, 1);
        return () => clearInterval(id);
    }, [isRacing]);

    return (
        <span>{time}</span>
    )
}

export default CountUpTimer