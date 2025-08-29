import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  salon: mongoose.Types.ObjectId;
  name: string;
  durationMinutes: number;
  price: number;
  active: boolean;
}

const ServiceSchema = new Schema<IService>(
  {
    salon: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Service: Model<IService> = mongoose.model<IService>('Service', ServiceSchema);
