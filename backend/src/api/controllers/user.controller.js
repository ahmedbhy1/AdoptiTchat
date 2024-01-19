export default class UserController {
  static getUser(_, res) {
      res.status(200).json({ data: { email: "test" }});
  }
}