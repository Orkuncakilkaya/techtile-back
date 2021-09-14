import {Schema} from 'mongoose';

export interface Category {
    _id: string;
    name: string;
    slug: string;
}

const categorySchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    slug: {type: Schema.Types.String, required: true},
});

export default categorySchema;
