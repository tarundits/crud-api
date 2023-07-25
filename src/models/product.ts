import { ObjectId } from "mongodb";

export default class ProductMdl {
    constructor(
        public name: string, 
        public price: number, 
        public description: string, 
        public image: string,
        public _id?: ObjectId
    ) {}
}