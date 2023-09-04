import { createContext, useContext, useEffect, useState } from "react";
import Toast from "./Toast";
import styles from "./notification.module.css"

export const ToastContext = createContext<any>(0);

export const ToastContextProvider = ({ children }: any) => {
    const [toasts, setToasts] = useState<any[]>([]);

    const addToast = (text: string) => {
        const newToast = <Toast text={text} key={Math.random()} />;
        setToasts((toasts) => [...toasts, newToast]);
    }

    useEffect(() => {
        return () => {
            setToasts([]);
        }
    }, [])

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
