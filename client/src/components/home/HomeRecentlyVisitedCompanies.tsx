import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Rating,
  CardActionArea,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { RecentCompany } from '@/types/company';
import { getRecentlyViewedCompanies } from '@/utils/recentlyViewed';

const STORAGE_KEY = 'recentlyVisitedCompanies';

const HomeRecentlyVisitedCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<RecentCompany[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const recentCompanies = getRecentlyViewedCompanies();
    if (recentCompanies && recentCompanies.length > 0) {
      setCompanies(recentCompanies);
    }
  }, []);

  if (!mounted || companies.length === 0) {
    return null;
  }

  return (
    <Box sx={{ py: 6, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              color: 'text.primary'
            }}
          >
            آخر الشركات التي زرتها
          </Typography>

          <Grid container spacing={3}>
            {companies.slice(0, 4).map((company) => (
              <Grid item xs={12} sm={6} md={3} key={company.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/company/${company.id}`} passHref style={{ textDecoration: 'none' }}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardContent>
                          <Stack spacing={2}>
                            <Box
                              sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 1,
                                overflow: 'hidden',
                                position: 'relative',
                                bgcolor: 'grey.100',
                              }}
                            >
                              {company.logo_url ? (
                                <Image
                                  src={company.logo_url}
                                  alt={company.name || 'Company Logo'}
                                  fill
                                  style={{ objectFit: 'contain' }}
                                />
                              ) : (
                                <Box
                                  sx={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                  }}
                                >
                                  {company.name ? company.name.charAt(0).toUpperCase() : '?'}
                                </Box>
                              )}
                            </Box>
                            
                            <Box>
                              <Typography
                                variant="subtitle1"
                                component="h3"
                                sx={{
                                  fontWeight: 'medium',
                                  mb: 0.5,
                                  color: 'text.primary',
                                }}
                              >
                                {company.name || 'Unnamed Company'}
                              </Typography>
                              
                              <Stack direction="row" spacing={1} alignItems="center">
                                <Rating
                                  value={company.rating || 0}
                                  readOnly
                                  size="small"
                                  precision={0.1}
                                  sx={{ color: 'primary.main' }}
                                />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {company.rating?.toFixed(1) || '0.0'}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Link>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default HomeRecentlyVisitedCompanies;
