import React, { useEffect } from "react";
import { useState } from "react";

interface Prop {
    dateInit: Date;
    dateEnd?: Date;
    timeEndAction: Function;
}


export default function CountDown({ dateInit, dateEnd, timeEndAction }: Prop) {
    const countDownDate = new Date(dateInit).getTime();

    const [countDown, setCountDown] = useState(
        countDownDate - new Date().getTime() > 0 ? countDownDate - new Date().getTime() : 0
    );

    const [hour, setHour] = useState<number>(0);
    const [minute, setMinute] = useState<number>(0);
    const [second, setSecond] = useState<number>(0);

    const getReturnValues = (countDown: number) => {
        // calculate time left
        const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

        return [days, hours, minutes, seconds];
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDownDate - new Date().getTime() > 0) {
                setCountDown(countDownDate - new Date().getTime());
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [countDownDate]);

    useEffect(() => {
        let [day, hour, minute, second] = getReturnValues(countDown);
        setHour(hour);
        setMinute(minute);
        setSecond(second);
    }, [countDown]);

    return (
        <div className=" text-lg">
            {(hour != 0 || minute != 0 || second != 0) ?
                (
                    <><span className="text-imageLight">{hour}</span> : <span className="text-imageLight">{minute}</span> : <span className="text-imageLight">{second}</span></>
                ) :
                (
                    <span className=" text-imageLight">Already to mint!</span>
                )
            }
        </div>
    );
}