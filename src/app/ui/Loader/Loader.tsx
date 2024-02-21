'use client'
import { useState, CSSProperties, FC, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

export const Loader:FC = () => {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("blue");

 
  return (
    <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  )
}