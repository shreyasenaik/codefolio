import express from 'express';
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All skill routes require authentication

router.route('/')
  .get(getSkills)
  .post(createSkill);

router.route('/:id')
  .put(updateSkill)
  .delete(deleteSkill);

export default router;
