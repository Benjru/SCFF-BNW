package com.mounta.spacecats.models.planets;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;

@JsonIgnoreProperties(value = {
    "adjacentPlanets",
    "isStronghold"
})
public class PlanetModel {
    private int number;
    
    private int fascismLevel;
    
    private Symbol symbol;

    private HashSet<PlanetModel> adjacentPlanets;

    private int position;

    private boolean isStronghold;

    private int secretAgents;

    private PlanetModel(int number, int fascismLevel, Symbol symbol, HashSet<PlanetModel> adjacentPlanets, int position, boolean isStronghold, int secretAgents) {
        this.number = number;
        this.fascismLevel = fascismLevel;
        this.symbol = symbol;
        this.adjacentPlanets = adjacentPlanets;
        this.position = position;
        this.isStronghold = isStronghold;
        this.secretAgents = secretAgents;
    }

    public PlanetModel clone(){
        return new PlanetModel(this.number, this.fascismLevel, this.symbol, this.adjacentPlanets, this.position, this.isStronghold, this.secretAgents);
    }

    public static PlanetModel create(int number, Symbol symbol, boolean isStronghold){
        return new PlanetModel(number, 1 - (number % 2), symbol, new HashSet<>(), -1, isStronghold, 0);
    }

    public int getNumber() {
        return this.number;
    }

    public int getFascismLevel() {
        return this.fascismLevel;
    }

    public Symbol getSymbol() {
        return this.symbol;
    }

    public HashSet<PlanetModel> getAdjacentPlanets() {
        return this.adjacentPlanets;
    }

    public int getSecretAgents(){
        return secretAgents;
    }

    public void updateSecretAgents(int val){
        if(val > secretAgents && secretAgents < 0){
            throw new IllegalArgumentException("Cannot remove " + val + " secret agents from planet " + this.number + " as it only has " + secretAgents + " agents present");
        }
        secretAgents += val;
    }

    public boolean getIsStronghold(){ return this.isStronghold; }

    public void setAdjacentPlanets(HashSet<PlanetModel> adjacentPlanets) { this.adjacentPlanets = adjacentPlanets; }

    public int getPosition() {
        return this.position;
    }

    public void setPosition(int position) { this.position = position; }

    public void updateFascismLevel(int value){
        this.fascismLevel += value;
    }

    public static ArrayList<PlanetModel> generateNewPlanets(){
        ArrayList<PlanetModel> planets = generateDefaultPlanetList();
        shufflePlanetPositions(planets);
        return planets;
    }

    private static ArrayList<PlanetModel> generateDefaultPlanetList(){
        Symbol[] symbols = {Symbol.EARS_SYMBOL, Symbol.WHISKERS_SYMBOL, Symbol.PAW_SYMBOL, Symbol.TAIL_SYMBOL};
        ArrayList<PlanetModel> planets = new ArrayList<>();
        for(int i = 0; i<12; i++){
            planets.add(create(i+1, symbols[i%4], i>7));
        }
        return planets;
    }

    private static void shufflePlanetPositions(ArrayList<PlanetModel> planets){
        Collections.shuffle(planets);
        for(int i = 0; i<12; i++){
            PlanetModel planet = planets.get(i);
            planet.setPosition(i + 1);
            HashSet<PlanetModel> adjacentPlanets = new HashSet<>();
            if(i%4 > 0){
                adjacentPlanets.add(planets.get(i-1));
            }
            if(i%4 < 3){
                adjacentPlanets.add(planets.get(i+1));
            }
            if(i+4 < 12){
                adjacentPlanets.add(planets.get(i+4));
            }
            if(i-4 >= 0){
                adjacentPlanets.add(planets.get(i-4));
            }
            planet.setAdjacentPlanets(adjacentPlanets);
        }
    }


    @Override
    public String toString() {
        return "{" +
            " number='" + getNumber() + "'" +
            ", fascismLevel='" + getFascismLevel() + "'" +
            ", symbol='" + getSymbol() + "'" +
            ", position='" + getPosition() + "'" +
            "}";
    }

}
