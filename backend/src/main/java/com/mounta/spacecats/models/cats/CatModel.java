package com.mounta.spacecats.models.cats;

import java.util.List;

import com.mounta.spacecats.controllers.EffectController;
import com.mounta.spacecats.models.planets.PlanetModel;

public class CatModel {
    private String name;

    private List<EffectController> abilities;

    private int scratches;

    private PlanetModel homePlanet;

    private PlanetModel currPlanet;

    private long playerId;


    public CatModel(String name, List<EffectController> abilities, int scratches, PlanetModel homePlanet, PlanetModel currPlanet, long playerId) {
        this.name = name;
        this.abilities = abilities;
        this.scratches = scratches;
        this.homePlanet = homePlanet;
        this.currPlanet = currPlanet;
        this.playerId = playerId;
    }

    public String getName() {
        return this.name;
    }

    public List<EffectController> getAbilities() {
        return this.abilities;
    }

    public int getScratches() {
        return this.scratches;
    }

    public PlanetModel getHomePlanet() {
        return this.homePlanet;
    }

    public PlanetModel getCurrPlanet() {
        return this.currPlanet;
    }

    public long getPlayerId() {
        return this.playerId;
    }

    public void addAbility(EffectController ability){
        this.abilities.add(ability);
    }

    public void moveToPlanet(PlanetModel planet){
        this.currPlanet = planet;
    }

    public void removeAbility(EffectController ability){
        abilities.remove(ability);
    }

    public int updateScratches(int scratches){
        this.scratches -= scratches;
        if(this.scratches < 0){
            int rollover = Math.abs(this.scratches);
            this.scratches = 0;
            return rollover;
        }
        return 0;
    }

}
