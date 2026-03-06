const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ziweiastrology.ai").trim();

const content = `# ziweiastrology.ai

> Ancient Zi Wei Dou Shu wisdom meets quantum probability modeling. Decode your reality. Optimize your future.

## About
ziweiastrology.ai is the world's first platform to apply quantum probability frameworks to Zi Wei Dou Shu (紫微斗数), the imperial Chinese star-charting system. We combine 1,000+ years of astrological tradition with modern data science to help users decode their birth charts and optimize life decisions.

## Main Pages
- ${SITE_URL}/ — Home (landing page funnel)
- ${SITE_URL}/about — Brand story, team, and methodology
- ${SITE_URL}/resources — Articles and learning resources on Zi Wei Dou Shu
- ${SITE_URL}/case-studies — Real-world celebrity and historical chart analyses
- ${SITE_URL}/system-comparison — Zi Wei Dou Shu vs Western Astrology, Ba Zi, I Ching, Tarot
- ${SITE_URL}/community — Community hub: feed, pillar data, analysis, study groups
- ${SITE_URL}/academy — Courses and structured learning paths
- ${SITE_URL}/academy/courses — Course catalog
- ${SITE_URL}/blog — Blog: history, star analysis, celebrity case studies, mathematics of ZWDS

## Key Topics
- Zi Wei Dou Shu (Purple Star Astrology / 紫微斗数)
- Birth chart analysis and interpretation
- 12 Palaces system (Life, Siblings, Spouse, Children, Wealth, Health, Travel, Friends, Career, Property, Fortune, Parents)
- 108-star matrix and star interactions
- Four-layer temporal analysis (Decade, Annual, Monthly, Daily luck periods)
- Quantum probability modeling applied to astrology
- Comparative divination system analysis
- Blog articles on history, star mechanics, celebrity analyses, and mathematics

## Membership Tiers
- Free — Basic chart generation and limited resources
- Basic — Full resource library and community access
- Premium — Advanced analysis tools and academy courses
- Sifu — Master-level certification path and all features

## Technical
- Built with Next.js, React, TypeScript
- Contact: via the website
`;

export async function GET() {
  return new Response(content.trim(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
