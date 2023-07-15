type todoType = {
    id: number;
    title: string;
    description: string | null;
    done: boolean;
    priority: number;
    created_at: string;
    modified_at: string;
    created_by: number;
    created_by_name: string;
    modified_by: number | null;
    modified_by_name: string | null;
    order: number;
}

type todoLinkType = {
    next: string | null;
    previous: string | null;
}

export type {todoType, todoLinkType};