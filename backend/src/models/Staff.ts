import mongoose, { Schema, Document, Model } from 'mongoose';

export type StaffStatus = 'IDLE' | 'BUSY' | 'OFFLINE';

export interface IStaff extends Document {
  salon: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId; // references User with role STAFF
  specialties: mongoose.Types.ObjectId[]; // Service ids
  status: StaffStatus;
  isActive: boolean;
  currentQueueEntry?: mongoose.Types.ObjectId;
}

const StaffSchema = new Schema<IStaff>(
  {
    salon: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialties: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    status: { type: String, enum: ['IDLE', 'BUSY', 'OFFLINE'], default: 'OFFLINE', index: true },
    isActive: { type: Boolean, default: true },
    currentQueueEntry: { type: Schema.Types.ObjectId, ref: 'QueueEntry' }
  },
  { timestamps: true }
);

export const Staff: Model<IStaff> = mongoose.model<IStaff>('Staff', StaffSchema);
