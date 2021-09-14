import {Schema} from 'mongoose';

export interface User {
    _id?: string;
    name: string;
    fullName: string;
    password: string;
    email: string;
}

const userSchema = new Schema({
    name: {type: Schema.Types.String, required: true},
    fullName: {type: Schema.Types.String, required: true},
    password: {type: Schema.Types.String, required: true},
    email: {type: Schema.Types.String, required: true},
});

export default userSchema;
