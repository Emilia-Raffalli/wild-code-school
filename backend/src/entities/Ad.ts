import { 
    BaseEntity, 
    Column, Entity, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
} from "typeorm";

import { Category } from "./Category";
import { Tag } from "./Tag";
import { Field, Float, ID, ObjectType } from "type-graphql";
  
@Entity()
@ObjectType()
export class Ad extends BaseEntity {

    @PrimaryGeneratedColumn()
    @Field(()=>ID)
    id: number;

    @Column({ length: 100 })
    @Field(()=>String)
    title: string;

    @Column("text") 
    @Field(()=>String)
    description: string;

    @Column({ length: 255 })
    @Field(()=>String)
    author: string;

    @Column()
    @Field(() =>Float)
    price: number;

    @Column({ default: "" })
    @Field(()=>String)
    image: string;

    @Column()
    @Field(()=>String)
    city: string;

    // @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    @Field()
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.ads, { nullable: false, eager:true })
    @Field(()=> Category)
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, {
        eager:true
    }) 
    @JoinTable({
        name: "ads_tags", 
        joinColumns: [{ name: "ad_id" }], 
        inverseJoinColumns: [{ name: "tag_id" }]
    })
    @Field(() => [Tag])
    tags?: Tag[];
}
