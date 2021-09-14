import {ObjectId, Schema} from 'mongoose';

export interface Product {
    _id: string;
    slug: string;
    name: string;
    description: string;
    mainImageUrl: string;
    extraImages: string[];
    createdAt: string;
    categoryIdList: ObjectId[];
    userId: ObjectId;
}

const productSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    slug: {type: Schema.Types.String, required: true},
    description: {type: Schema.Types.String, required: true},
    mainImageUrl: {type: Schema.Types.String, required: true},
    extraImages: {type: Schema.Types.Array, subtype: Schema.Types.String, required: true},
    createdAt: {type: Schema.Types.Date, required: true},
    categoryIdList: {type: Schema.Types.Array, subtype: Schema.Types.ObjectId, required: true},
    userId: {type: Schema.Types.ObjectId, required: true},
});

export default productSchema;
