import React, { useState, useEffect, useRef } from 'react';

function Timer () {

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);
    const intervalId = useRef(null);
    const setRefTimer = useRef(0);

    useEffect (() => {
        if (isRunning) {
            intervalId.current = setInterval(() => {
                setTime(Date.now() - setRefTimer.current);
            }, 10)
        }
        return () => {
            clearInterval(intervalId.current);
        }
    }, [isRunning])

    function start () {
        setIsRunning(true);
        setRefTimer.current = Date.now() - time;
        console.log('start');
    }

    function stop () {
        setIsRunning(false);
        console.log('stop')
    }

    function reset () {
        setIsRunning(false);
        setTime(0);
        console.log('reset')
    }

    function formatTime () {
        
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let seconds = Math.floor((time / (1000) % 60));
        let milliseconds = Math.floor((time % 1000 / 10));

        function padZero (number) {
            return (number < 10 ? "0" : "") + number
        }

        return `${padZero(minutes)}:${padZero(seconds)}:${padZero(milliseconds)}`;
    }



    return (
        <div className='container'>
            <div className='box'>
                <span>{formatTime()}</span> <br />
                <button onClick={start} className='start-button'>Start</button>
                <button onClick={stop} className='stop-button'>Stop</button>
                <button onClick={reset} className='reset-button'>Reset</button>
            </div>
            
        </div>
    )
}

export default Timer