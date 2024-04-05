import { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import Mails from "./Mails";
import MailContent from "./MailContent";
import DrawerSidebar from "./Drawer";

// const inboxMessages = [
//   {
//     id: 1,
//     name: "Alex Jonnold",
//     avatar: "https://i.pravatar.cc/40?img=3",
//     avatar2x: "https://i.pravatar.cc/80?img=3",
//     date: "21 Oct 2022",
//     title: "Details for our Yosemite Park hike",
//     body: "Hello, my friend! So, it seems that we are getting there…",
//     color: "warning.400",
//   },
//   {
//     id: 2,
//     name: "Pete Sand",
//     avatar: "https://i.pravatar.cc/40?img=4",
//     avatar2x: "https://i.pravatar.cc/80?img=4",
//     date: "06 Jul 2022",
//     title: "Tickets for our upcoming trip",
//     body: "Good day, mate! It seems that our tickets just arrived…",
//     color: "success.400",
//   },
//   {
//     id: 3,
//     name: "Kate Gates",
//     avatar: "https://i.pravatar.cc/40?img=5",
//     avatar2x: "https://i.pravatar.cc/80?img=5",
//     date: "16 May 2022",
//     title: "Brunch this Saturday?",
//     body: "Hey! I'll be around the city this weekend, how about a…",
//     color: "primary.500",
//   },
//   {
//     id: 4,
//     name: "John Snow",
//     avatar: "https://i.pravatar.cc/40?img=7",
//     avatar2x: "https://i.pravatar.cc/80?img=7",
//     date: "10 May 2022",
//     title: "Exciting News!",
//     body: "Hello there! I have some exciting news to share with you...",
//     color: "danger.500",
//   },
// ];

// const sentMessages = [
//   {
//     id: 1,
//     name: "Doina F",
//     avatar: "https://i.pravatar.cc/40?img=3",
//     avatar2x: "https://i.pravatar.cc/80?img=3",
//     date: "21 Oct 2022",
//     title: "Details for our Yosemite Park hike",
//     body: "Hello, my friend! So, it seems that we are getting there…",
//     color: "warning.400",
//   },
//   {
//     id: 2,
//     name: "Amir O",
//     avatar: "https://i.pravatar.cc/40?img=4",
//     avatar2x: "https://i.pravatar.cc/80?img=4",
//     date: "06 Jul 2022",
//     title: "Tickets for our upcoming trip",
//     body: "Good day, mate! It seems that our tickets just arrived…",
//     color: "success.400",
//   },
//   {
//     id: 3,
//     name: "Hanna A",
//     avatar: "https://i.pravatar.cc/40?img=5",
//     avatar2x: "https://i.pravatar.cc/80?img=5",
//     date: "16 May 2022",
//     title: "Brunch this Saturday?",
//     body: "Hey! I'll be around the city this weekend, how about a…",
//     color: "primary.500",
//   },
//   {
//     id: 4,
//     name: "Alevtina B",
//     avatar: "https://i.pravatar.cc/40?img=7",
//     avatar2x: "https://i.pravatar.cc/80?img=7",
//     date: "10 May 2022",
//     title: "Exciting News!",
//     body: "Hello there! I have some exciting news to share with you...",
//     color: "danger.500",
//   },
//   {
//     id: 5,
//     name: "Almira K",
//     avatar: "https://i.pravatar.cc/40?img=7",
//     avatar2x: "https://i.pravatar.cc/80?img=7",
//     date: "10 May 2022",
//     title: "Exciting News!",
//     body: "Hello there! I have some exciting news to share with you...",
//     color: "danger.500",
//   },
// ];

export default function Layout() {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("");

  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      console.log("data", data);
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   // if (filter === "") {
  //   //   setMessages(type === "inbox" ? inboxMessages : sentMessages);
  //   //   return;
  //   // }
  //   const filteredMessages = messages.filter(
  //     (message) =>
  //       message.title.toLowerCase().includes(filter.toLowerCase()) ||
  //       (message.name &&
  //         message.name.toLowerCase().includes(filter.toLowerCase())) ||
  //       (message.body &&
  //         message.body.toLowerCase().includes(filter.toLowerCase()))
  //   );
  //   setMessages(filteredMessages);
  // }, [filter, messages]);

  // useEffect(() => {
  //   setMessages(type === "inbox" ? inboxMessages : sentMessages);
  // }, [type]);

  const handleSearchChange = (value) => {
    setFilter(value);
  };

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    console.log("handle select message", message);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DrawerSidebar />
      <Box sx={{ flex: 1, p: 3 }}>
        <Mails
          data={messages}
          onSearchChange={handleSearchChange}
          filteredMessages={messages}
          onMessageSelect={handleMessageSelect}
        />
      </Box>
      <Box sx={{ flex: 1, p: 3 }}>
        <MailContent message={selectedMessage} />
      </Box>
      {/* <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box> */}
    </Box>
  );
}
