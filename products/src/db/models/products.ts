import mongoose, { Document, Schema, model, Model } from 'mongoose'


export interface Product {
  name: string;
}

// Schema
const ProductSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  brand: {
    type: String,
    required: false
  },
  color: {
    type: String,
    required: false
  },
})

interface ProductBaseDocument extends Product, Document {
  name: string;
  price: number;
  brand: string;
  color: string;
}

export interface ProductDocument extends ProductBaseDocument {
}
export interface ProductModel extends Model<ProductDocument> {
}

export default model<ProductDocument, ProductModel>('products', ProductSchema)
