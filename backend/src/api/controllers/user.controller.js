import { ErrorResponse } from "../core/ErrorResponse.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { User } from "../models/User.js";
import { AdoptionStatus, Cat, Sex } from "../models/Cat.js"

export default class UserController {
  async getUser(req, res, next) {
    try {
      if (!req.params?.email) {
        throw ErrorResponse.badRequest();
      }
      const user = await User.findOne({ email: req.params.email }, { password: 0 });
      if (!user) {
        throw ErrorResponse.notFound();
      }

      res.status(HttpStatus.Ok).json({
        data: {
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            favoris: user.favorites,
            requestedForAdoption: user.requestedForAdoption,
            adopted: user.adopted
            
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async addCatToFavorisOfUser(req, res, next) {
    try {

      if (!req.params?.id || !req.body?.catId) {
        throw ErrorResponse.badRequest();
      }
  
      const userId = req.params.id;
      const catId = req.body.catId;
  
      const user = await User.findById(userId);
      if (!user) {
        throw ErrorResponse.notFound();
      }
  
      // Check if the cat is already in the user's favorites
      if (user.favorites.includes(catId)) {
        throw ErrorResponse.badRequest("Cat already in favorites");
      }
  
      // Add the cat to the user's favorites
      user.favorites.push(catId);
      
      // Save the updated user
      await user.save();
  
      res.status(HttpStatus.Ok).json({
        added: "Suceess",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          favoris: user.favorites
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCatFromFavorisOfUser(req, res, next) {
    try {
      
      if (!req.params?.id || !req.body?.catId) {
        throw ErrorResponse.badRequest();
      }
      const userId = req.params.id;
      const catId = req.body.catId;
  
      const user = await User.findById(userId);

      if (!user) {
        throw ErrorResponse.notFound("user not found");
      }
  
      // Check if the cat is in the user's favorites
      const catIndex = user.favorites.indexOf(catId);

      if (catIndex === -1) {
        throw ErrorResponse.notFound("Cat not found in favorites");
      }
  
      // Remove the cat from the user's favorites
      user.favorites.splice(catIndex, 1);
  
      // Save the updated user
      await user.save();
  
      res.status(HttpStatus.Ok).json({
        deleted: "Suceess",
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          favoris: user.favorites
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteCatsOfUser(req, res, next) {
    try {
      if (!req.params?.id) {
        throw ErrorResponse.badRequest();
      }
  
      const userId = req.params.id;
  
      const user = await User.findById(userId);
      if (!user) {
        throw ErrorResponse.notFound();
      }
  
      const favoriteCats = await Cat.find({ _id: { $in: user.favorites } });
  
      res.status(HttpStatus.Ok).json({
        data: {
          favoriteCats: favoriteCats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async requestCatAdoptionFromUser(req, res, next) {
    try {
      if (!req.params?.id) {
        throw ErrorResponse.badRequest();
      }
  
      const userId = req.params.id;
      
      const user = await User.findById(userId);
      if (!user) {
        throw ErrorResponse.notFound("user not found");
      }
      const catId = req.body.catId;

      const catToAdopt = await Cat.findOne({ _id: catId });
  
      if (!catToAdopt) {
        throw ErrorResponse.notFound("cat not found");
      }

      if (catToAdopt.adoptionStatus == 'Adopted'){
        throw ErrorResponse.badRequest("cat already adopted");
      }

      if (user.requestedForAdoption.includes(catId)){
        throw ErrorResponse.badRequest("user already requested for adopting this cat");
      }

      catToAdopt.adoptionStatus = AdoptionStatus.Pending;
      catToAdopt.sex = Sex.Other;
      await catToAdopt.save();

      // Add the cat to the user's favorites
      user.requestedForAdoption.push(catId);
      
        // Save the updated user
      await user.save();

      res.status(HttpStatus.Ok).json({
        data: {
          favoriteCats: favoriteCats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async countCatAdoptionRequests(req, res, next) {
    try {

      console.log("say hey !");
      
      if (!req.params?.id) {
        throw ErrorResponse.badRequest();
      }
      
      const catId = req.params.id;

      console.log("catId=",catId);

      const catToAdopt = await Cat.findOne({ _id: catId });

      console.log("catToAdopt=",catToAdopt);

      if (!catToAdopt) {
        throw ErrorResponse.notFound("cat not found");
      }

      if (catToAdopt.adoptionStatus == 'Adopted'){
        throw ErrorResponse.badRequest("cat already adopted");
      }
      
      const countCatInUsersReqForAdoption = await User.countDocuments({requestedForAdoption:catId});

      res.status(HttpStatus.Ok).json({
        data: {
          countCatInUsersReqForAdoption: countCatInUsersReqForAdoption
        }
      });
    } catch (error) {
      next(error);
    }
  }

}