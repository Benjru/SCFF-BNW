package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;

import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.planets.PlanetModel;


public class RecruitAllies extends Meowssion {

    public RecruitAllies(){
        super(List.of(4, 5, 6));
    }

    @Override
    public boolean condition(GameStateModel gameState){
        PlanetModel currPlanet = gameState.getCurrTurn().getCurrPlanet();
        return currPlanet.getSecretAgents() > 0 
        && gameState.getActionsTaken().stream().filter(action -> action.action().equals("restock") 
                                                                && action.planet().equals(currPlanet) 
                                                                && currPlanet.getFascismLevel() > 0)
                                                                    .count() > 0;
    }

}
