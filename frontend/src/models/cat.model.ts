export enum Sex {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export enum AdoptionStatus {
  Available = "Available",
  Pending = "Pending",
  Adopted = "Adopted"
}

export interface Cat {
  _id: string;
  birthDate: string;
  name: string;
  race: string;
  sex: Sex;
  city: string;
  description: string;
  photoUrl: string;
  adoptionStatus: AdoptionStatus;
}