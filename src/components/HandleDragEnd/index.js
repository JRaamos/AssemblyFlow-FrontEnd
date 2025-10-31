import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function HandleDragEnd({ program, save, children }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(program.rows);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    save({ ...program, rows: reordered });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="program-table" isDropDisabled={false}>
        {(provided) => (
          <tbody ref={provided.innerRef} {...provided.droppableProps}>
            {children(provided)}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
}