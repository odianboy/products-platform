import { Photo } from "../../product/services/photo-form";

export function genImage() {
    return Array.from({length: 10}, () => new Photo(''));
}