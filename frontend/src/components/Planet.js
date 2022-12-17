import React, {Component} from "react";

class Planet extends Component{


    render(){
        let elements = [];

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
