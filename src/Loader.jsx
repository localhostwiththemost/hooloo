import React from "react";
import { useState } from "react";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";

const override = css`
  display: "block",
  margin: "0 auto",
  borderColor: "#1ce783",
`;

function Loader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#1ce783");

  return (
    <>
      <RingLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}

export default Loader;
