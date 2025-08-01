import AddItemPage from "./pages/AddItemPage";
              <Route path="/add-item" element={<AddItemPage />} />
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import CssBaseline from "@mui/material/CssBaseline";
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
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import UploadCatalogPage from "./pages/UploadCatalogPage";

const queryClient = new QueryClient();

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
              <Route path="/confirm-email" element={<ConfirmEmailPage />} />
              <Route path="/upload-catalog" element={<UploadCatalogPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/item/:id" element={<ItemDetailPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/seller-dashboard"
                element={<SellerDashboardNew />}
              />
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
