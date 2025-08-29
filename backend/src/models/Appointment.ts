import mongoose, { Schema, Document, Model } from 'mongoose';

export type AppointmentStatus = 'BOOKED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED' | 'NO_SHOW';

export interface IAppointment extends Document {
  salon: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  staff?: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  notes?: string;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    salon: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    staff: { type: Schema.Types.ObjectId, ref: 'Staff' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: { type: String, enum: ['BOOKED', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'], default: 'BOOKED', index: true },
    notes: { type: String }
  },
  { timestamps: true }
);

export const Appointment: Model<IAppointment> = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
