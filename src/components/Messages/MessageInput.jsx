import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function MessageInput({ recipient }) {
  const [message, setMessage] = useState("");

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    // Logic to send message
    console.log("Message sent:", message);
    // Clear message input after sending
    setMessage("");
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={9}>
        <TextField
          label={`Reply to ${recipient}`}
          variant="outlined"
          fullWidth
          value={message}
          onChange={handleMessageChange}
        />
      </Grid>
      <Grid item xs={3}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendClick}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
}

export default MessageInput;