import { Photo } from "../services/photo";

export function genImage() {
    return Array.from({length: 10}, () => new Photo(''));
}