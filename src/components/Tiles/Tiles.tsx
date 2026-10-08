import { FC, useCallback } from "react";
import { Tile } from "..";
import { PlacedTiles, TilesProps } from "./types";

const Tiles: FC<TilesProps> = ({
  data,
  zoom,
  onTileClick,
  onTileMove,
  onTileDragStart,
  onTileDragEnd
}) => {
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
              onTileClick={onTileClick}
              draggable={!!onTileMove && project.draggable !== false}
              onDragStart={(grabOffset) =>
                onTileDragStart?.({ project, resourceId: person.id, grabOffset })
              }
              onDragEnd={onTileDragEnd}
            />
          ))
        );
      })
      .flat(2);
  }, [data, onTileClick, onTileDragEnd, onTileDragStart, onTileMove, zoom]);

  return <>{placeTiles()}</>;
};

export default Tiles;
