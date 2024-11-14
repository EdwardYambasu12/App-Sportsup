import React from "react"
import Mini_Nav from "./mini-nav.jsx"

export default function Search(){


	return(
		<body>
			<Mini_Nav/>
			<br></br>
			<div className = "container">

			<input className = "form-control" placeholder = "Search Team and Leagues" ></input>
			<hr></hr>

			<div className = "bunch_result">
				<div style = {{display : "flex", alignItems : "center", justifyContent : "spaceBetween", width : "100%"}}>
					<div><img src = {require("../images/main_logo.png")} className = "brand_image"></img></div>
					<div><h5>League Name</h5></div>
				</div>
			</div>

			</div>

		</body>
		)
}