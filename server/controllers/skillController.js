import { Skill } from '../models/index.js';
import { SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '../config/constants.js';

// @desc    Get all skills for current user
// @route   GET /api/skills
// @access  Private
export const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find({ userId: req.user._id }).sort({ category: 1, order: 1, createdAt: 1 });
    return res.status(200).json({
      success: true,
      count: skills.length,
      skills
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new skill
// @route   POST /api/skills
// @access  Private
export const createSkill = async (req, res, next) => {
  try {
    const { name, category, proficiency, order } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Skill name is required.'
      });
    }

    const validatedCategory = SKILL_CATEGORIES.includes(category) ? category : 'Other';
    const validatedProficiency = PROFICIENCY_LEVELS.includes(proficiency) ? proficiency : 'Intermediate';

    const skill = await Skill.create({
      userId: req.user._id,
      name: name.trim(),
      category: validatedCategory,
      proficiency: validatedProficiency,
      order: typeof order === 'number' ? order : 0
    });

    return res.status(201).json({
      success: true,
      message: 'Skill created successfully.',
      skill
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private
export const updateSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findOne({ _id: id, userId: req.user._id });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found or you do not have permission to edit it.'
      });
    }

    const { name, category, proficiency, order } = req.body;

    if (name !== undefined) skill.name = name.trim();
    if (category !== undefined && SKILL_CATEGORIES.includes(category)) skill.category = category;
    if (proficiency !== undefined && PROFICIENCY_LEVELS.includes(proficiency)) skill.proficiency = proficiency;
    if (order !== undefined) skill.order = Number(order);

    const updated = await skill.save();

    return res.status(200).json({
      success: true,
      message: 'Skill updated successfully.',
      skill: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private
export const deleteSkill = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found or already deleted.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Skill deleted successfully.',
      id
    });
  } catch (error) {
    next(error);
  }
};
