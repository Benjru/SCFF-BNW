package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;

import com.mounta.spacecats.models.actions.ActionLog;
import com.mounta.spacecats.models.gamestate.GameStateModel;


public class BuildANetwork extends Meowssion {

    public BuildANetwork(){
        super(List.of(7, 8, 9));
    }

    @Override
    public boolean condition(GameStateModel gameState){
        List<ActionLog> conditionsMet = gameState.getActionsTaken().stream().filter(action -> action.action().equals("playCard")).filter(action -> action.planet().getFascismLevel() > 0).toList();
        return conditionsMet.size() >= 2 && gameState.getActionsTaken().stream().allMatch(action -> conditionsMet.get(0).planet().equals(action.planet()) && action.planet().getSecretAgents() > 0);
    }
}
