import { Field, InputType } from "type-graphql";

@InputType()
export class TagInput {
    @Field()
    tagName: string;
}
