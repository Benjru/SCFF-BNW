package com.mounta.spacecats.models.cats;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public class CatModel {

    public static final int MAX_CARDS = 3;

    private String name;

    private ArrayList<EffectModel> abilities;

    private int scratches;

    @JsonSerialize(using = PlanetSerializer.class)
    private PlanetModel homePlanet;

    @JsonSerialize(using = PlanetSerializer.class)
    private PlanetModel currPlanet;

    private long playerId;

    private ArrayList<ResistCard> hand;

    private static final int MAX_SCRATCHES = 2;

    public static Map<String, Integer> homePlanets = Map.of("cj", 7,
    "jasper", 6,
    "nikita", 1,
    "ophelia", 4,
    "pepper", 2,
    "pip", 8,
    "sc", 3,
    "sky", 5
    );

    private static class PlanetSerializer extends JsonSerializer<PlanetModel> {

        @Override
        public void serialize(PlanetModel value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            gen.writeObject(value.getPosition());
        }
        
    }



    private CatModel(String name, ArrayList<EffectModel> abilities, int scratches, PlanetModel homePlanet, PlanetModel currPlanet, long playerId, ArrayList<ResistCard> hand) {
        this.name = name;
        this.abilities = abilities;
        this.scratches = scratches;
        this.homePlanet = homePlanet;
        this.currPlanet = currPlanet;
        this.playerId = playerId;
        this.hand = hand;
    }

    public static CatModel create(String name, long playerId){
        if(homePlanets.keySet().contains(name)){
            return new CatModel(name, new ArrayList<>(), 0, null, null, playerId, new ArrayList<>());
        }
        throw new IllegalArgumentException("This is an invalid cat name!");
    }

    public String getName() {
        return this.name;
    }

    public ArrayList<EffectModel> getAbilities() {
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

    public ArrayList<ResistCard> getHand(){
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

    @Override
    public String toString() {
        return "{" +
            " name='" + getName() + "'" +
            ", abilities='" + getAbilities() + "'" +
            ", scratches='" + getScratches() + "'" +
            ", homePlanet='" + getHomePlanet() + "'" +
            ", currPlanet='" + getCurrPlanet() + "'" +
            ", playerId='" + getPlayerId() + "'" +
            ", hand='" + getHand() + "'" +
            "}";
    }


}
