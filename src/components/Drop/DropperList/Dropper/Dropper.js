import React, { Component, Fragment } from "react";
import {
	Card,
	CardMedia,
	CardContent,
	withStyles,
	Typography,
	Button
} from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import Dropzone from "react-dropzone";
import DeleteIcon from "@material-ui/icons/Delete";

const getItemStyle = (isDragging, draggableStyle) => ({
	// some basic styles to make the items look a bit nicer
	userSelect: "none",
	margin: ".5rem",

	// change background colour if dragging
	// background: isDragging ? "lightgreen" : "grey",

	// styles we need to apply on draggables
	...draggableStyle
});

const styles = theme => {
	return {
		card: {
			height: "10rem",
			width: "10rem"
		},
		cover: {
			height: "100%",
			backgroundSize: "cover"
		},
		btn: {
			position: "absolute",
			bottom: "-5%",
			right: "-5%",
			zIndex: 1
		}
	};
};

class Dropper extends Component {
	state = {
		image: null
	};

	componentDidMount() {
		const {
			item: { id }
		} = this.props;

		const image = localStorage.getItem(`image-${id}`);

		if (image) {
			this.setState({
				image
			});
		}
	}

	onDrop = key => (acceptedFiles, rejectedFiles) => {
		if (rejectedFiles.length) {
			alert("Sorryy... Your file is rejected");
			// for destroying rejected files
			window.URL.revokeObjectURL(rejectedFiles[0].preview);
		} else {
			acceptedFiles.forEach(file => {
				const reader = new FileReader();

				reader.onabort = () => new Error("file reading was aborted");
				reader.onerror = () => new Error("file reading has failed");

				// converting image blob to base64
				reader.readAsDataURL(file);

				reader.onload = () => {
					const fileAsBinaryString = reader.result;
					// Save image into localStorage
					try {
						this.setState({
							image: fileAsBinaryString
						});
						localStorage.setItem(
							`image-${key}`,
							fileAsBinaryString
						);
					} catch (e) {
						console.log("Storage failed: " + e);
					}
				};
			});
		}
	};

	removeImage = () => {
		const {
			item: { id }
		} = this.props;

		this.setState({
			image: null
		});
		localStorage.removeItem(`image-${id}`);
	};

	render() {
		const { onDrop, removeImage } = this;
		const { image } = this.state;
		const { item, classes, index } = this.props;

		return (
			<Draggable key={item.id} draggableId={item.id} index={index}>
				{(provided, snapshot) => (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={getItemStyle(
							snapshot.isDragging,
							provided.draggableProps.style
						)}
					>
						<div style={{ position: "relative" }}>
							<Dropzone
								style={{
									border: "none"
								}}
								maxSize={1000000}
								multiple={false}
								accept="image/jpeg, image/png"
								onDrop={onDrop(item.id)}
							>
								<Card
									className={classes.card}
									style={{
										background: image
									}}
								>
									{image ? (
										<Fragment>
											<CardMedia
												className={classes.cover}
												image={image}
												title="Contemplative Reptile"
											/>
										</Fragment>
									) : (
										<CardContent>
											<Typography
												variant="caption"
												align="center"
											>
												Click or Drop image <br /> to
												upload <br />
												Max Size: 1mb<br />
												Image Types: PNG, JPEG
											</Typography>
										</CardContent>
									)}
								</Card>
							</Dropzone>
							{image && (
								<Button
									className={classes.btn}
									mini
									variant="fab"
									color="secondary"
									onClick={removeImage}
								>
									<DeleteIcon />
								</Button>
							)}
						</div>
					</div>
				)}
			</Draggable>
		);
	}
}

export default withStyles(styles)(Dropper);
