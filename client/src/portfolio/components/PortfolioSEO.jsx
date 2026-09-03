import React from 'react';
import { Helmet } from 'react-helmet-async';

export const PortfolioSEO = ({ user }) => {
  if (!user) return null;

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://codefolio.dev';
  const canonicalUrl = `${currentOrigin}/${user.username}`;

  const title = user.title
    ? `${user.name} — ${user.title} | CodeFolio`
    : `${user.name} (@${user.username}) | CodeFolio Portfolio`;

  const description = user.bio
    ? user.bio.substring(0, 160)
    : `Explore the developer portfolio of ${user.name} on CodeFolio. View projects, technical skills, and get in touch.`;

  // Build list of external profiles for sameAs schema
  const sameAs = [
    user.socialLinks?.github,
    user.socialLinks?.linkedin,
    user.socialLinks?.twitter,
    user.socialLinks?.website
  ].filter(Boolean);

  // Schema.org Person JSON-LD structured data for search engines
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: user.name,
    jobTitle: user.title || 'Software Engineer',
    description: user.bio || description,
    image: user.avatarUrl || undefined,
    url: canonicalUrl,
    sameAs: sameAs.length > 0 ? sameAs : undefined
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="author" content={user.name} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="profile" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {user.avatarUrl && <meta property="og:image" content={user.avatarUrl} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {user.avatarUrl && <meta name="twitter:image" content={user.avatarUrl} />}

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default PortfolioSEO;
