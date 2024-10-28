import { FC, useCallback } from "react";
import { Tile } from "..";
import { PlacedTiles, TilesProps } from "./types";

const Tiles: FC<TilesProps> = ({ data, zoom, rowsPerItem, onTileClick }) => {
  const placeTiles = useCallback((): PlacedTiles => {
    let rows = 0;
    return data
      .map((room, roomIndex) => {
        if (roomIndex > 0) rows += Math.max(rowsPerItem[roomIndex - 1]);

        let pointer = 1;

        return room.seats.flatMap((seat, seatIndex) => {
          if (seatIndex > 0) pointer += room.seats[seatIndex - 1].data.length;

          return seat.data.flatMap((row, rowIndex) =>
            row.map((item) => (
              <Tile
                key={item.id}
                row={rows + rowIndex + pointer}
                data={item}
                zoom={zoom}
                room={room.id}
                seat={seat.id}
                onTileClick={onTileClick}
              />
            ))
          );
        });
      })
      .flat(2);
  }, [data, rowsPerItem, onTileClick, zoom]);

  return <>{placeTiles()}</>;
};

export default Tiles;
