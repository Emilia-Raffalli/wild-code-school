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
  
@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column("text") 
    description: string;

    @Column({ length: 255 })
    author: string;

    @Column()
    price: number;

    @Column({ default: "" })
    image: string;

    @Column()
    city: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(() => Category, (category) => category.ads, { nullable: false, eager:true })
    category: Category;

    @ManyToMany(() => Tag, (tag) => tag.ads, {
        eager:true
    }) 
    @JoinTable({
        name: "ads_tags", 
        joinColumns: [{ name: "ad_id" }], 
        inverseJoinColumns: [{ name: "tag_id" }]
    })
    tags: Tag[];
}
