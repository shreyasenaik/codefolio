/**
 * Shared Design Tokens derived directly from the CodeFolio Landing Page
 * Source of truth for palette, typography, borders, and component tokens across templates.
 */

export const tokens = {
  // Surface & Canvas Palette
  colors: {
    canvas: '#0B0F17',          // Main background canvas
    surface: '#131B2A',         // Elevated card / container background
    surfaceHover: '#1A2438',    // Interactive card hover background
    surfaceNested: '#0E1522',   // Inner card / code block background
    border: '#223046',          // Default structural border
    borderHover: '#38BDF8',     // Interactive accent border
    borderMint: '#00E599',      // Success / Primary CTA border
    
    // Text Hierarchy
    textPrimary: '#F8FAFC',     // High-contrast primary headings & body text
    textSecondary: '#94A3B8',   // Secondary text, descriptions, comments
    textMuted: '#64748B',       // Muted labels, date stamps, copyright
    
    // Developer Tool Accents
    accentMint: '#00E599',      // Terminal green / active indicator
    accentCyan: '#38BDF8',      // IDE blue / syntax highlight / links
    accentRose: '#FF5A78',      // Diff delete / warning / accents
    accentAmber: '#FBBF24',     // Warning / Starred
  },

  // Typography Tokens
  fonts: {
    sans: 'Inter, system-ui, -apple-system, sans-serif',
    mono: 'Fira Code, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    cyber: 'Orbitron, sans-serif'
  },

  // Background Grid Texture (48px matching landing page hero)
  gridBackground: {
    backgroundImage:
      'linear-gradient(to right, rgba(34, 48, 70, 0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(34, 48, 70, 0.35) 1px, transparent 1px)',
    backgroundSize: '48px 48px'
  }
};

export default tokens;
