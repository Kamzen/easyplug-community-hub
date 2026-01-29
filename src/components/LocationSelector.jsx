import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTheme } from "@mui/material/styles";

const locations = [
  "Polokwane",
  "Moletjie",
  "Ga-Rampuru",
  "Seshego",
  "Lebowakgomo",
  "Mokopane",
  "Tzaneen",
  "Phalaborwa",
  "Burgersfort",
  "Groblersdal"
];

export const LocationSelector = ({ selectedLocation, onLocationChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (location) => {
    onLocationChange(location);
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleClick}
        startIcon={<LocationOnIcon color="primary" />}
        endIcon={<ArrowDropDownIcon color="primary" />}
        sx={{
          textTransform: "none",
          maxWidth: 140,
          borderRadius: "999px",
          fontWeight: 500,
          boxShadow: 1,
          height: 32 // add this line to match IconButton height
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {isMobile ? selectedLocation.slice(0, 3) : selectedLocation}
        </span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            width: 220,
            borderRadius: 3,
            boxShadow: 6,
            p: 1
          }
        }}
      >
        {locations.map((location) => (
          <MenuItem
            key={location}
            onClick={() => handleSelect(location)}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              fontWeight: 500
            }}
          >
            <ListItemIcon>
              <LocationOnIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={location} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
