// src/components/ToyList/ToysLanding.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Grid,
  IconButton,
  Chip,
} from "@mui/material";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CssBaseline from "@mui/material/CssBaseline";
import Create from "./Create";
import Search from "./Search";
import ToyListMap from "./ToyListMap";
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";
import ToyList from "./ToyList";
import DeliveryFilter from "./DeliveryFilter";
import GoogleZip from "./GoogleZip";
import { useParams, useNavigate } from "react-router-dom";
import ListingDetail from "../ListingDetail";
import { getUserContext } from "../../context/userContext";
import TermsAndConditions from "../LoginPage/TermsAndConditions";

const drawerWidth = 340;

export default function ToysLanding() {
  const { user } = getUserContext();
  console.log({ user });
  const authorizedUser = user ? user._id : "";
  const apiUrl = import.meta.env.VITE_API_URL;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const { selectedToyId } = useParams();

  const [open, setOpen] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  useEffect(() => {
    // Fetch user's agreement status when component mounts
    const fetchTermsAgreement = async () => {
      try {
        const response = await fetch(`${apiUrl}/terms/check/${authorizedUser}`);
        const data = await response.json();
        setTermsAgreed(data.termsAndConditions);
        setOpen(!data.termsAndConditions);
      } catch (error) {
        console.error("Error fetching terms agreement:", error);
      }
    };

    if (authorizedUser !== "") {
      fetchTermsAgreement();
    }
  }, [authorizedUser]);

  useEffect(() => {
    const fetchToys = async () => {
      const queryParams = [];
      if (delivery !== "All") {
        queryParams.push(`delivery_method=${encodeURIComponent(delivery)}`);
      }
      if (selectedCategories.length > 0) {
        queryParams.push(
          `categories=${encodeURIComponent(selectedCategories.join(","))}`
        );
      }
      if (zipCode) {
        queryParams.push(`zipCodes=${encodeURIComponent(zipCode)}`); // Directly use zipCode
      }
      if (searchKeyword.trim() !== "") {
        queryParams.push(`search=${encodeURIComponent(searchKeyword)}`);
      }

      const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

      try {
        if (!apiUrl) {
          throw new Error(
            "API URL is not defined in the environment variables."
          );
        }
        const response = await axios.get(`${apiUrl}/toys/${queryString}`);
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Received malformed data from API");
        }
        setToys(response.data);
      } catch (err) {
        console.error("Error fetching toys:", err.message || "Unknown error");
        setError("Failed to fetch toys from the server.");
        setToys([]); // Ensure toys are reset on error
      }
    };

    fetchToys();
  }, [delivery, selectedCategories, zipCode, searchKeyword]);

  const handleZipCodeChange = (newZipCode) => {
    setZipCode(newZipCode) || "";
    // You can also trigger a re-fetch or filter update here
  };
  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation); // Update the location state based on selection
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCardClick = (toyId) => {
    const scrollPosition = window.scrollY;
    localStorage.setItem("scrollPosition", scrollPosition.toString());
    navigate(`/toys/${toyId}`); // Navigate to the detail page
  };

  const handleClose = async (agree) => {
    if (agree) {
      const response = await fetch(`${apiUrl}/terms/agree/${authorizedUser}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: null,
      });

      if (!response.ok) {
        throw new Error("Failed to agree to terms");
      }
      setOpen(false);
    } else {
      setOpen(false);
      window.location.href = `${apiUrl}/auth/logout`;
    }
  };

  return (
    <Box sx={{ display: "flex" }} backgroundColor="#fdfdfd">
      <TermsAndConditions
        open={open}
        handleClose={handleClose}
        setOpen={setOpen}
      />
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          position: "fixed",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginRight: 2,
          display: { sm: "none" },
          top: 86,
          left: 35,
          backgroundColor: "rgba(33, 150, 253, 0.8)",
          color: "white",
          borderRadius: 2,
          width: 60,
          height: 25,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        <MenuOpenIcon />
      </IconButton>

      {/* side nav bar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "86px",
            paddingBottom: "120px",
          },
        }}
      >
        {/* side nav contents */}
        <Grid item xs={11} sm={11} p={2}>
          {/* Search */}
          <Grid item xs={12} sm={12} mt={1}>
            <Search onSearchChange={setSearchKeyword} />
          </Grid>

          {/* Create */}
          {user && (
            <>
              <Grid item xs={12} sm={12} my={2}>
                <Create />
              </Grid>

              <Divider />
            </>
          )}

          {/* Filters */}
          <Typography variant="h6" my={2}>
            Filters
          </Typography>

          {/* Location */}
          <Grid item xs={12} sm={12} my={1}>
            <GoogleZip
              onZipCodeChange={handleZipCodeChange}
              value={selectedLocation}
              onValueChangeLocation={handleLocationChange}
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} my={2}>
            <DeliveryFilter delivery={delivery} setDelivery={setDelivery} />
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category setSelectedCategories={setSelectedCategories} />
          </Grid>

          <Divider />

          {/* Views */}
          <Typography variant="h6" mt={2} mb={4}>
            Views
          </Typography>
          <Grid item xs={12} sm={12} m={-2} mb={1}>
            <CustomToolbar viewType={viewType} setViewType={setViewType} />
          </Grid>

          <Divider />

          {/* counter */}
          <Typography variant="h6" mt={2} mb={4}>
            Total Toys: {toys.length}
          </Typography>
        </Grid>
      </Drawer>

      {/* Permanent drawer for larger screens */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "86px",
            paddingBottom: "120px",
          },
        }}
      >
        {/* side nav contents */}
        <Grid item xs={11} sm={11} p={2}>
          {/* Search */}
          <Grid item xs={12} sm={12} mt={1}>
            <Search onSearchChange={setSearchKeyword} />
          </Grid>

          {/* Create */}
          {user && (
            <>
              <Grid item xs={12} sm={12} my={2}>
                <Create />
              </Grid>

              <Divider />
            </>
          )}
          {/* counter */}
          <Grid item xs={12} sm={12} mt={2} mb={2}>
            <Chip label={`${toys.length} toys found`} />
          </Grid>
          <Divider />

          {/* Filters */}
          <Typography variant="h6" my={2}>
            Filters
          </Typography>

          {/* Location */}
          <Grid item xs={12} sm={12} my={1}>
            <GoogleZip
              onZipCodeChange={handleZipCodeChange}
              value={selectedLocation}
              onValueChangeLocation={handleLocationChange}
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} my={2}>
            <DeliveryFilter delivery={delivery} setDelivery={setDelivery} />
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category setSelectedCategories={setSelectedCategories} />
          </Grid>

          <Divider />

          {/* Views */}
          <Typography variant="h6" mt={2} mb={4}>
            Views
          </Typography>
          <Grid item xs={12} sm={12} m={-3} mb={1}>
            <CustomToolbar viewType={viewType} setViewType={setViewType} />
          </Grid>

          {/* <Divider /> */}
        </Grid>
      </Drawer>

      {/* Main section */}
      <Grid container spacing={0} mt={12}>
        {viewType ? (
          <Grid item xs={12} sm={12} m={2}>
            <ToyListMap toysData={toys} onCardClick={handleCardClick} />
          </Grid>
        ) : (
          <ToyList toys={toys} onCardClick={handleCardClick} />
        )}
      </Grid>
      {selectedToyId && (
        <ListingDetail id={selectedToyId} onClose={() => navigate(-1)} />
      )}
    </Box>
  );
}
