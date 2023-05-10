import { useState } from "react";
import { getDaysInYear } from "@/utils/dates";
import { Grid } from "..";

export const Calendar = () => {
  const [zoom, setZoom] = useState(2);
  const days = getDaysInYear(new Date().getFullYear());
  return (
    <>
      {/* PLACEHOLDER BUTTON FOR CHANGING ZOOM */}
      <button
        onClick={() => setZoom(zoom === 1 ? 2 : 1)}
        style={{ marginBottom: "2rem", position: "fixed", bottom: "0", left: "0" }}>
        ZMIEŃ
      </button>
      {/* PLACEHOLDER BUTTON FOR CHANGING ZOOM */}

      <Grid days={days} zoom={zoom} />
    </>
  );
};

export default Calendar;
