package com.mounta.spacecats.models.planets;

import com.mounta.spacecats.models.cats.CatModel;

import java.util.Collections;
import java.util.List;
import java.util.Set;

public class PlanetModel {
    private int number;
    
    private int fascismLevel;
    
    private Symbol symbol;

    private Set<PlanetModel> adjacentPlanets;

    private int position;

    private boolean isStronghold;

    private PlanetModel(int number, int fascismLevel, Symbol symbol, Set<PlanetModel> adjacentPlanets, int position, boolean isStronghold) {
        this.number = number;
        this.fascismLevel = fascismLevel;
        this.symbol = symbol;
        this.adjacentPlanets = adjacentPlanets;
        this.position = position;
        this.isStronghold = isStronghold;
    }

    public static PlanetModel create(int number, Symbol symbol, boolean isStronghold){
        return new PlanetModel(number, 0, symbol, Set.of(), -1, isStronghold);
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

    public Set<PlanetModel> getAdjacentPlanets() {
        return this.adjacentPlanets;
    }

    public void setAdjacentPlanets(Set<PlanetModel> adjacentPlanets) { this.adjacentPlanets = adjacentPlanets; }

    public int getPosition() {
        return this.position;
    }

    public void setPosition(int position) { this.position = position; }

    public void updateFascismLevel(int value){
        this.fascismLevel += value;
    }

    public static List<PlanetModel> generateNewPlanets(List<CatModel> cats){
        List<PlanetModel> planets = generateDefaultPlanetList();
        shufflePlanetPositions(planets);
        return planets;
    }

    private static List<PlanetModel> generateDefaultPlanetList(){
        Symbol[] symbols = {Symbol.EARS_SYMBOL, Symbol.WHISKERS_SYMBOL, Symbol.PAW_SYMBOL, Symbol.PAW_SYMBOL};
        List<PlanetModel> planets = List.of();
        for(int i = 0; i<12; i++){
            planets.add(create(i, symbols[i%4], i>7));
        }
        return planets;
    }

    private static void shufflePlanetPositions(List<PlanetModel> planets){
        Collections.shuffle(planets);
        for(int i = 0; i<12; i++){
            PlanetModel planet = planets.get(i);
            planet.setPosition(i + 1);
            Set<PlanetModel> adjacentPlanets = Set.of();
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
}
