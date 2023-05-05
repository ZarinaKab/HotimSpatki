import {User} from "../../layout/models";

interface InventoryStatus {
    label: string;
    value: string;
}


export interface Product {
    id?: string;
    name?: string;
    description?: string;
    price?: number;
    inventoryStatus?: InventoryStatus;
    category?: Category;
    image?: string;
    seller?: User;

}

export interface Category {
    id?:number;
    name: string;
}
