import { createContext, useContext, useEffect, useState } from "react";
import Toast from "./Toast";
import styles from "./notification.module.css"

export const ToastContext = createContext<any>(0);

export const ToastContextProvider = ({ children }: any) => {
    const [toasts, setToasts] = useState<any[]>([]);

    const addToast = (text: string) => {
        setToasts((toasts) => [...toasts, <Toast text={text} key={Math.random()} />])
    }

    useEffect(() => {
        console.log(toasts);

    }, [toasts])

    const contextValue = {
        addToast,
    }

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className={styles.toastContainer}>
                {toasts.map((toast) => toast)}
            </div>
        </ToastContext.Provider>
    );
};

export const useToastContext = () => {
    return useContext(ToastContext);
};
