import { Project } from '../models/index.js';

// @desc    Get all projects for current user
// @route   GET /api/projects
// @access  Private
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ order: 1, createdAt: -1 });
    return res.status(200).json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private
export const createProject = async (req, res, next) => {
  try {
    const { title, description, techStack, repoLink, liveLink, screenshotUrl, featured, order } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required for a project.'
      });
    }

    // Process techStack if passed as string (comma separated) or array
    let processedTechStack = [];
    if (Array.isArray(techStack)) {
      processedTechStack = techStack.map(t => String(t).trim()).filter(Boolean);
    } else if (typeof techStack === 'string') {
      processedTechStack = techStack.split(',').map(t => t.trim()).filter(Boolean);
    }

    const project = await Project.create({
      userId: req.user._id,
      title: title.trim(),
      description: description.trim(),
      techStack: processedTechStack,
      repoLink: repoLink ? repoLink.trim() : '',
      liveLink: liveLink ? liveLink.trim() : '',
      screenshotUrl: screenshotUrl ? screenshotUrl.trim() : '',
      featured: Boolean(featured),
      order: typeof order === 'number' ? order : 0
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findOne({ _id: id, userId: req.user._id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or you do not have permission to edit it.'
      });
    }

    const { title, description, techStack, repoLink, liveLink, screenshotUrl, featured, order } = req.body;

    if (title !== undefined) project.title = title.trim();
    if (description !== undefined) project.description = description.trim();
    if (repoLink !== undefined) project.repoLink = repoLink.trim();
    if (liveLink !== undefined) project.liveLink = liveLink.trim();
    if (screenshotUrl !== undefined) project.screenshotUrl = screenshotUrl.trim();
    if (featured !== undefined) project.featured = Boolean(featured);
    if (order !== undefined) project.order = Number(order);

    if (techStack !== undefined) {
      if (Array.isArray(techStack)) {
        project.techStack = techStack.map(t => String(t).trim()).filter(Boolean);
      } else if (typeof techStack === 'string') {
        project.techStack = techStack.split(',').map(t => t.trim()).filter(Boolean);
      }
    }

    const updated = await project.save();

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      project: updated
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or already deleted.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
      id
    });
  } catch (error) {
    next(error);
  }
};
