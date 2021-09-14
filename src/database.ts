import {Model, Mongoose} from 'mongoose';
import authSchema, {Auth} from './schemas/auth.schema';
import mongoose from 'mongoose';
import userSchema, {User} from './schemas/user.schema';
import categorySchema, {Category} from './schemas/category.schema';
import productSchema, {Product} from './schemas/product.schema';

export class Database {
    protected static instance: Database;
    protected db: Mongoose;
    public authModel: Model<Auth>;
    public userModel: Model<User>;
    public categoryModel: Model<Category>;
    public productModel: Model<Product>;

    constructor() {
        this.connectDatabase().then((db) => {
            this.db = db;
            this.authModel = this.db.model<Auth>('Auth', authSchema);
            this.userModel = this.db.model<User>('User', userSchema);
            this.categoryModel = this.db.model<Category>('Category', categorySchema);
            this.productModel = this.db.model<Product>('Product', productSchema);
        });
    }

    protected connectDatabase() {
        const [host, port, user, pass, name] = [
            process.env.DB_HOST, +process.env.DB_PORT, process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME,
        ];

        return new Promise<Mongoose>((resolve, reject) => {
            const connectionString = `mongodb://${host}:${port}/${name}`;
            mongoose.connect(connectionString, {
                user,
                pass,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }).then(database => {
                resolve(database);
            }).catch(err => {
                reject(err);
            });
        });
    }


    static getInstance() {
        if (!this.instance) {
            this.instance = new Database();
        }

        return this.instance;
    }
}
