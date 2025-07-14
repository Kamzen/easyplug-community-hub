
import React from 'react';
import { Box, Container, Card, CardContent, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Store, ArrowLeft, CheckCircle } from 'lucide-react';

const validationSchema = Yup.object({
  businessName: Yup.string().required('Business name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  description: Yup.string().required('Business description is required'),
});

const StartSellingPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log('Seller application:', values);
    alert('Application submitted! We will review and get back to you within 24 hours.');
    navigate('/');
  };

  const features = [
    'Set up your online store in minutes',
    'Reach thousands of local customers',
    'Secure payment processing',
    'Real-time chat with buyers',
    'Analytics and sales tracking',
    'Mobile-friendly seller dashboard'
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Button 
          startIcon={<ArrowLeft />}
          onClick={() => navigate('/')}
          sx={{ mb: 4, color: 'white' }}
        >
          Back to Home
        </Button>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ color: 'white', mb: 4 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Start Selling Today
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
                Join thousands of local sellers and grow your business with EasyPlug
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                {features.map((feature, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle size={20} style={{ marginRight: 12 }} />
                    <Typography variant="body1">{feature}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Box sx={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                    mb: 2
                  }}>
                    <Store color="white" size={30} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" color="#ff6b35">
                    Seller Application
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tell us about your business
                  </Typography>
                </Box>

                <Formik
                  initialValues={{ 
                    businessName: '', 
                    email: '', 
                    phone: '', 
                    description: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Field
                        as={TextField}
                        fullWidth
                        name="businessName"
                        label="Business Name"
                        value={values.businessName}
                        onChange={handleChange}
                        error={touched.businessName && errors.businessName}
                        helperText={touched.businessName && errors.businessName}
                        sx={{ mb: 3 }}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        name="email"
                        label="Business Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && errors.email}
                        helperText={touched.email && errors.email}
                        sx={{ mb: 3 }}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        error={touched.phone && errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{ mb: 3 }}
                      />
                      
                      <Field
                        as={TextField}
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        label="Business Description"
                        value={values.description}
                        onChange={handleChange}
                        error={touched.description && errors.description}
                        helperText={touched.description && errors.description}
                        sx={{ mb: 4 }}
                      />
                      
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                          borderRadius: 3,
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #e55a2e, #e0821b)',
                          }
                        }}
                      >
                        Submit Application
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default StartSellingPage;
