package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;
import java.util.Map;

import com.mounta.spacecats.models.gamestate.GameStateModel;


public class FreeTheDogs extends Meowssion {

    public FreeTheDogs(){
        super(List.of(10, 11, 12));
    }

    @Override
    public boolean condition(GameStateModel gameState){
        Map<String, Integer> pointVals = Map.of("ResistEffect_A", 1, "ResistEffect_F", 2);
        return gameState.getActionsTaken().stream().filter(action -> pointVals.containsKey(action.cardName())).mapToInt(action -> pointVals.get(action.cardName())).sum() >= 3 
        && gameState.getCurrTurn().getCurrPlanet().getSecretAgents() > 0;
    }
}
