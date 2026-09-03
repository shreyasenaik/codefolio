import { User } from '../models/index.js';
import { TEMPLATE_IDS } from '../config/constants.js';

// @desc    Get current user profile
// @route   GET /api/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    return res.status(200).json({
      success: true,
      profile: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update current user profile
// @route   PUT /api/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const {
      name,
      username,
      title,
      bio,
      avatarUrl,
      resumeUrl,
      socialLinks,
      templateId,
      isPro,
      customDomain,
      sectionConfig,
      sectionTitles
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // If username is changing, check uniqueness
    if (username && username.toLowerCase().trim() !== user.username) {
      const cleanUsername = username.toLowerCase().trim();
      const existing = await User.findOne({ username: cleanUsername, _id: { $ne: userId } });
      if (existing) {
        return res.status(400).json({
          success: false,
          message: `Username '${cleanUsername}' is already taken.`
        });
      }
      user.username = cleanUsername;
    }

    if (name !== undefined) user.name = name.trim();
    if (title !== undefined) user.title = title.trim();
    if (bio !== undefined) user.bio = bio;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl.trim();
    if (resumeUrl !== undefined) user.resumeUrl = resumeUrl.trim();
    if (customDomain !== undefined) user.customDomain = customDomain.trim();
    if (isPro !== undefined) user.isPro = Boolean(isPro);

    if (templateId) {
      if (!TEMPLATE_IDS.includes(templateId)) {
        return res.status(400).json({
          success: false,
          message: `Invalid templateId. Must be one of: ${TEMPLATE_IDS.join(', ')}`
        });
      }
      user.templateId = templateId;
    }

    if (socialLinks && typeof socialLinks === 'object') {
      user.socialLinks = {
        github: socialLinks.github !== undefined ? socialLinks.github.trim() : user.socialLinks?.github || '',
        linkedin: socialLinks.linkedin !== undefined ? socialLinks.linkedin.trim() : user.socialLinks?.linkedin || '',
        twitter: socialLinks.twitter !== undefined ? socialLinks.twitter.trim() : user.socialLinks?.twitter || '',
        website: socialLinks.website !== undefined ? socialLinks.website.trim() : user.socialLinks?.website || ''
      };
    }

    if (sectionConfig && typeof sectionConfig === 'object') {
      user.sectionConfig = {
        projects: sectionConfig.projects !== undefined ? Boolean(sectionConfig.projects) : user.sectionConfig?.projects ?? true,
        skills: sectionConfig.skills !== undefined ? Boolean(sectionConfig.skills) : user.sectionConfig?.skills ?? true,
        experience: sectionConfig.experience !== undefined ? Boolean(sectionConfig.experience) : user.sectionConfig?.experience ?? true,
        education: sectionConfig.education !== undefined ? Boolean(sectionConfig.education) : user.sectionConfig?.education ?? true,
        articles: sectionConfig.articles !== undefined ? Boolean(sectionConfig.articles) : user.sectionConfig?.articles ?? true,
        awards: sectionConfig.awards !== undefined ? Boolean(sectionConfig.awards) : user.sectionConfig?.awards ?? true
      };
      user.markModified('sectionConfig');
    }

    if (sectionTitles && typeof sectionTitles === 'object') {
      user.sectionTitles = {
        projects: sectionTitles.projects !== undefined ? String(sectionTitles.projects).trim() : user.sectionTitles?.projects || 'Featured Projects',
        skills: sectionTitles.skills !== undefined ? String(sectionTitles.skills).trim() : user.sectionTitles?.skills || 'Technical Skills',
        experience: sectionTitles.experience !== undefined ? String(sectionTitles.experience).trim() : user.sectionTitles?.experience || 'Work Experience',
        education: sectionTitles.education !== undefined ? String(sectionTitles.education).trim() : user.sectionTitles?.education || 'Education & Certifications',
        articles: sectionTitles.articles !== undefined ? String(sectionTitles.articles).trim() : user.sectionTitles?.articles || 'Articles & Publications',
        awards: sectionTitles.awards !== undefined ? String(sectionTitles.awards).trim() : user.sectionTitles?.awards || 'Honors & Awards'
      };
      user.markModified('sectionTitles');
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedUser
    });
  } catch (error) {
    next(error);
  }
};
