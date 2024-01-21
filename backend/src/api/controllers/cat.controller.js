import { ErrorResponse } from "../core/ErrorResponse.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { AdoptionStatus, Cat } from "../models/Cat.js";
import { User } from "../models/User.js";

export default class CatController {
  async getCat(req, res, next) {
    try {
      if (!req.params?.id) {
        throw ErrorResponse.badRequest();
      }

      const cat = await Cat.findById(req.params?.id);

      if (!cat) {
        throw ErrorResponse.notFound();
      }

      res.status(HttpStatus.Ok).json({
        success: true,
        data: {
          cat: cat
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCat(req, res, next) {
    try {
      if (!req.params?.id ) {
        throw ErrorResponse.badRequest();
      }

      const cat = await Cat.findByIdAndUpdate(req.params?.id, req.body, { new: true});
      if (!cat) {
        throw ErrorResponse.notFound();
      }

      res.status(HttpStatus.Ok).json({
        data: {
          success: true,
          cat: cat
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getCats(_, res, next) {
    try {
      const cats = await Cat.find();
      res.status(HttpStatus.Ok).json({
        success: true,
        data: {
          cats
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async addCat(req, res, next) {
    try {
      if (!req.body) {
        throw ErrorResponse.badRequest();
      }

      const cat = await Cat.create(req.body);
      if (!cat) {
        throw new ErrorResponse.notFound();
      }


      res.status(HttpStatus.Ok).json({
        success: true,
        data: {
          cat
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCat(req, res, next) {
    try {
      if (!req.params?.id) {
        throw ErrorResponse.badRequest();
      }

      const cat = await Cat.findByIdAndDelete(req.params?.id);
      if (!cat) {
        throw new ErrorResponse.notFound();
      }

      res.status(HttpStatus.Ok).json({
        success : true,
        data: {
          cat
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async countCatAdoptionRequests(req, res, next) {
    try {
      const catId = req.params?.id;
      if (!catId) {
        throw ErrorResponse.badRequest();
      }
      
      const catToAdopt = await Cat.findOne({ _id: catId });
      if (!catToAdopt) {
        throw ErrorResponse.notFound("cat not found");
      }

      const countCatInUsersReqForAdoption = 
        catToAdopt.adoptionStatus === AdoptionStatus.Adopted
        ? 0
        : await User.countDocuments({requestedForAdoption:catId});

      res.status(HttpStatus.Ok).json({
        data: {
          countCatInUsersReqForAdoption: countCatInUsersReqForAdoption
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async approveAdoptionRequest(req, res, next) {
    try {
      if (!req.body?.catId || !req.body?.userId) {
        throw ErrorResponse.badRequest();
      }

      const { catId, userId } = req.body;
      const cat = await Cat.findById(catId);
      if (!cat) {
        throw ErrorResponse.notFound(`Couldn't find cat with id: ${catId}`);
      }
      
      if (cat.adoptionStatus === AdoptionStatus.Adopted) {
        throw ErrorResponse.badRequest('Cat is already adopted');
      }
      
      const user = await User.findById(userId);
      if (!user) {
        throw ErrorResponse.notFound(`Couldn't find user with id: ${userId}`);
      }

      // Update user and car in a transaction
      const session = await User.startSession();
      await session.withTransaction(async () => {
        user.requestedForAdoption = 
          user.requestedForAdoption.filter(existingCatId => existingCatId !== catId);
        user.adopted.push(catId);
        cat.adoptionStatus = AdoptionStatus.Adopted;
        await user.save();
        await cat.save();
        // Cleanup requests for the adopted cats in background
        await User.updateMany(
          { requestedForAdoption: catId },
          { 
            $pull: {
              requestedForAdoption: catId,
            }
          });
      });

      res.status(HttpStatus.Ok).json({ success: true });
    }
    catch(error) {
      next(error);
    }
  }
}