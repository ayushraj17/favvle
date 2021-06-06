// import "../styles/globals.css";
import React from "react";
import Head from "next/head";
// import $ from "jquery";
// import Popper from "popper.js";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";

import { ThemeProvider } from "@material-ui/core/styles";
import "../functionalities/index.js";
// import "../assets/css/About.css";
// import "../assets/css/LandingPage.css";
// import "../assets/css/All.css";

function MyApp({ Component, pageProps }) {
	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<meta charset="utf-8" />
				<link rel="icon" href="/favicon.ico" />
				<meta name="viewport" content="width=device-width,initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="Web site created using create-react-app"
				/>
				<link rel="apple-touch-icon" href="/logo192.png" />
				<link rel="manifest" href="/manifest.json" />

				<title>Favvle Application</title>

				{/* <!-- Latest compiled and minified CSS --> */}
				{/* <link
					rel="stylesheet"
					href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
				/> */}

				{/* <!-- jQuery library --> */}
				{/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> */}

				{/* <!-- Popper JS --> */}
				{/* <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script> */}

				{/* <!-- Latest compiled JavaScript --> */}
				{/* <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> */}
				{/* <link rel="stylesheet" href="./css/bootstrap.min.css" /> */}

				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
					integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
					crossOrigin="anonymous"
				/>

				<script
					src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
					integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
					crossOrigin="anonymous"
				></script>
				<script
					src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
					crossOrigin="anonymous"
				></script>
				<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDs2DwGVyrB4fY9TXyzllHNkB4YtzmKKsU&libraries=places"></script>
			</Head>
			{/* <ThemeProvider> */}
			<Component {...pageProps} />
			{/* </ThemeProvider> */}
		</>
	);
}

export default MyApp;
