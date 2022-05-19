import { genImage } from './image-data.const';
const image = 'https://images.unsplash.com/photo-1516962126636-27ad087061cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const mockPhoto = {
    name: 'кроссовки-crater-remixa-TVwbvv.jpeg',
    url: image,
    size: 79347,
    type: 'image/jpeg'
}

export const noImage = 'https://images.unsplash.com/photo-1501951653466-8df816debe46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80';
export const names = ['Шорты', 'Кеды', 'Кросовки', 'Футболка', 'Кепка', 'Брюки', 'Джинсы', 'Худи', 'Куртка', 'Носки'];
export const brands = ['Vans', 'Adidas', 'Nike', 'DC Shoes', 'Convers', 'Element', 'ES', 'Emerica', 'Dickies', 'Saucony'];
export const images: any = [].concat( genImage() as [] );
images.splice(0, 1, mockPhoto);

export const document = 
    {
        name: 'document.pdf',
        lastModified: 1651125610136,
        lastModifiedDate: 'Thu Apr 28 2022 09:00:10 GMT+0300 (Москва, стандартное время)',
        webkitRelativePath: '',
        size: 38329,
        type: "application/pdf"
    }