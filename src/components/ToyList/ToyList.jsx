// src/components/ToyList/ToyList.jsx
import React from "react";
import { Grid } from "@mui/material";
import ToyCard from "./ToyCard";

function ToyList({ toys, error, onCardClick }) {
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container>
      {toys.map((toy) => (
        <Grid item flexGrow={1} m={1} key={toy._id}>
          <ToyCard
            toyId={toy._id}
            title={toy.title}
            imageUrl={toy.imageUrl}
            location={toy.zip_code}
            onCardClick={onCardClick}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default ToyList;
