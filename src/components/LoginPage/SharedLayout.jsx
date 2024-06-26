// src/components/LoginPage/SharedLayout.jsx
import React from "react";
import {
  Avatar,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Typography,
  createTheme,
  ThemeProvider,
  Link,
} from "@mui/material";
import AppLogoIcon from "./AppLogoIcon";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        PlayItForward
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

const SharedLayout = ({ children, title }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "calc(100vh - 86px)" }}
        mt={10.7}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(/AppLogo.png)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <AppLogoIcon style={{ width: "100%", height: "auto" }} />
            </Avatar>
            <Typography component="h1" variant="h5">
              {title}
            </Typography>
            <Typography component="p" variant="body1" sx={{ mt: 2, mb: 1 }}>
              Welcome to PlayItForward!
            </Typography>
            {children}
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default SharedLayout;
