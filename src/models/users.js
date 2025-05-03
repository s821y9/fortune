import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: { type: String }, // YYYY-MM-DD
  createdAt: { type: Date, default: Date.now },
  fortunes: [
    {
      date: String,
      fortune: String,
      reflection: String,
      fulfilled: { type: Boolean, default: false }
    }
  ]
});

export default mongoose.models.User || mongoose.model('User', UserSchema);