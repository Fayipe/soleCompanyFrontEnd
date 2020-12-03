export class User {
    full_name: any;
    address: any;
    email: any;
    city: any;
    state: any;
    zip_code: any;
    dob: any;
    photo: any;
    products: Product[];
}

export interface Product {
    product_name: any;
    slug: any;
    product_price: any;
    product_currency: any;
}
