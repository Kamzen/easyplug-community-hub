
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import CssBaseline from '@mui/material/CssBaseline';
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import StartSellingPage from "./pages/StartSellingPage";
import CategoryPage from "./pages/CategoryPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import ProfilePage from "./pages/ProfilePage";
import SellerDashboardNew from "./pages/SellerDashboardNew";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Create MUI theme with orange colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b35',
      light: '#ff8a5b',
      dark: '#e55a2e',
    },
    secondary: {
      main: '#f7931e',
      light: '#f9a645',
      dark: '#d17d1a',
    },
  },
  typography: {
    fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
  },
  shape: {
    borderRadius: 12,
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/start-selling" element={<StartSellingPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/item/:id" element={<ItemDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/seller-dashboard" element={<SellerDashboardNew />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </NextThemeProvider>
  </QueryClientProvider>
);

export default App;
