import { Category } from "./Category";

export type Ad = {
    id: number;
    title: string;
    author:string;
    description:string;
    price:string;
    link: string;
    image: string;
    category: Category;
    // tags:Number[];
    tags: { id: number, tagName: string }[]; 
    createdAt: Date;
    city: string;
}