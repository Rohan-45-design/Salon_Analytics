import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWorkingHour {
  day: number; // 0-6 (Sun-Sat)
  open: string; // HH:mm
  close: string; // HH:mm
  closed?: boolean;
}

export interface ISalon extends Document {
  name: string;
  address?: string;
  owner: mongoose.Types.ObjectId;
  workingHours: IWorkingHour[];
}

const WorkingHourSchema = new Schema<IWorkingHour>({
  day: { type: Number, required: true, min: 0, max: 6 },
  open: { type: String, required: true },
  close: { type: String, required: true },
  closed: { type: Boolean, default: false }
});

const SalonSchema = new Schema<ISalon>(
  {
    name: { type: String, required: true },
    address: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    workingHours: { type: [WorkingHourSchema], default: [] }
  },
  { timestamps: true }
);

export const Salon: Model<ISalon> = mongoose.model<ISalon>('Salon', SalonSchema);
