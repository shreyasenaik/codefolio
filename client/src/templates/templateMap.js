import MinimalistTemplate from './Minimalist/MinimalistTemplate.jsx';
import CyberpunkTemplate from './Cyberpunk/CyberpunkTemplate.jsx';
import DefaultLayout from './DefaultLayout.jsx';

/**
 * Template Engine Registry
 * Maps templateId string -> React Template Component
 * Only active templates: minimalist, cyberpunk
 */
export const templateMap = {
  minimalist: MinimalistTemplate,
  cyberpunk: CyberpunkTemplate
};

/**
 * Resolver function with DefaultLayout fallback
 * @param {string} templateId
 * @returns {React.ComponentType}
 */
export const getTemplateComponent = (templateId) => {
  if (!templateId || typeof templateId !== 'string') {
    return MinimalistTemplate;
  }
  const normalizedId = templateId.toLowerCase().trim();
  return templateMap[normalizedId] || MinimalistTemplate;
};

export default templateMap;
