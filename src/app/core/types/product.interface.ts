import { IProductImage } from "./image.interface";
export interface IProduct {
    name: string;
    brand: string;
    code: number;
    price: number;
    document?: any;
    images: IProductImage[];
    isActive: boolean;
}