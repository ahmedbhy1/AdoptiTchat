import mongoose from 'mongoose';

export const Sex = {
  Male: 0,
  Female: 1,
  Other: 2
};

export const AdoptionStatus = {
  Available: 0,
  Pending: 1,
  Adopted: 2
};

const catSchema = new mongoose.Schema(
  {
    birthDate: String,
    name: String,
    race: String,
    sex: {
      type: Number,
      enum: Object.values(Sex)
    },
    city: String,
    description: String,
    photoUrl: String,
    adoptionStatus: {
      type: Number,
      enum: Object.values(AdoptionStatus)
    }
  });
  
export const Cat = mongoose.model('Cat', catSchema);