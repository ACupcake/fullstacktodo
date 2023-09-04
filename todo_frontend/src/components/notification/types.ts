interface IToast {
    text: string;
    error?: boolean;
    timer?: number;
}

interface INotification {
    text: string;
    error?: boolean;
    timer?: number;
}

export type { IToast, INotification }