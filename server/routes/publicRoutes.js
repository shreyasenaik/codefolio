import express from 'express';
import { getPublicUserByUsername } from '../controllers/publicController.js';

const router = express.Router();

// GET /api/users/:username -> Public aggregate portfolio data
router.get('/:username', getPublicUserByUsername);

export default router;
