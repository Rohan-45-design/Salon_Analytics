import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRole } from '../types/roles';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  salon?: mongoose.Types.ObjectId;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ['OWNER', 'STAFF', 'ADMIN'], required: true },
    salon: { type: Schema.Types.ObjectId, ref: 'Salon' }
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this as IUser;
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
