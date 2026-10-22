export type CardProductProps = {
    assessment?: number;
    available_stock?: number;
    from_price?: boolean;
    sku_count?: number;
    promotion?: {id: string; name: string} | null;
    original_price: number;
    title: string; 
    id: string;
    code: string
    image: string;
    current_price?: number;
    store: string
    liked?: boolean
}

export type ProductVariation = {
    id: string; sku: string; variation_value: string | null; image_url: string | null;
    price: number; current_price: number | null; stock: number;
    promotion?: {id: string; name: string} | null;
};

export type ProductInformationProps = {
    skus?: ProductVariation[];
    variation_type?: string | null;
    id: string
    assessment: number;
    stock: number;
    code: string;
    title: string;
    description: string;
    original_price: number | string;
    current_price?: number | null;
    available_stock?: number;
    from_price?: boolean;
    store?: string;
    brand?: string | null;
    images?: string[];
    image?: string;
    promotion?: {id: string; name: string} | null;
    category: string
}

export type CartItemProps = {
    image: string
    id: string
    title: string
    store: string
    price: number
    quantity: number
}