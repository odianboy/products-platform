import { images as imageArray} from './image-data.const';
const photo = 'https://images.unsplash.com/photo-1516962126636-27ad087061cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'

const mockPhoto = {
    name: 'кроссовки-crater-remixa-TVwbvv.jpeg',
    url: photo,
    size: 79347,
    type: 'image/jpeg'
}

export const names = ['Шорты', 'Кеды', 'Кросовки', 'Футболка', 'Кепка', 'Брюки', 'Джинсы', 'Худи', 'Куртка', 'Носки'];
export const brands = ['Vans', 'Adidas', 'Nike', 'DC Shoes', 'Convers', 'Element', 'ES', 'Emerica', 'Dickies', 'Saucony'];
export const images: any = [].concat(imageArray);
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