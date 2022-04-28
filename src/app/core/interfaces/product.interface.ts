import { Image } from "./image.interface";
export interface Product {
    name: string;
    brand: string;
    price: number;
    document?: File;
    image: Image[];
    isActive: boolean;
}