import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { TEMPLATE_IDS } from '../config/constants.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
    select: false // Excluded by default from queries
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [30, 'Username cannot exceed 30 characters'],
    match: [/^[a-zA-Z0-9_-]+$/, 'Username can only contain alphanumeric characters, underscores, and dashes']
  },
  title: {
    type: String,
    default: '',
    trim: true,
    maxlength: [120, 'Headline cannot exceed 120 characters']
  },
  bio: {
    type: String,
    default: '',
    maxlength: [1000, 'Bio cannot exceed 1000 characters']
  },
  avatarUrl: {
    type: String,
    default: '',
    trim: true
  },
  resumeUrl: {
    type: String,
    default: '',
    trim: true
  },
  socialLinks: {
    github: { type: String, default: '', trim: true },
    linkedin: { type: String, default: '', trim: true },
    twitter: { type: String, default: '', trim: true },
    website: { type: String, default: '', trim: true }
  },
  templateId: {
    type: String,
    enum: TEMPLATE_IDS,
    default: 'minimalist'
  },
  isPro: {
    type: Boolean,
    default: false
  },
  customDomain: {
    type: String,
    default: '',
    trim: true
  },
  // Section visibility configuration (user can toggle sections ON or OFF)
  sectionConfig: {
    projects: { type: Boolean, default: true },
    skills: { type: Boolean, default: true },
    experience: { type: Boolean, default: true },
    education: { type: Boolean, default: true },
    articles: { type: Boolean, default: true },
    awards: { type: Boolean, default: true }
  },
  // Custom Section display titles (optional renaming)
  sectionTitles: {
    projects: { type: String, default: 'Featured Projects', trim: true },
    skills: { type: String, default: 'Technical Skills', trim: true },
    experience: { type: String, default: 'Work Experience', trim: true },
    education: { type: String, default: 'Education & Certifications', trim: true },
    articles: { type: String, default: 'Articles & Publications', trim: true },
    awards: { type: String, default: 'Honors & Awards', trim: true }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Compare hashed password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

export const User = mongoose.model('User', userSchema);
export default User;
