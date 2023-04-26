import { useState } from "react";
import { getDaysInYear } from "@/utils/dates";
import { Grid } from "..";

export const Calendar = () => {
  const [zoom, setZoom] = useState(1);
  const days = getDaysInYear(new Date().getFullYear());
  return (
    <>
      <button onClick={() => setZoom(zoom === 1 ? 2 : 1)} style={{ marginBottom: "2rem" }}>
        ZMIEŃ
      </button>
      <Grid days={days} zoom={zoom} />
    </>
  );
};
export default Calendar;
