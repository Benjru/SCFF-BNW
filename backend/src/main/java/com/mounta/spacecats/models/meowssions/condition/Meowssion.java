package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;

import com.mounta.spacecats.models.gamestate.GameStateModel;

public abstract class Meowssion {

    private List<Integer> startLocations;

    public Meowssion(List<Integer> startLocations){
        this.startLocations = startLocations;
    }

    public List<Integer> getStartLocations(){
        return startLocations;
    }

    public boolean condition(GameStateModel gameState){
        return false;
    }
}
