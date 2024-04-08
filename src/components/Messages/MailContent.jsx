import React, { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Paper } from "@mui/material";
import MessageInput from "./MessageInput";

const MailContent = ({ message }) => {
  console.log(message);
  const [sentMessages, setSentMessages] = useState([]);
  const [open, setOpen] = useState({ reply: false, delete: false });

  const handleSend = (messageContent) => {
    setSentMessages([
      ...sentMessages,
      { sender: message.name, ...messageContent },
    ]);
    setOpen({ ...open, reply: true });
  };

  const handleSnackbarClose = (action) => {
    setOpen({ ...open, [action]: false });
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        minHeight: 600,
        borderRadius: "sm",
        p: 2,
        mb: 3,
        mt: 8,
        position: "relative",
      }}
    >
      {!message ? (
        // <>
        //   <Box
        //     sx={{
        //       display: "flex",
        //       justifyContent: "space-between",
        //       alignItems: "center",
        //       flexWrap: "wrap",
        //       gap: 2,
        //     }}
        //   >
        //     <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        //       <Avatar />
        //       <Box sx={{ ml: 2 }}>
        //         <Typography level="title-sm" textcolor="text.primary" mb={0.5}>
        //           Placeholder Name
        //         </Typography>
        //         <Typography level="body-xs" textcolor="text.tertiary">
        //           Placeholder Date
        //         </Typography>
        //       </Box>
        //     </Box>
        //     <Box
        //       sx={{
        //         display: "flex",
        //         height: "32px",
        //         flexDirection: "row",
        //         gap: 1.5,
        //       }}
        //     >
        //       <Button size="sm" variant="plain" color="neutral" disabled>
        //         Reply
        //       </Button>
        //       <Button size="sm" variant="plain" color="danger" disabled>
        //         Delete
        //       </Button>
        //     </Box>
        //     <Divider sx={{ mt: 2 }} />
        //     <Typography
        //       level="title-lg"
        //       textColor="text.primary"
        //       enddecorator={
        //         <Chip
        //           component="span"
        //           size="sm"
        //           variant="outlined"
        //           color="warning"
        //         >
        //           Placeholder Subject
        //         </Chip>
        //       }
        //     >
        //       Placeholder Subject
        //     </Typography>
        //     <Typography level="body-sm" mt={2} mb={2}>
        //       Placeholder Content
        //     </Typography>
        //     <Divider />
        //   </Box>
        // </>
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar />
              <Box sx={{ ml: 2 }}>
                <Typography level="title-sm" textcolor="text.primary" mb={0.5}>
                  Name
                </Typography>
                <Typography level="body-xs" textcolor="text.tertiary">
                  Date
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                height: "32px",
                flexDirection: "row",
                gap: 1.5,
              }}
            >
              <Button size="sm" variant="plain" color="neutral" disabled>
                Reply
              </Button>
              <Button size="sm" variant="plain" color="danger" disabled>
                Delete
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              level="title-lg"
              textColor="text.primary"
              enddecorator={
                <Chip
                  component="span"
                  size="sm"
                  variant="outlined"
                  color="warning"
                >
                  Personal
                </Chip>
              }
            >
              Subject
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{ mr: 1, display: "inline-block" }}
                >
                  From
                </Typography>
                <Tooltip size="sm" title="Copy email" variant="outlined">
                  <Chip
                    label="sender@mail.com"
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={() => {}}
                  />
                </Tooltip>
              </div>
              <div>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{ mr: 1, display: "inline-block" }}
                >
                  to
                </Typography>
                <Tooltip size="sm" title="Copy email" variant="outlined">
                  <Chip
                    label="receiver@mail.com"
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={() => {}}
                  />
                </Tooltip>
              </div>
            </Box>
          </Box>
          <Divider />
          <Typography level="body-sm" mt={2} mb={2}>
            Content
          </Typography>
          <Divider />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              mt: 4,
              p: 2,
            }}
          >
            <MessageInput recipient="Name" />
          </Box>
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Avatar src="message.avatar" srcSet="message.avatar2x" />
              <Box sx={{ ml: 2 }}>
                <Typography level="title-sm" textColor="text.primary" mb={0.5}>
                  Doina F
                </Typography>
                <Typography level="body-xs" textColor="text.tertiary">
                  {new Date(message.sent_date).toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                height: "32px",
                flexDirection: "row",
                gap: 1.5,
              }}
            >
              <Button
                size="sm"
                variant="plain"
                color="neutral"
                startIcon={<ReplyRoundedIcon />}
                onClick={() => setOpen({ ...open, reply: true })}
              >
                Reply
              </Button>
              <Snackbar
                color="success"
                open={open.reply}
                onClose={() => handleSnackbarClose("reply")}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                message="Your message has been sent."
                action={
                  <Button
                    onClick={() => handleSnackbarClose("reply")}
                    size="small"
                    variant="text"
                    color="inherit"
                  >
                    Dismiss
                  </Button>
                }
              />

              <Button
                size="sm"
                variant="plain"
                color="danger"
                startIcon={<DeleteRoundedIcon />}
                onClick={() => setOpen({ ...open, delete: true })}
              >
                Delete
              </Button>
              <Snackbar
                color="danger"
                open={open.delete}
                onClose={() => handleSnackbarClose("delete")}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                message="Your message has been deleted."
                action={
                  <Button
                    onClick={() => handleSnackbarClose("delete")}
                    size="small"
                    variant="text"
                    color="inherit"
                  >
                    Dismiss
                  </Button>
                }
              />
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              level="title-lg"
              textColor="text.primary"
              enddecorator={
                <Chip
                  component="span"
                  size="sm"
                  variant="outlined"
                  color="warning"
                >
                  Personal
                </Chip>
              }
            >
              {message.subject}
            </Typography>
            <Box
              sx={{
                mt: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              <div>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{ mr: 1, display: "inline-block" }}
                >
                  From
                </Typography>
                <Tooltip size="sm" title="Copy email" variant="outlined">
                  <Chip
                    label="Doina F"
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={() => {}}
                  />
                </Tooltip>
              </div>
              <div>
                <Typography
                  component="span"
                  level="body-sm"
                  sx={{ mr: 1, display: "inline-block" }}
                >
                  to
                </Typography>
                <Tooltip size="sm" title="Copy email" variant="outlined">
                  <Chip
                    label="Dohna16@gmail.com"
                    size="sm"
                    variant="soft"
                    color="primary"
                    onClick={() => {}}
                  />
                </Tooltip>
              </div>
            </Box>
          </Box>
          <Divider />
          <Typography level="body-sm" mt={2} mb={2}>
            {message.content}
          </Typography>
          <Divider />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              mt: 4,
              p: 2,
            }}
          >
            <MessageInput recipient="Doina F" onSend={handleSend} />
          </Box>
        </>
      )}
    </Paper>
  );
};

export default MailContent;
