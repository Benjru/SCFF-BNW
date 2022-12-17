import React, {Component} from "react";
 

// const Planet = (this.props) => ( // Planet image + cat image on top
//     <div>
//         {
//             this.props.planet.cats.length === 0?
//             <React.Fragment>
//                 {
//                     console.log("symbol: " + JSON.stringify(this.props.planetSymbol))
//                 }
//                 <div className="ppiContainer">
//                     <div className="planetSymbolContainer">
//                         <img
//                             className="planetSymbol"
//                             src={`/resist_cards/${this.props.planetSymbol}.jpg`}
//                             alt={this.props.planetName}
//                         />
//                     </div>

//                     <img className="planetImage"
//                         src={`/planets/${this.props.planetName}-planet.jpg`} 
//                         alt={this.props.planetName}
//                     /> 
//                 </div>
//             </React.Fragment>:
//             <React.Fragment>
//                 <div className="ppiContainer">
                    
//                     <div className="catPlanetIndicator">
//                         {/* <h1>catOnPlanet</h1> */}
//                         {
//                             this.props.planet.cats.map(catOnPlanet => {
//                                 // console.log("Inside Planet component. catOnPlant: " + catOnPlanet.name)
//                                 let elements = [];
//                                 elements.push(<h1>{catOnPlanet.name}</h1>);
//                                 // for (let i = 0; i < this.props.planet.holdingAgents; i++){
//                                 //     elements.push(
//                                 //         <img 
//                                 //             className="agent"
//                                 //             src="/secret_agents/secret-agent.jpg"
//                                 //             alt={i}
//                                 //         />
//                                 //     );
//                                 // }
//                                 return elements;
//                             })
//                         }
//                         <img
//                             className="planetSymbolWithCat"
//                             src={`/resist_cards/${this.props.planetSymbol}.jpg`}
//                             alt={this.props.planetName}
//                         />
//                     </div>

//                     <img className="planetImage"
//                         src={`/planets/${this.props.planetName}-planet.jpg`} 
//                         alt={this.props.planetName}
//                     /> 

//                 </div>
//             </React.Fragment>
//         }
//     </div>
// );

class Planet extends Component{


    render(){
        let elements = [];
        // for (let i = 0; i < this.props.planet.secretAgents; i++){
        //     elements.push(
                // <img 
                //     className="agent"
                //     src="/secret_agents/secret-agent.png"
                //     alt={i}
                // />
        //     );
        // }

        elements.push(
            this.props.planet.cats.length === 0?
            <React.Fragment>
                <div className="ppiContainer">
                    <div className="agentContainer">
                        {
                            Array(this.props.planet.secretAgents)
                            .fill()
                            .map((i) => {
                                let returnVal = [];
                                returnVal.push(
                                    <img 
                                        className="agent"
                                        src="/secret_agents/secret-agent.png"
                                        alt={i}
                                    />
                                );
                                return returnVal;
                            })
                        }
                    </div>
                    <div className="planetSymbolContainer">
                        <img
                            className="planetSymbol"
                            src={`/resist_cards/${this.props.planetSymbol}.jpg`}
                            alt={this.props.planetName}
                        />
                    </div>

                    <img className="planetImage"
                        src={`/planets/${this.props.planetName}-planet.jpg`} 
                        alt={this.props.planetName}
                    /> 
                </div>
            </React.Fragment>:
            <React.Fragment>
                <div className="ppiContainer">
                    
                    <div className="catPlanetIndicator">
                        {/* <h1>catOnPlanet</h1> */}
                        {
                            Array(this.props.planet.secretAgents)
                            .fill()
                            .map((i) => {
                                let returnVal = [];
                                returnVal.push(
                                    <img 
                                        className="agentWithCat"
                                        src="/secret_agents/secret-agent.png"
                                        alt={i}
                                    />
                                );
                                return returnVal;
                            })
                        }
                        {
                            this.props.planet.cats.map(catOnPlanet => {
                                // console.log("Inside Planet component. catOnPlant: " + catOnPlanet.name)
                                let returnVal = [];
                                returnVal.push(<h1>{catOnPlanet.name}</h1>);
                                return returnVal;
                            })
                        }
                        <img
                            className="planetSymbolWithCat"
                            src={`/resist_cards/${this.props.planetSymbol}.jpg`}
                            alt={this.props.planetName}
                        />
                    </div>
                    <img className="planetImage"
                        src={`/planets/${this.props.planetName}-planet.jpg`} 
                        alt={this.props.planetName}
                    /> 

                </div>
            </React.Fragment>
        )

        return elements;

    }
}

export default Planet
