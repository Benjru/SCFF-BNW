package com.mounta.spacecats.models.cats;

import java.util.List;

import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public class CatModel {
    private String name;

    private List<EffectModel> abilities;

    private int scratches;

    private PlanetModel homePlanet;

    private PlanetModel currPlanet;

    private long playerId;

    private List<ResistCard> hand;


    public CatModel(String name, List<EffectModel> abilities, int scratches, PlanetModel homePlanet, PlanetModel currPlanet, long playerId, List<ResistCard> hand) {
        this.name = name;
        this.abilities = abilities;
        this.scratches = scratches;
        this.homePlanet = homePlanet;
        this.currPlanet = currPlanet;
        this.playerId = playerId;
        this.hand = hand;
    }

    public String getName() {
        return this.name;
    }

    public List<EffectModel> getAbilities() {
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

    public List<ResistCard> getHand(){
        return this.hand;
    }

    public void removeCard(ResistCard card){
        this.hand.remove(card);
    }

    public void addAbility(EffectModel ability){
        this.abilities.add(ability);
    }

    public void moveToPlanet(PlanetModel planet){
        this.currPlanet = planet;
    }

    public void removeAbility(EffectModel ability){
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
