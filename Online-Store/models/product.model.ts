export interface Product{
    id:number;
    name:string;
    price:number;
    rating:number;
    images:string[];
    url:string;
    likes:number;
    currentImageIndex?:number;
}