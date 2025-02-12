import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Rating, IconButton, useTheme } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import Link from 'next/link';
import { Company } from '@/types/company';

interface RecentCompany {
  id: string;
  name: string;
  rating: number;
  logo_url?: string;
}

const MAX_RECENT_COMPANIES = 5;
const STORAGE_KEY = 'recentlyVisitedCompanies';

export const addRecentCompany = (company: Company) => {
  if (typeof window === 'undefined') return;

  const recentCompany: RecentCompany = {
    id: company.id,
    name: company.name,
    rating: company.rating,
    logo_url: company.logo_url
  };

  const stored = localStorage.getItem(STORAGE_KEY);
  let companies: RecentCompany[] = stored ? JSON.parse(stored) : [];

  // Remove if company already exists
  companies = companies.filter(c => c.id !== company.id);

  // Add new company at the beginning
  companies.unshift(recentCompany);

  // Keep only the latest companies
  companies = companies.slice(0, MAX_RECENT_COMPANIES);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
};

export const RecentlyVisitedCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<RecentCompany[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setCompanies(JSON.parse(stored));
    }
  }, []);

  if (!isVisible || companies.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: 300,
        p: 2,
        borderRadius: 2,
        zIndex: 1000,
        bgcolor: 'background.paper',
        boxShadow: theme.shadows[10],
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          آخر الشركات المزارة
        </Typography>
        <IconButton
          size="small"
          onClick={() => setIsVisible(false)}
          sx={{ color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {companies.map((company) => (
        <Link
          key={company.id}
          href={`/company/${company.id}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              mb: 1,
              borderRadius: 1,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                bgcolor: 'action.hover',
                transform: 'translateX(-4px)',
              },
            }}
          >
            {company.logo_url && (
              <Box
                component="img"
                src={company.logo_url}
                alt={company.name}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  mr: 2,
                  objectFit: 'cover',
                }}
              />
            )}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                {company.name}
              </Typography>
              <Rating
                value={company.rating}
                readOnly
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Box>
        </Link>
      ))}
    </Paper>
  );
};

export default RecentlyVisitedCompanies;
