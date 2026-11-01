import { Router } from "express";

import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserStatus
} from "../controllers/user.controllers.js";

import validate from "../middlewares/validate.middleware.js";

import {
  validateCreateUser,
  validateUpdateUser,
  validateUserStatus
} from "../validators/user.validators.js";

const router = Router();


// CREATE USER
router.post(
  "/",
  validate(validateCreateUser),
  createUser
);


// GET ALL USERS
router.get(
  "/",
  getUsers
);


// GET USER BY ID
router.get(
  "/:id",
  getUserById
);


// UPDATE USER
router.patch(
  "/:id",
  validate(validateUpdateUser),
  updateUser
);


// DELETE USER
router.delete(
  "/:id",
  deleteUser
);


// UPDATE USER STATUS
router.patch(
  "/:id/status",
  validate(validateUserStatus),
  updateUserStatus
);


export default router;