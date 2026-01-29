import * as React from "react";
import Box from "@mui/material/Box";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import NotificationsIcon from "@mui/icons-material/Notifications";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonIcon from "@mui/icons-material/Person";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";

export default function BottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        borderRadius: "24px 24px 0 0",
        mx: "auto",
        maxWidth: 420,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        background: "linear-gradient(90deg, #f8fafc 0%, #e0e7ff 100%)",
        p: 0.5
      }}
      elevation={0}
    >
      <MuiBottomNavigation
        showLabels={false}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          background: "transparent",
          borderRadius: "20px",
          minHeight: 64
        }}
      >
        <BottomNavigationAction
          label={
            <span
              style={
                value === 0
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 500
                    }
                  : { color: "#64748b", fontWeight: 500 }
              }
            >
              Home
            </span>
          }
          icon={
            <TravelExploreIcon
              sx={
                value === 0
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 28
                    }
                  : { color: "#64748b", fontSize: 28 }
              }
            />
          }
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.5
          }}
        />
        <BottomNavigationAction
          label={
            <span
              style={
                value === 1
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 500
                    }
                  : { color: "#64748b", fontWeight: 500 }
              }
            >
              Messages
            </span>
          }
          icon={
            <ChatBubbleIcon
              sx={
                value === 1
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 28
                    }
                  : { color: "#64748b", fontSize: 28 }
              }
            />
          }
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.5
          }}
        />
        <BottomNavigationAction
          label={
            <span
              style={
                value === 2
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 500
                    }
                  : { color: "#64748b", fontWeight: 500 }
              }
            >
              Notifications
            </span>
          }
          icon={
            <NotificationsIcon
              sx={
                value === 2
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 28
                    }
                  : { color: "#64748b", fontSize: 28 }
              }
            />
          }
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.5
          }}
        />
        <BottomNavigationAction
          label={
            <span
              style={
                value === 3
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 500
                    }
                  : { color: "#64748b", fontWeight: 500 }
              }
            >
              Wishlist
            </span>
          }
          icon={
            <FavoriteIcon
              sx={
                value === 3
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 28
                    }
                  : { color: "#64748b", fontSize: 28 }
              }
            />
          }
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.5
          }}
        />
        <BottomNavigationAction
          label={
            <span
              style={
                value === 4
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontWeight: 500
                    }
                  : { color: "#64748b", fontWeight: 500 }
              }
            >
              Profile
            </span>
          }
          icon={
            <PersonIcon
              sx={
                value === 4
                  ? {
                      background: "linear-gradient(90deg,#6366f1,#818cf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      fontSize: 28
                    }
                  : { color: "#64748b", fontSize: 28 }
              }
            />
          }
          sx={{
            minWidth: 0,
            px: 1.5,
            py: 0.5
          }}
        />
      </MuiBottomNavigation>
    </Paper>
  );
}
