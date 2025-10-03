import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Backdrop } from "@mui/material";


export default function Loader() {
  const loading = useSelector((state: any) => state.loader.loading);

 return (
    <Backdrop
      open={loading}
      sx={{
        color: "#fff",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
