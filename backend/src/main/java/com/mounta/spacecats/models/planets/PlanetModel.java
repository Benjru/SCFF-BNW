package com.mounta.spacecats.models.planets;

import java.util.Set;

public class PlanetModel {
    private int number;
    
    private int fascismLevel;
    
    private Symbol symbol;

    private Set<PlanetModel> adjacentPlanets;

    private int position;


    public PlanetModel(int number, int fascismLevel, Symbol symbol, Set<PlanetModel> adjacentPlanets, int position) {
        this.number = number;
        this.fascismLevel = fascismLevel;
        this.symbol = symbol;
        this.adjacentPlanets = adjacentPlanets;
        this.position = position;
    }


    public int getNumber() {
        return this.number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public int getFascismLevel() {
        return this.fascismLevel;
    }

    public Symbol getSymbol() {
        return this.symbol;
    }


    public Set<PlanetModel> getAdjacentPlanets() {
        return this.adjacentPlanets;
    }

    public int getPosition() {
        return this.position;
    }

    public void updateFascismLevel(int value){
        this.fascismLevel += value;
    }
}
