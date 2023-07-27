import { FC, useCallback } from "react";
import { Tile } from "..";
import { PlacedTiles, TilesProps } from "./types";

const Tiles: FC<TilesProps> = ({ data, zoom, onItemClick }) => {
  const placeTiles = useCallback((): PlacedTiles => {
    let rows = 0;
    return data
      .map((person, personIndex) => {
        if (personIndex > 0) {
          rows += Math.max(data[personIndex - 1].data.length, 1);
        }
        return person.data.map((projectsPerRow, rowIndex) =>
          projectsPerRow.map((project) => (
            <Tile
              key={project.id}
              row={rowIndex + rows}
              data={project}
              zoom={zoom}
              onItemClick={onItemClick}
            />
          ))
        );
      })
      .flat(2);
  }, [data, onItemClick, zoom]);

  return <>{placeTiles()}</>;
};

export default Tiles;
