import { Field, ID, InputType } from "type-graphql";

@InputType()
export default class AdInput {
    @Field(()=>String)
    title: string;

    @Field(()=>String, { nullable:true })
    description: string;

    @Field(()=>String, { nullable:true })
    author: string;

    @Field({ nullable:true })
    price: number;

    @Field(()=>String, { nullable:true })
    image?: string;

    @Field(()=>String,{ nullable:true })
    city: string;

    @Field(() => ID, { nullable:true })
    category: number;
    
    @Field(() => [ID],{ nullable:true })
    tags: number[];
}

@InputType()
export class AdFiltersInput {
    @Field(()=>ID, { nullable:true })
    categoryId?: number;
}