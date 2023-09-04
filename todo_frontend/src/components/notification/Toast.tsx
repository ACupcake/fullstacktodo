import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { IToast } from './types';

function Toast({ text, error = false, timer = 5000 }: IToast) {
    const [visible, setVisible] = useState<boolean>(true);
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();
    const [counter, setCounter] = useState<number>(timer);
    const [intervalID, setIntervalID] = useState<NodeJS.Timer>();

    const close = () => {
        stopTimer();
        setVisible(false);
    }

    const stopTimer = () => {
        clearTimeout(timeoutID);
        clearInterval(intervalID);
    }

    const startTimer = () => {
        const timeout = setTimeout(() => setVisible(false), counter);
        setTimeoutID(timeout);
        setCounter((cnt) => cnt - 10);
        return timeout;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((cnt) => cnt - 10);
        }, 10);

        setIntervalID(interval);

        return () => clearInterval(interval);
    }, [counter]);

    const getStyle = () => {
        const display = !visible ? { display: "none" } : {};

        return {
            ...display,
        }
    }

    useEffect(() => {
        const timeout = startTimer();
        return () => {
            clearTimeout(timeout);
        };
    }, [])

    // TODO: add transition

    return (
        <div className={styles.container} style={getStyle()}>
            <div
                className={styles.contentContainer}
                onMouseEnter={() => stopTimer()}
                onMouseLeave={() => startTimer()}
            >
                <div className={styles.close}>
                    <div className={styles.closeIcon} onClick={() => close()}>
                        x
                    </div>
                </div>
                <div className={styles.textContainer}>
                    {text}
                </div>
            </div>
            <div className={styles.progressBar} style={{ width: `${(counter / timer) * 100}%` }} />
        </div>
    );
}

export default Toast;
