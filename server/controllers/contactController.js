import { User } from '../models/index.js';
import { sendContactMessage } from '../services/mailService.js';

// @desc    Send contact email to developer without exposing their email to frontend
// @route   POST /api/contact/:username
// @access  Public
export const sendContactEmail = async (req, res, next) => {
  try {
    const { username } = req.params;
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required fields.'
      });
    }

    // Find developer by username and retrieve their private email
    const developer = await User.findOne({ username: username.toLowerCase().trim() }).select('+email');
    if (!developer) {
      return res.status(404).json({
        success: false,
        message: 'Developer not found.'
      });
    }

    const emailResult = await sendContactMessage({
      recipientEmail: developer.email,
      developerName: developer.name,
      senderName: name.trim(),
      senderEmail: email.trim(),
      subject: subject ? subject.trim() : `New inquiry from ${name} via CodeFolio`,
      message: message.trim()
    });

    return res.status(200).json({
      success: true,
      message: 'Message delivered successfully to the developer.',
      previewUrl: emailResult.previewUrl || null
    });
  } catch (error) {
    next(error);
  }
};
