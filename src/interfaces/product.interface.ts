export interface BaseProduct {
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface Product extends BaseProduct {
    _id: string;
}