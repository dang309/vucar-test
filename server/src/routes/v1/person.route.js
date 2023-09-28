import { PersonController } from "../../controllers/index.js";
import auth from "../../middlewares/auth.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import PERSON_VALIDATION from "../../validations/person.validation.js";

const controller = new PersonController();

export default [
  {
    path: "/",
    method: "get",
    handler: controller.find,
    middlewares: [auth],
  },
  {
    path: "/count",
    method: "get",
    handler: controller.count,
    middlewares: [auth],
  },
  {
    path: "/",
    method: "post",
    handler: controller.create,
    middlewares: [auth, validate(PERSON_VALIDATION.create)],
  },
  {
    path: "/:id",
    method: "get",
    handler: controller.findOne,
    middlewares: [auth],
  },
  {
    path: "/:id",
    method: "patch",
    handler: controller.update,
    middlewares: [auth, validate(PERSON_VALIDATION.update)],
  },

  {
    path: "/:id",
    method: "delete",
    handler: controller.delete,
    middlewares: [auth, validate(PERSON_VALIDATION.delete)],
  },

  {
    path: "/",
    method: "delete",
    handler: controller.deleteMany,
    middlewares: [auth],
  },
];
