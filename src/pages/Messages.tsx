import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
  Phone as PhoneIcon,
  Videocam as VideoIcon,
  Info as InfoIcon,
  Close as CloseIcon
} from "@mui/icons-material";
import {
  Box,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery,
  styled,
  Badge,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Button,
  Paper,
  Tooltip,
  Zoom
} from "@mui/material";
import { MessageNavBar } from "@/components/MessageNavBar";

// Utility functions for date formatting
const formatTimeAgo = (dateString: string): string => {
  try {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  } catch (e) {
    console.error("Error formatting time ago:", e);
    return "";
  }
};

const formatMessageTime = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch (e) {
    console.error("Error formatting message time:", e);
    return "";
  }
};

// Styled components
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 8,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isCurrentUser"
})<{ isCurrentUser?: boolean }>(({ theme, isCurrentUser }) => ({
  display: "inline-block",
  maxWidth: "70%",
  padding: theme.spacing(1.5, 2),
  marginBottom: theme.spacing(1),
  borderRadius: 18,
  wordBreak: "break-word",
  ...(isCurrentUser
    ? {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderTopRightRadius: 4,
        marginLeft: "auto"
      }
    : {
        backgroundColor:
          theme.palette.mode === "dark"
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
        color: theme.palette.text.primary,
        borderTopLeftRadius: 4,
        marginRight: "auto"
      })
}));

const MessageTime = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isCurrentUser"
})<{ isCurrentUser?: boolean }>(({ theme, isCurrentUser }) => ({
  fontSize: "0.75rem",
  textAlign: isCurrentUser ? "right" : "left",
  color: isCurrentUser
    ? "rgba(255, 255, 255, 0.7)"
    : theme.palette.text.secondary,
  marginTop: theme.spacing(0.5)
}));

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  timestamp: string;
}

