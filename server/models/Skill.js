import mongoose from 'mongoose';
import { SKILL_CATEGORIES, PROFICIENCY_LEVELS } from '../config/constants.js';

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Skill must belong to a user'],
    index: true
  },
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    maxlength: [50, 'Skill name cannot exceed 50 characters']
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: {
      values: SKILL_CATEGORIES,
      message: '{VALUE} is not a supported category'
    },
    default: 'Other'
  },
  proficiency: {
    type: String,
    enum: {
      values: PROFICIENCY_LEVELS,
      message: '{VALUE} is not a valid proficiency level'
    },
    default: 'Intermediate'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Skill = mongoose.model('Skill', skillSchema);
export default Skill;
