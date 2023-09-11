import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  content: string;
  image: string;
 
}

const blogSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IBlog>('Blog', blogSchema);
