import mongoose, { Schema, Document, Model } from 'mongoose';

export type QueueStatus = 'WAITING' | 'SERVING' | 'DONE' | 'CANCELLED' | 'NO_SHOW';

export interface IQueueEntry extends Document {
  salon: mongoose.Types.ObjectId;
  customer: mongoose.Types.ObjectId;
  service: mongoose.Types.ObjectId;
  assignedStaff?: mongoose.Types.ObjectId;
  position: number;
  status: QueueStatus;
  etaMinutes?: number;
  startedAt?: Date;
  finishedAt?: Date;
}

const QueueEntrySchema = new Schema<IQueueEntry>(
  {
    salon: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
    assignedStaff: { type: Schema.Types.ObjectId, ref: 'Staff' },
    position: { type: Number, required: true, index: true },
    status: { type: String, enum: ['WAITING', 'SERVING', 'DONE', 'CANCELLED', 'NO_SHOW'], default: 'WAITING', index: true },
    etaMinutes: { type: Number },
    startedAt: { type: Date },
    finishedAt: { type: Date }
  },
  { timestamps: true }
);

export const QueueEntry: Model<IQueueEntry> = mongoose.model<IQueueEntry>('QueueEntry', QueueEntrySchema);
