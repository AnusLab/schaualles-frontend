import { query } from './db';

export async function getSeo(pageIdentifier) {
  try {
    const results = await query('SELECT title, description FROM pages_seo WHERE page_identifier = ?', [pageIdentifier]);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching SEO for ${pageIdentifier}:`, error);
    return null;
  }
}
