import express from 'express';
import loginValidator from '../middlewares/Validations/loginValidator.js';
import createUserValidator from '../middlewares/Validations/createUserValidator.js';
import { login, register } from "../controllers/Auth.js";

const router = express.Router();

router.post('/login', loginValidator, login)
router.post('/register', createUserValidator, register)

export default router;