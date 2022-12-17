package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mounta.spacecats.models.gamestate.GameStateModel;

@JsonIgnoreProperties(value = {
    "startLocations"
})
public abstract class Meowssion {
    
    private List<Integer> startLocations;
    private String id;

    public Meowssion(List<Integer> startLocations, String className){
        this.startLocations = startLocations;
        this.id = className;
    }

    public List<Integer> getStartLocations(){
        return startLocations;
    }

    public boolean condition(GameStateModel gameState){
        return false;
    }

    public String getId(){
        return id;
    }
}
