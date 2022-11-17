package com.mounta.spacecats.models.gamestate;

import java.io.IOException;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.CardConstants;

@JsonIgnoreProperties(value = {
    "galaxyNewsDeck",
    "resistCardDeck"
})
public class GameStateModel {
    private ArrayDeque<GalaxyNewsCard> galaxyNewsDeck;

    private ArrayDeque<ResistCard> resistCardDeck;

    private ArrayList<ResistCard> resistCardDiscard;

    private ArrayList<GalaxyNewsCard> galaxyNewsDiscard;

    private ArrayList<CatModel> cats;

    private ArrayList<PlanetModel> planets;

    @JsonSerialize(using = CatSerializer.class)
    private CatModel currTurn;

    private int actionsLeft;

    private int globalFascismScale;

    private ArrayList<String> actionsTaken;

    private String gameStatus;

    private static class CatSerializer extends JsonSerializer<CatModel> {

        @Override
        public void serialize(CatModel value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            gen.writeObject(value.getPlayerId());
        }
        
    }


    private GameStateModel(ArrayDeque<GalaxyNewsCard> galaxyNewsDeck,
                           ArrayDeque<ResistCard> resistCardDeck,
                           ArrayList<CatModel> cats,
                           ArrayList<PlanetModel> planets,
                           CatModel currTurn,
                           int actionsLeft,
                           int globalFascismScale) {
        this.galaxyNewsDeck = galaxyNewsDeck;
        this.resistCardDeck = resistCardDeck;
        this.cats = cats;
        this.planets = planets;
        this.currTurn = currTurn;
        this.actionsLeft = actionsLeft;
        this.globalFascismScale = globalFascismScale;
        this.resistCardDiscard = new ArrayList<>();
        this.galaxyNewsDiscard = new ArrayList<>();
        this.actionsTaken = new ArrayList<>();
        this.gameStatus = "inProgress";
    }

    public static GameStateModel create(ArrayList<CatModel> cats){
        ArrayList<PlanetModel> planets = PlanetModel.generateNewPlanets();
        cats.stream().forEach(cat -> {
            PlanetModel homePlanet = planets
            .stream()
            .filter(planet -> planet.getNumber() == CatModel.homePlanets.get(cat.getName()).intValue())
            .findFirst().get();
            cat.setHomePlanet(homePlanet);
            cat.moveToPlanet(homePlanet);
        });
        return new GameStateModel(CardConstants.newGalaxyDeck(),
                CardConstants.newResistDeck(),
                cats,
                planets,
                cats.get(ThreadLocalRandom.current().nextInt(0, cats.size())),
                3,
                1);
    }


    public ArrayDeque<GalaxyNewsCard> getGalaxyNewsDeck() {
        return this.galaxyNewsDeck;
    }

    public GalaxyNewsCard drawGalaxyNewsCard() { return galaxyNewsDeck.pop(); }

    public ArrayDeque<ResistCard> getResistCardDeck() {
        return this.resistCardDeck;
    }

    public ArrayList<CatModel> getCats() {
        return this.cats;
    }

    public ArrayList<PlanetModel> getPlanets() {
        return this.planets;
    }

    public CatModel getCurrTurn() {
        return this.currTurn;
    }

    public int getActionsLeft() {
        return this.actionsLeft;
    }

    public int getGlobalFascismScale() {
        return this.globalFascismScale;
    }

    public ArrayList<ResistCard> getResistCardDiscard() {
        return this.resistCardDiscard;
    }

    public ArrayList<GalaxyNewsCard> getGalaxyNewsDiscard() {
        return this.galaxyNewsDiscard;
    }

    public List<String> getActionsTaken(){
        return actionsTaken;
    }

    public void setCurrTurn(CatModel cat){
        if(cats.contains(cat)){
            currTurn = cat;
        }
    }

    public void setGameStatus(String gameStatus){
        this.gameStatus = gameStatus;
    }

    public void setActionsLeft(int actionsLeft){
        if(actionsLeft > 0){
            this.actionsLeft = actionsLeft;
        }
    }

    public void updateGlobalFascismScale(int update){
        this.globalFascismScale += update;
    }

    public void discardCard(ResistCard card, CatModel cat){
        if(!cat.removeCard(card)){
            throw new NullPointerException("This cat does not have this card in their hand!");
        }
        resistCardDiscard.add(card);
    }

    public void discardCard(GalaxyNewsCard card){
        galaxyNewsDiscard.add(card);
    }

    
/**
 * The drawResistCard function draws a card from the resistCardDeck and gives it to the cat.
 * 
 *
 * @param cat The ccat drawing the card
 *
 * @return The card that was drawn
 *
 */
public ResistCard drawResistCard(CatModel cat) {
    ResistCard card = resistCardDeck.pop();
    try{
        cat.giveCard(card);
        return card;
    }
    catch(IllegalStateException e){
        resistCardDeck.add(card);
        System.out.println("Error! Cat (" + cat.getName() + ") already has max cards");
        return null;
    }
}

/**
 * The refillNewsDeck function is used to shuffle the discard pile back into the deck when it becomes empty.
 *
 */
    public void refillNewsDeck()
    {
        if(galaxyNewsDeck.isEmpty())
        {
            Collections.shuffle(galaxyNewsDiscard);
            galaxyNewsDeck = new ArrayDeque<>(galaxyNewsDiscard);
            galaxyNewsDiscard = new ArrayList<>();
        }
        else
        {
            throw new IllegalStateException("Cannot reshuffle deck with cards already in it!");
        }
    }

/**
 *  It is used to reshuffle the discard pile of resist cards back into the deck when it becomes empty.
 * 
 */
    public void refillResistDeck()
    {
        if(resistCardDeck.isEmpty())
        {
            Collections.shuffle(resistCardDiscard);
            resistCardDeck = new ArrayDeque<>(resistCardDeck);
            resistCardDiscard = new ArrayList<>();
        }
        else
        {
            throw new IllegalStateException("Cannot reshuffle deck with cards already in it!");
        }
    }

    public void takeAction(String actionName){
        if(this.actionsLeft > 0){
            actionsTaken.add(actionName);
            this.actionsLeft--;
        }
    }

    public void clearActions(){
        this.actionsTaken = new ArrayList<>();
    }

    @Override
    public String toString() {
        return "{" +
            " galaxyNewsDeck='" + getGalaxyNewsDeck() + "'" +
            ", resistCardDeck='" + getResistCardDeck() + "'" +
            ", resistCardDiscard='" + getResistCardDiscard() + "'" +
            ", galaxyNewsDiscard='" + getGalaxyNewsDiscard() + "'" +
            ", cats='" + getCats() + "'" +
            ", planets='" + getPlanets() + "'" +
            ", currTurn='" + getCurrTurn() + "'" +
            ", actionsLeft='" + getActionsLeft() + "'" +
            ", globalFascismScale='" + getGlobalFascismScale() + "'" +
            "}";
    }
    
}
