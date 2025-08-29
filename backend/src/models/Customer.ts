import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICustomer extends Document {
  salon: mongoose.Types.ObjectId;
  name: string;
  phone?: string;
  email?: string;
  notes?: string;
  isWalkIn: boolean;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    salon: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    notes: { type: String },
    isWalkIn: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Customer: Model<ICustomer> = mongoose.model<ICustomer>('Customer', CustomerSchema);
