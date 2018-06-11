import React, { Component, Fragment } from "react";
import Drop from "./components/Drop/Drop";
import { Typography } from "@material-ui/core";

class App extends Component {
	render() {
		return (
			<Fragment>
				{/* Just specify the count of image container  */}
				<Drop items={6} />
				<Typography variant="display1">
					Note: On reloading the items order will be reset
				</Typography>
			</Fragment>
		);
	}
}

export default App;
