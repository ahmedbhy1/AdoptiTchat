import { ErrorResponse } from "../core/ErrorResponse.js";
import { HttpStatus } from "../core/HttpStatus.js";
import { Cat } from "../models/Cat.js";

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

      const cat = await Cat.findById(req.params?.id);
      
      await Cat.findByIdAndUpdate(req.params?.id, req.body);
      
  
      if (!cat) {
        throw ErrorResponse.notFound();
      }
      res.status(HttpStatus.Ok).json({
        data: {
          updated: "Suceess",
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
        added: "Suceess",
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
        deleted : "success",
        data: {
          cat
        }
      });
    } catch (error) {
      next(error);
    }
  }
}