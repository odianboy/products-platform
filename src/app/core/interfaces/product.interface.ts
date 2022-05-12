import { ProductImage } from "./image.interface";
export interface Product {
    name: string;
    brand: string;
    code: number;
    price: number;
    document?: any;
    image: ProductImage[];
    isActive: boolean;
}