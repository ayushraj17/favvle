import { withRouter } from "next/router";
import React from "react";

const index = (props) => {
	React.useLayoutEffect(() => {
		props.router.push("/admin/AdminLogin");
	}, []);
	// console.log(props);
	return <div>hello</div>;
};

export default withRouter(index);
