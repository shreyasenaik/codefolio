import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Project must belong to a user'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [120, 'Title cannot exceed 120 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1500, 'Description cannot exceed 1500 characters']
  },
  techStack: {
    type: [String],
    default: []
  },
  repoLink: {
    type: String,
    default: '',
    trim: true
  },
  liveLink: {
    type: String,
    default: '',
    trim: true
  },
  screenshotUrl: {
    type: String,
    default: '',
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export const Project = mongoose.model('Project', projectSchema);
export default Project;
