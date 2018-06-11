import React from "react";
import Dropper from "./Dropper/Dropper";

/* const getListStyle = isDraggingOver => ({
	// background: isDraggingOver ? "lightblue" : "lightgrey",
	display: "flex",
	padding: ".5rem",
	overflow: "auto"
}); */

const DropperList = ({ items, provided, snapshot }) => {
	return (
		<div
			ref={provided.innerRef}
			// style={getListStyle(snapshot.isDraggingOver)}
			style={{
				display: "flex",
				padding: ".5rem",
				overflow: "auto"
			}}
			{...provided.droppableProps}
		>
			{items.map((item, index) => (
				<Dropper item={item} key={item.id} index={index} />
			))}
			{provided.placeholder}
		</div>
	);
};

export default DropperList;
