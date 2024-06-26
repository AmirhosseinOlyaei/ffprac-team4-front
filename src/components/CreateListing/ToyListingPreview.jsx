import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PhotoSizeSelectActualTwoToneIcon from "@mui/icons-material/PhotoSizeSelectActualTwoTone";
import Avatar from "@mui/material/Avatar";
import { getUserContext } from "../../context/userContext";
import LettersAvatar from "../ListingDetail/LettersAvatar";

const apiUrl = import.meta.env.VITE_API_URL;

const ToyListingPreview = ({
  title,
  description,
  condition,
  delivery,
  selectedFile,
  value,
  toy,
  fetchedFileName,
  userId,
}) => {
  console.log("toyPreview", toy);
  console.log("selectedFile", selectedFile);
  console.log("fetchedFileName", fetchedFileName);

  const { user } = getUserContext();
  const userData = {
    listingDate: new Date().toLocaleDateString(),
  };
  const [userInfo, setUserInfo] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      if (user && user._id) {
        const response = await fetch(`${apiUrl}/users/${user._id}`);
        const currentUser = await response.json();
        console.log("curUser", currentUser);
        setUserInfo(currentUser);
      }
    }
    fetchUserData();
  }, [userId]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "86vh" }}
    >
      <Box
        component="main"
        sx={{
          alignItems: "center",
          flexGrow: 1,
          p: 3,
          marginTop: "104px",
          border: "1px solid lightgrey",
          borderRadius: "5px",
          boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",
          height: "84vh",
          marginLeft: "20px",
          marginRight: "20px",
          maxWidth: "1000px",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <Typography variant="h6" sx={{ m: 2 }}>
          Preview
        </Typography>

        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            height: "80vh",
            border: "1px solid lightgrey",
            maxWidth: "1000px",
          }}
        >
          <CardActionArea sx={{ backgroundColor: "#f0f0f0" }}>
            {selectedFile ? (
              <CardMedia
                component="img"
                image={
                  selectedFile.name !== fetchedFileName
                    ? URL.createObjectURL(selectedFile)
                    : toy.imageUrl
                }
              />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <span style={{ fontSize: 20 }}>
                  <PhotoSizeSelectActualTwoToneIcon
                    sx={{ fontSize: 60, color: "grey" }}
                  />
                </span>
              </Box>
            )}
          </CardActionArea>

          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              borderLeft: "1px solid lightgrey",

              width: "300px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
              }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ mb: 0.5, fontWeight: "bold" }}
              >
                {title}
              </Typography>

              <Typography
                gutterBottom
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Listed on {userData.listingDate}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {value ? value.description : null}
              </Typography>

              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Details
              </Typography>

              <Box sx={{ width: "100%" }}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  <Grid item xs={6}>
                    <Typography variant="body1">Condition</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      {condition}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      Delivery method
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      {delivery}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 0.5, fontSize: "15px" }}
              >
                {description}
              </Typography>
              <Divider sx={{ marginTop: 2, width: "290px" }} />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 2, mb: 1 }}
              >
                Toy giver information
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Grid item xs={2}>
                    <Box>
                      {userInfo.profile_picture ? (
                        <Avatar
                          src={userInfo.profile_picture}
                          variant="rounded"
                          sx={{
                            width: 60,
                            height: 60,
                            borderRadius: 35,
                            disabled: true,
                            bgcolor: "red",
                            color: "#000",
                            opacity: 0.5,
                          }}
                          alt="profile picture"
                        />
                      ) : (
                        userInfo.first_name &&
                        userInfo.last_name && (
                          <LettersAvatar
                            sx={{
                              marginLeft: 0.4,
                              width: "50px",
                              height: "50px",
                              fontSize: "25px",
                            }}
                            firstName={userInfo.first_name}
                            lastName={userInfo.last_name}
                          />
                        )
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={10}>
                    <div>
                      <Typography
                        variant="body1"
                        sx={{
                          marginLeft: 2,
                          lineHeight: 1.5,
                        }}
                      >
                        {userInfo.nickname}
                      </Typography>
                    </div>
                    {/* </Typography> */}
                  </Grid>
                </Grid>
              </Box>
            </CardContent>

            <Button
              variant="contained"
              disabled
              sx={{
                marginTop: "20px",
                width: "290px",
                border: "2px solid lightgrey",
              }}
            >
              Message
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Grid>
  );
};
export default ToyListingPreview;
