import { Photo } from "../../product/services/photo";

export function genImage() {
    return Array.from({length: 10}, () => new Photo(''));
}