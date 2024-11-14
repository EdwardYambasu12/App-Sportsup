import React from "react"
import "./matches.css"

export default function Favorites(){


	return(
	<div>		
	<div className = "items">
			<div className = "league_description">
					<img alt = "league_logo" src = {require("../images/main_logo.png")} id = "logo"></img>
					<h6>League Name</h6>
					<h6>Yesterday</h6>


			</div>


			{/* GROUP OF MATCHE */}
			<div className = "matches">
				<div className = "team_and_badge">


				{/* HOME TEAM BADGE AND NAME */}
					<span className = "team_and_badge_a">
					<div id = "flexing">
						<img alt = "home_team_badge" src = {require("../images/main_logo.png")} id = "logo_id"></img>
						<p className = "home_team_title">Home Team</p>

					</div>	
						<div className = "away_score">0</div>
					</span>
					{/* AWAY TEAM BADGE AND NAME */}
					<span className = "team_and_badge_b">
					<div id = "flexing">
						<img alt = "home_team_badge" src = {require("../images/main_logo.png")} id = "logo_id"></img>
						<p className = "home_team_title">Home Team</p>
					</div>	
						<div className = "home_score">0</div>

					</span>

				</div>
				<div className = "end">
				{/*TIME OR STATUS */}
				<div><span className = "time_span">85<span className = "live_dot">'</span></span></div>


		
				{/* LIVE */}
				<div><span className = "live">live</span></div>
				</div>
			</div>

</div>
	</div>
		)
}