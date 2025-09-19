import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar, 
  Box, 
  InputBase, 
  alpha, 
  styled 
} from "@mui/material";
import { 
  Search as SearchIcon, 
  Message as MessageIcon, 
  Menu as MenuIcon, 
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

// Styled components
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

interface MessageNavBarProps {
  onBack?: () => void;
  onSearch?: (query: string) => void;
  showBackButton?: boolean;
  title?: string;
  avatar?: string;
  status?: string;
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export const MessageNavBar = ({
  onBack,
  onSearch,
  showBackButton = false,
  title = "Messages",
  avatar,
  status,
  onMenuClick,
  isSidebarOpen = false,
}: MessageNavBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const theme = useTheme();
  const isMobile = window.innerWidth < 900; // Simple mobile detection

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
      elevation={0}
    >
      <Toolbar sx={{ minHeight: '56px !important' }}>
        {/* Left side */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          {/* Back button (shown conditionally on mobile) */}
          {showBackButton && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={() => (onBack ? onBack() : navigate(-1))}
              sx={{ mr: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          {/* Title or Avatar with name */}
          {avatar ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src={avatar} 
                alt={title}
                sx={{ width: 32, height: 32 }}
              >
                {title
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <Typography variant="subtitle2" noWrap>
                  {title}
                </Typography>
                {status && (
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {status}
                  </Typography>
                )}
              </Box>
            </Box>
          ) : (
            <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
          )}
        </Box>

        {/* Right side - Search and actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Search (desktop) */}
          <SearchContainer sx={{ display: { xs: 'none', md: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search messages…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch(searchQuery);
                }
              }}
            />
          </SearchContainer>

          {/* New message button */}
          <IconButton color="inherit" size="large">
            <MessageIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile search bar (shown when searching) */}
      {isSearching && (
        <Box sx={{ p: 1, borderTop: `1px solid ${theme.palette.divider}`, display: { xs: 'block', md: 'none' } }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
            <InputBase
              fullWidth
              placeholder="Search messages…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                borderRadius: 1,
                px: 2,
                py: 1,
              }}
              autoFocus
            />
            <IconButton type="submit" color="primary">
              <SearchIcon />
            </IconButton>
            <IconButton 
              onClick={() => {
                setIsSearching(false);
                setSearchQuery("");
              }}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </form>
        </Box>
      )}
    </AppBar>
  );
};

export default MessageNavBar;