interface Conversation {
  id: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const Messages = () => {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [activeConversation, setActiveConversation] = useState<string | null>(
    conversationId || null
  );
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate loading conversations
    const mockConversations: Conversation[] = [
      {
        id: "1",
        userName: "John Doe",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        lastMessage: "Hey there! Is this still available?",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        unreadCount: 2
      },
      {
        id: "2",
        userName: "Jane Smith",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        lastMessage: "Thanks for the quick response!",
        lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        unreadCount: 0
      },
      {
        id: "3",
        userName: "Mike Johnson",
        userAvatar: "https://i.pravatar.cc/150?img=3",
        lastMessage: "Can we meet tomorrow?",
        lastMessageTime: new Date(
          Date.now() - 1000 * 60 * 60 * 24
        ).toISOString(), // 1 day ago
        unreadCount: 5
      }
    ];

    setConversations(mockConversations);

    // If we have a conversationId in the URL, load its messages
    if (conversationId) {
      const mockMessages: Message[] = [
        {
          id: "1",
          text: "Hey there! Is this still available?",
          sender: "other",
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() // 10 minutes ago
        },
        {
          id: "2",
          text: "Yes, it is!",
          sender: "me",
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
        },
        {
          id: "3",
          text: "Great! Can I come see it tomorrow?",
          sender: "other",
          timestamp: new Date().toISOString()
        }
      ];
      setMessages(mockMessages);
    }
  }, [conversationId]);

  // Load messages for the active conversation
  useEffect(() => {
    if (activeConversation) {
      // In a real app, fetch messages for the conversation
      const mockMessages: Message[] = [
        {
          id: "1",
          text: "Hi, is this item still available?",
          sender: "other",
          timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() // 10 minutes ago
        },
        {
          id: "2",
          text: "Yes, it is! Are you interested?",
          sender: "me",
          timestamp: new Date(Date.now() - 1000 * 60 * 8).toISOString() // 8 minutes ago
        },
        {
          id: "3",
          text: "Yes, I am. Can we negotiate the price?",
          sender: "other",
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() // 5 minutes ago
        }
      ];
      setMessages(mockMessages);
    }
  }, [activeConversation]);

  // Handle sending a new message
  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!message.trim()) return;

      const newMessage: Message = {
        id: Date.now().toString(),
        text: message,
        sender: "me",
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    },
    [message]
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  // Handle search
  const handleSearch = useCallback((query: string) => {
    console.log("Searching for:", query);
  }, []);

  // Toggle mobile sidebar
  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  // Close mobile sidebar when a conversation is selected
  useEffect(() => {
    if (isMobile && activeConversation) {
      setMobileSidebarOpen(false);
    }
  }, [activeConversation, isMobile]);

  // Handle back button press
  const handleBack = () => {
    if (isMobile && activeConversation) {
      setActiveConversation(null);
    } else {
      navigate(-1);
    }
  };

  const currentConversation = conversations.find(
    (c) => c.id === activeConversation
  );
  const hasConversation = !!currentConversation;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default"
      }}
    >
      <MessageNavBar
        title={currentConversation?.userName || "Messages"}
        avatar={currentConversation?.userAvatar}
        status="Active now"
        showBackButton={hasConversation}
        onBack={handleBack}
        onMenuClick={toggleMobileSidebar}
        isSidebarOpen={mobileSidebarOpen}
        onSearch={handleSearch}
      />

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden", pt: 7 }}>
        {/* Sidebar */}
        <Box
          sx={{
            position: { xs: "fixed", md: "relative" },
            top: 0,
            left: 0,
            bottom: 0,
            width: 320,
            borderRight: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
            transform: {
              xs: mobileSidebarOpen ? "translateX(0)" : "translateX(-100%)",
              md: "translateX(0)"
            },
            transition: theme.transitions.create("transform", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            }),
            zIndex: 1100,
            display: hasConversation && isMobile ? "none" : "block",
            overflowY: "auto"
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1
            }}
          >
            <Typography variant="h6" component="h2">
              Messages
            </Typography>
            <IconButton
              onClick={() => setMobileSidebarOpen(false)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ p: 0 }}>
            {conversations.map((conversation) => (
              <ListItem
                key={conversation.id}
                component="div"
                onClick={() => setActiveConversation(conversation.id)}
                sx={{
                  cursor: "pointer",
                  bgcolor:
                    activeConversation === conversation.id
                      ? "action.selected"
                      : "transparent",
                  "&:hover": {
                    bgcolor: "action.hover"
                  }
                }}
              >
                <ListItemAvatar>
                  <StyledBadge
                    color="primary"
                    variant="dot"
                    invisible={conversation.unreadCount === 0}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                  >
                    <Avatar
                      src={conversation.userAvatar}
                      alt={conversation.userName}
                      sx={{ width: 48, height: 48 }}
                    >
                      {conversation.userName.charAt(0)}
                    </Avatar>
                  </StyledBadge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        variant="subtitle2"
                        noWrap
                        sx={{
                          fontWeight:
                            conversation.unreadCount > 0
                              ? "fontWeightBold"
                              : "fontWeightRegular",
                          maxWidth: 180
                        }}
                      >
                        {conversation.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          fontSize: "0.7rem",
                          whiteSpace: "nowrap",
                          ml: 1
                        }}
                      >
                        {formatTimeAgo(conversation.lastMessageTime)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      noWrap
                      sx={{
                        maxWidth: 200,
                        fontWeight:
                          conversation.unreadCount > 0
                            ? "fontWeightMedium"
                            : "fontWeightRegular"
                      }}
                    >
                      {conversation.lastMessage}
                    </Typography>
                  }
                  sx={{
                    "& .MuiListItemText-primary": { mb: 0.5 },
                    "& .MuiListItemText-secondary": {
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }
                  }}
                />
                {conversation.unreadCount > 0 && (
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      borderRadius: 10,
                      minWidth: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      ml: 1,
                      px: 0.5
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ lineHeight: 1, fontWeight: "bold" }}
                    >
                      {conversation.unreadCount}
                    </Typography>
                  </Box>
                )}
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Chat Area */}
        {currentConversation ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              bgcolor: "background.default"
            }}
          >
            {/* Chat Header */}
            <Paper
              elevation={0}
              square
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "background.paper"
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StyledBadge
                  color="success"
                  variant="dot"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  overlap="circular"
                >
                  <Avatar
                    src={currentConversation.userAvatar}
                    alt={currentConversation.userName}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  >
                    {currentConversation.userName.charAt(0)}
                  </Avatar>
                </StyledBadge>
                <Box>
                  <Typography variant="subtitle1" fontWeight="medium">
                    {currentConversation.userName}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Active now
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Audio call" TransitionComponent={Zoom}>
                  <IconButton color="primary">
                    <PhoneIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Video call" TransitionComponent={Zoom}>
                  <IconButton color="primary">
                    <VideoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Conversation info" TransitionComponent={Zoom}>
                  <IconButton color="primary">
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Paper>

            {/* Messages */}
            <Box
              sx={{
                flex: 1,
                p: 2,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2
              }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "me" ? "flex-end" : "flex-start",
                    px: 1
                  }}
                >
                  <Box>
                    <MessageBubble isCurrentUser={msg.sender === "me"}>
                      <Typography variant="body1">{msg.text}</Typography>
                    </MessageBubble>
                    <MessageTime
                      isCurrentUser={msg.sender === "me"}
                      variant="caption"
                    >
                      {formatMessageTime(msg.timestamp)}
                    </MessageTime>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input */}
            <Paper
              elevation={0}
              square
              sx={{
                p: 2,
                borderTop: 1,
                borderColor: "divider",
                bgcolor: "background.paper"
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Tooltip title="Attach file">
                  <IconButton color="primary">
                    <AttachFileIcon />
                  </IconButton>
                </Tooltip>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  variant="outlined"
                  size="small"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 4,
                      bgcolor: "background.paper"
                    }
                  }}
                />
                <Tooltip title="Send message">
                  <span>
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      sx={{
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          bgcolor: "primary.dark"
                        },
                        "&.Mui-disabled": {
                          bgcolor: "action.disabledBackground",
                          color: "action.disabled"
                        }
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                </Tooltip>
              </Box>
            </Paper>
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default"
            }}
          >
            <Paper elevation={0} sx={{ p: 4, textAlign: "center" }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                No conversation selected
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select a conversation or start a new one to begin messaging.
              </Typography>
              <Button variant="outlined" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Messages;
