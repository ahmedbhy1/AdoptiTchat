import mongoose from 'mongoose';

export const Sex = {
  Male: "Male",
  Female: "Female",
  Other: "Other",
};

export const AdoptionStatus = {
  Available: "Available",
  Pending: "Pending",
  Adopted: "Adopted"
};

const catSchema = new mongoose.Schema(
  {
    birthDate: String,
    name: String,
    race: String,
    sex: {
      type: String,
      enum: Object.values(Sex)
    },
    city: String,
    description: String,
    photoUrl: String,
    adoptionStatus: {
      type: String,
      enum: Object.values(AdoptionStatus)
    }
  });
  
export const Cat = mongoose.model('Cat', catSchema);