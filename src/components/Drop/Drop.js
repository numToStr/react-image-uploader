import React, { Component } from "react";
import DropContext from "./DropperList/DropContext/DropContext";
import DropperList from "./DropperList/DropperList";

// items generator
const getItems = count =>
	Array.from({ length: count }, (v, k) => k).map(k => ({
		id: `item-${k}`
	}));

class Drop extends Component {
	state = {
		items: getItems(this.props.items)
	};

	// a little function to help us with reordering the result
	reorder = (list, startIndex, endIndex) => {
		const result = [...list];
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	onDragEnd = result => {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		const items = this.reorder(
			this.state.items,
			result.source.index,
			result.destination.index
		);

		this.setState({
			items
		});
	};

	droppable = (provided, snapshot) => {
		const { items } = this.state;

		return (
			<DropperList
				items={items}
				provided={provided}
				snapshot={snapshot}
			/>
		);
	};

	// Normally you would want to split things out into separate components.
	// But in this example everything is just done in one place for simplicity
	render() {
		const { onDragEnd, droppable } = this;

		return <DropContext onDragEnd={onDragEnd}>{droppable}</DropContext>;
	}
}

export default Drop;
