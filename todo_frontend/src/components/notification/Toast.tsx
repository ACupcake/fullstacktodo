import { useEffect, useState } from 'react';
import styles from './Toast.module.css';
import { IToast } from './types';

function Toast({ text, error = false }: IToast) {
    const [visible, setVisible] = useState<boolean>(true);
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>();

    const close = () => {
        setVisible(false);
    }

    const stopTimer = () => {
        clearTimeout(timeoutID);
    }

    const startTimer = () => {
        const timeout = setTimeout(() => setVisible(false), 5000);
        setTimeoutID(timeout);
        return timeout;
    }

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

    // TODO: add timer visualization

    return (
        <div
            className={styles.container}
            style={getStyle()}
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
    );
}

export default Toast;
