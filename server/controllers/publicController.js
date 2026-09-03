import { User, Project, Skill } from '../models/index.js';

// @desc    Get aggregate public portfolio data by username
// @route   GET /api/users/:username
// @access  Public
export const getPublicUserByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: 'Username parameter is required.'
      });
    }

    const cleanUsername = username.toLowerCase().trim();

    // Find user by vanity username, selecting only public-safe fields
    const user = await User.findOne({ username: cleanUsername }).select(
      'name username title bio avatarUrl resumeUrl socialLinks templateId isPro customDomain createdAt'
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `Developer portfolio for '@${cleanUsername}' was not found.`
      });
    }

    // Fetch projects and skills concurrently for single-roundtrip performance
    const [projects, skills] = await Promise.all([
      Project.find({ userId: user._id }).sort({ featured: -1, order: 1, createdAt: -1 }),
      Skill.find({ userId: user._id }).sort({ category: 1, order: 1, createdAt: 1 })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          username: user.username,
          title: user.title,
          bio: user.bio,
          avatarUrl: user.avatarUrl,
          resumeUrl: user.resumeUrl,
          socialLinks: user.socialLinks,
          templateId: user.templateId || 'minimalist',
          isPro: Boolean(user.isPro),
          customDomain: user.customDomain,
          createdAt: user.createdAt
        },
        projects,
        skills
      }
    });
  } catch (error) {
    next(error);
  }
};
