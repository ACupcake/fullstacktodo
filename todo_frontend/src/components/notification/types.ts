interface IToast {
    text: string;
    error?: boolean;
}

interface INotification {
    text: string;
    error?: boolean;
}

export type { IToast, INotification }