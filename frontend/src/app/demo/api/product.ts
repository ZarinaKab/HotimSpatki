interface InventoryStatus {
    label: string;
    value: string;
}


// My tables
export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
}

export interface Categories {
    id?: number;
    name?:string;
}

export interface Users {
    id?: number;
    username?: string;
    password?:string;
}
