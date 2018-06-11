import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DropContext = ({ onDragEnd, children }) => {
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable" direction="horizontal">
				{children}
			</Droppable>
		</DragDropContext>
	);
};

export default DropContext;
