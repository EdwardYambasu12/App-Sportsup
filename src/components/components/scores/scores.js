import React from "react";
import "./scores.css"
import Leagues from "../leagues/leagues";
import Matches from "./matches";

function Scores(){
   
    return(
        <>
            <div className="row">

                <div className="col-md-2 order-md-1">
                    <h3 className="text-center text-light">Leagues</h3>
                    <Leagues/>
                </div>

                <div className="col-md-8 order-md-2" id="scores_line">
                    <h3 className="text-center" id="main_txt">Scores</h3>
                    <Matches/>
                    
                </div>

                <div className="col-md-2 order-md-3">
                    <h3 className="text-center">Ads</h3>
                </div>
            </div>
        </>
    )
}

export default Scores