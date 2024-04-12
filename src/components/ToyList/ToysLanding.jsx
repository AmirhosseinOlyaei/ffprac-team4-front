import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import GoogleMaps from "./GoogleMaps";
import Create from "./Create";
import Search from "./Search";
import { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  Divider,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ToyCard from "./ToyCard";
import ToyListMap from "./ToyListMap";
import Category from "./Category";
import CustomToolbar from "./CustomToolbar";

const drawerWidth = 340;

export default function ToysLanding() {
  const [delivery, setDelivery] = useState("All");
  const [toys, setToys] = useState([]);
  const [viewType, setViewType] = useState(false);
  const [location, setLocation] = useState("");

  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/toys");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const toys = await response.json();
        setToys(toys);
      } catch (error) {
        console.error("Failed to fetch toys:", error);
      }
    }
    fetchData();
  }, []);

  async function fetchToys(deliveryMethod, locationPlaceId) {
    let queryParts = [];
    if (deliveryMethod && deliveryMethod !== "All") {
      queryParts.push(`deliveryMethod=${encodeURIComponent(deliveryMethod)}`);
    }
    if (locationPlaceId) {
      queryParts.push(`location=${encodeURIComponent(locationPlaceId)}`);
    }
    const queryString = queryParts.length ? `?${queryParts.join("&")}` : "";

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/toys${queryString}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const filteredToys = await response.json();
      setToys(filteredToys);
    } catch (error) {
      console.error("Failed to fetch toys:", error);
    }
  }

  return (
    <Box sx={{ display: "flex" }} backgroundColor="#fdfdfd">
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
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
            <Search />
          </Grid>

          {/* Create */}
          <Grid item xs={12} sm={12} my={2}>
            <Create />
          </Grid>

          <Divider />

          {/* Filters */}
          <Typography variant="h6" my={2}>
            Filters
          </Typography>
          <Grid item xs={12} sm={12} my={1}>
            <GoogleMaps
              onLocationSelect={(selectedValue) => {
                // Use optional chaining in case selectedValue is null or undefined.
                const placeId = selectedValue?.place_id;
                if (placeId) {
                  fetchToys(delivery, placeId);
                }
              }}
            />
          </Grid>

          {/* delivery */}
          <Grid item xs={12} sm={12} my={2}>
            <FormControl fullWidth>
              <InputLabel id="select-label">Delivery Method</InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={delivery}
                fullWidth
                label="Delivery Method"
                onChange={(event) => {
                  const newDeliveryMethod = event.target.value;
                  setDelivery(newDeliveryMethod);
                  // Use optional chaining to safely access location's place_id
                  const placeId = location?.place_id || "";
                  fetchToys(newDeliveryMethod, placeId);
                }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pick up">Pick up</MenuItem>
                <MenuItem value="Drop off">Drop off</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Divider />

          {/* categories */}
          <Grid item xs={12} sm={12} my={2}>
            <Category />
          </Grid>

          <Divider />

          {/* Views */}
          <Typography variant="h6" mt={2} mb={4}>
            Views
          </Typography>
          <Grid item xs={12} sm={12} m={-3}>
            <CustomToolbar viewType={viewType} setViewType={setViewType} />
          </Grid>
        </Grid>
      </Drawer>

      {/* Main section */}
      <Grid container mt={11}>
        <Grid container columns={{ xs: 2, sm: 4, md: 8, lg: 12 }} m={2}>
          {viewType ? (
            <Grid item xs={12} sm={12} m={1}>
              <ToyListMap />
            </Grid>
          ) : (
            toys.map((toy) => (
              <Grid
                item
                // spacing={2}
                m={1}
                key={toy._id}
                sx={{
                  flexGrow: 1,
                }}
              >
                <ToyCard
                  title={toy.title}
                  // image={toy.image}
                  location={toy.zip_code}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
