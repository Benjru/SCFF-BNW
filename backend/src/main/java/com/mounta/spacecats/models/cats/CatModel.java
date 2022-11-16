package com.mounta.spacecats.models.cats;

import java.util.List;

import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public class CatModel {

    public static final int MAX_CARDS = 3;

    private String name;

    private List<EffectModel> abilities;

    private int scratches;

    private PlanetModel homePlanet;

    private PlanetModel currPlanet;

    private long playerId;

    private List<ResistCard> hand;

    private static final int MAX_SCRATCHES = 2;


    private CatModel(String name, List<EffectModel> abilities, int scratches, PlanetModel homePlanet, PlanetModel currPlanet, long playerId, List<ResistCard> hand) {
        this.name = name;
        this.abilities = abilities;
        this.scratches = scratches;
        this.homePlanet = homePlanet;
        this.currPlanet = currPlanet;
        this.playerId = playerId;
        this.hand = hand;
    }

    public static CatModel create(String name, long playerId){
        return new CatModel(name, List.of(), 0, null, null, playerId, List.of());
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

    public boolean removeCard(ResistCard card){
        return this.hand.remove(card);
    }

    public void giveCard(ResistCard card) {
        if(this.hand.size() < MAX_CARDS){
            this.hand.add(card);
        }
        else{
            throw new IllegalStateException("This player already has " + MAX_CARDS + " cards!");
        }
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
        this.scratches += scratches;
        if(this.scratches > MAX_SCRATCHES){
            int rollover = this.scratches - MAX_SCRATCHES;
            this.scratches = MAX_SCRATCHES;
            return rollover;
        }
        return 0;
    }

    public void setHomePlanet(PlanetModel planet){
        this.homePlanet = planet;
    }


}
