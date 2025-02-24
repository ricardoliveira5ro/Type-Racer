import { useEffect, useState } from 'react';

import './CountdownTime.css'

function Light({ backgroundColor }) {
    return (
        <div
            aria-hidden={true}
            className="traffic-light"
            style={{ backgroundColor }}
        />
    );
}

function TrafficLight({
    initialColor = 'red',
    config,
    layout = 'vertical',
}) {
    const [currentColor, setCurrentColor] =
        useState(initialColor);

    useEffect(() => {
        if (!config[currentColor]) return;

        const { duration, next } = config[currentColor];

        if (next) {
            const timerId = setTimeout(() => {
                setCurrentColor(next);
            }, duration);

            return () => clearTimeout(timerId);
        }
    }, [currentColor, config]);

    return (
        <div
            aria-live="polite"
            aria-label={`Current light: ${currentColor}`}
            className={[
                'traffic-light-container',
                layout === 'vertical' &&
                'traffic-light-container--vertical',
            ]
                .filter((cls) => !!cls)
                .join(' ')}>
            {Object.keys(config).map((color) => (
                <Light
                    key={color}
                    backgroundColor={
                        color === currentColor
                            ? config[color].backgroundColor
                            : undefined
                    }
                />
            ))}
        </div>
    );
}

const config = {
    red: {
        backgroundColor: 'red',
        duration: 10000,
        next: 'yellow',
    },
    yellow: {
        backgroundColor: 'yellow',
        duration: 5000,
        next: 'green',
    },
    green: {
        backgroundColor: 'green',
        duration: 1000,
        next: null,
    },
};

// Code by: https://www.greatfrontend.com/questions/user-interface/traffic-light/solution

function CountDownTimer() {

    return (
        <div className='absolute z-50 left-1/2 top-1/3 text-center'>
            <div className="wrapper">
                <TrafficLight config={config} />
            </div>
        </div>
    )
}

export default CountDownTimer