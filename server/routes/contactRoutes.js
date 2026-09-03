import express from 'express';
import { sendContactEmail } from '../controllers/contactController.js';

const router = express.Router();

// POST /api/contact/:username -> Send email to developer without exposing email
router.post('/:username', sendContactEmail);

export default router;
