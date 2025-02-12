import { RecentCompany } from '@/types/company';

const STORAGE_KEY = 'recentlyVisitedCompanies';
const MAX_RECENT_COMPANIES = 10;

export const getRecentlyViewedCompanies = (): RecentCompany[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addRecentlyViewedCompany = (company: RecentCompany): void => {
  if (typeof window === 'undefined') return;

  const companies = getRecentlyViewedCompanies();
  
  // Remove if company already exists
  const filteredCompanies = companies.filter(c => c.id !== company.id);
  
  // Add new company at the beginning
  const updatedCompanies = [
    { ...company, viewedAt: new Date().toISOString() },
    ...filteredCompanies
  ].slice(0, MAX_RECENT_COMPANIES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCompanies));
};
