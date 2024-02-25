import { Schema, model, models } from "mongoose";
import { Document } from 'mongodb';

export interface IImage extends Document {
    title: string;
    transformationType: string;
    publicId: string;
    secureURL: string;
    width?: number;
    height?: number;
    config?: object;
    transformationUrl?: string;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author?: {
        _id: string;
        firsName:string;
        lastName:string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}


const ImageSchema = new Schema({
    title: {type:String,required:true},
    transformationType:{type:String,required:true},
    publicId: {type:String,required:true},
    secureURL: {type:String,required:true},
    width: Number,
    height: Number,
    config:Object,
    transformationUrl: {type:String},
    AspectRatio: {type:String},
    color:{type:String},
    prompt: {type:String},
    author: {type:String},
    createdAt: {type:Date,default:Date.now},
    updatedAt: {type:Date,default:Date.now}

})

const Image = models?.Image || model("Image",ImageSchema)

export default Image;