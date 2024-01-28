import { Cat, Sex } from "../models/cat.model";

export interface CatsResponse {
  cats: Cat[];
}


export interface CatResponse {
  cat: Cat;
}

export interface FavouriteCatsIdsResponse {
  cats: string[];
}

export interface AddCatToFavourite {

}

export interface CatTOAdd {
  birthDate: string;
  name: string;
  race: string;
  sex: Sex;
  city: string;
  description: string;
}

export interface FavouriteCatsResponse {
  favourite: boolean;
}

export interface RequestedForAdoptionResponse {
  requested: boolean;
}

export interface User {
  _id: string;
  email: string;
}

export interface UsersResponse {
  usersRequestingAdoption: User[];
}