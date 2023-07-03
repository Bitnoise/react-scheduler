import { FC, useCallback } from "react";
import { Tile } from "..";
import { PlacedTiles, TilesProps } from "./types";

const Tiles: FC<TilesProps> = ({ data, zoom }) => {
  const placeTiles = useCallback((): PlacedTiles => {
    let rows = 0;
    return data
      .map((person, personIndex) => {
        if (personIndex > 0) {
          rows += Math.max(data[personIndex - 1].length, 1);
        }
        return person.map((projectsPerRow, rowIndex) =>
          projectsPerRow.map((project) => (
            <Tile key={project.id} row={rowIndex + rows} data={project} zoom={zoom} />
          ))
        );
      })
      .flat(2);
  }, [data, zoom]);

  return <>{placeTiles()}</>;
};

export default Tiles;
