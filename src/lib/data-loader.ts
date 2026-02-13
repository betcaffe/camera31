import data from '@/data/data.json';

export type SiteData = typeof data;

export function getSiteData(): SiteData {
  return data;
}
