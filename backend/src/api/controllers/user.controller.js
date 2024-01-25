import { ErrorResponse } from "../core/ErrorResponse.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { User } from "../models/User.js";
import { AdoptionStatus, Cat } from "../models/Cat.js"

export default class UserController {
  async getUsers(_req, res, next) {
    try {
      const users = await User.find({}, { password: 0 });

      res.status(HttpStatus.Ok).json({
        data: {
          users: users
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async checkIfFavourite(req,res,next){
    try {
      const catId = req.params.catIs;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }
      var isFavourites = false
      const user = req.user;
      if (user.favorites.includes(catId)) {
        isFavourites = true;
      }
      res.status(HttpStatus.Ok).json({
        data: {
          favourite: isFavourites
        }});    
    }
    catch (error) {
      next(error);
    }
  }

  async checkIfRequestedForAdoption(req,res,next){
    try {
      const catId = req.params.catIs;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }
      var requested = false
      const user = req.user;
      console.log("user=",user);
      console.log("catID=",catId);
      if (user.requestedForAdoption && user.requestedForAdoption.includes(catId)) {
        requested = true;
      }
      res.status(HttpStatus.Ok).json({
        data: {
          requested: requested
        }});    
    }
    catch (error) {
      next(error);
    }
  }

  async addCatToUserFavorites(req, res, next) {
    try {
      const catId = req.body?.catId;
      if (!catId) {
        throw ErrorResponse.badRequest();
      } 

      const user = req.user;
    
      // Check if the cat is already in the user's favorites
      if (user.favorites.includes(catId)) {
        throw ErrorResponse.badRequest("Cat already in favorites");
      }
  
      // Add the cat to the user's favorites
      user.favorites.push(catId);
      
      // Save the updated user
      await user.save();
  
      res.status(HttpStatus.Ok).json({
        success: true,
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
      const catId = req.body?.catId;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }
      const user = req.user;
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
        success: true,
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

  async getUserFavoriteCats(req, res, next) {
    try {
      const user = req.user;
      const favoriteCats = await Cat.find({ _id: { $in: user.favorites } });
      res.status(HttpStatus.Ok).json({
        data: {
          cats: favoriteCats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserFavoriteCatsIds(req, res, next) {
    try {
      const user = req.user;
      res.status(HttpStatus.Ok).json({
        data: {
          cats : user.favorites
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async requestCatAdoptionFromUser(req, res, next) {
    try {
      const catId = req.body?.catId;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }

      const catToAdopt = await Cat.findOne({ _id: catId });
      if (!catToAdopt) {
        throw ErrorResponse.notFound("cat not found");
      }

      if (catToAdopt.adoptionStatus === AdoptionStatus.Adopted){
        throw ErrorResponse.badRequest("cat already adopted");
      }

      const user = req.user;
      console.log("user=",user);
      if (user.requestedForAdoption.includes(catId)){
        throw ErrorResponse.badRequest("user already requested for adopting this cat");
      }

      catToAdopt.adoptionStatus = AdoptionStatus.Pending;
      await catToAdopt.save();

      // Add the cat to the user's favorites
      user.requestedForAdoption.push(catId);
      
        // Save the updated user
      await user.save();

      res.status(HttpStatus.Ok).json({
        success: true,
        data: {
          cats: user.requestedForAdoption
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelCatAdoptionFromUser(req, res, next) {
    try {
      const catId = req.body?.catId;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }

      const cat = await Cat.findById(catId);
      if (!cat) {
        throw ErrorResponse.notFound("Cat not found");
      }

      const user = req.user;
      if (!user.requestedForAdoption.includes(catId)){
        throw ErrorResponse.badRequest("user does not have a pending adoption request for this cat");
      }

      // Remove the cat to the user's requestedForAdoption
      user.requestedForAdoption = user.requestedForAdoption.filter(requestId => catId != requestId);
      
      // Save the updated user
      await user.save();

      const countOfCatAdoptionRequests = await User.countDocuments({requestedForAdoption:catId});
      if (countOfCatAdoptionRequests === 0) {
        cat.adoptionStatus = AdoptionStatus.Available;
        await cat.save();
      }

      res.status(HttpStatus.Ok).json({
        success: true,
        data: {
          cats: user.requestedForAdoption
        }
      });
    } catch (error) {
      next(error);
    }
  }
}