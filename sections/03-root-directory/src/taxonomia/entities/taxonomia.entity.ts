import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

/**
 * A taxonomic entity representing a biological classification unit, such as a species, genus, family, etc.
 * It includes the scientific name, optional authorship information, and a list of common names in various languages.
 */
@Schema({ timestamps: true })
export class Taxonomia extends Document{
    @Prop({
        required: true,
        unique: true,
        index: true,
    })
    scientificName: string;
    @Prop({
        required: true,
        unique: true,
        index: true
    })
    taxonNo : number;
    @Prop()
    autorship?: string;

    @Prop({
    type: [{ name: String, language: String }],
    default: [], // array default empty
    })
    commonNames: { name: string; language: string }[];
}

export const TaxonomiaSchema = SchemaFactory.createForClass(Taxonomia)