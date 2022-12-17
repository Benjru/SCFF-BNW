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
import com.mounta.spacecats.models.actions.ActionLog;
import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.MeowssionRewardCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.meowssions.condition.Meowssion;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.CardConstants;

@JsonIgnoreProperties(value = {
    "galaxyNewsDeck",
    "resistCardDeck",
    "meowssionDeck",
    "meowssionAwardDeck"
})
public class GameStateModel {
    private ArrayDeque<GalaxyNewsCard> galaxyNewsDeck;

    private ArrayDeque<ResistCard> resistCardDeck;

    private ArrayList<ResistCard> resistCardDiscard;

    private ArrayList<GalaxyNewsCard> galaxyNewsDiscard;

    private ArrayList<Meowssion> meowssionDiscard;

    private ArrayDeque<Meowssion> meowssionDeck;

    private ArrayList<MeowssionRewardCard> meowssionAwardDiscard;

    private ArrayDeque<MeowssionRewardCard> meowssionAwardDeck;

    private ArrayList<CatModel> cats;

    private ArrayList<PlanetModel> planets;

    @JsonSerialize(using = CatSerializer.class)
    private CatModel currTurn;

    private int actionsLeft;

    private int globalFascismScale;

    private ArrayList<ActionLog> actionsTaken;

    private String gameStatus;

    private Meowssion meowssion;

    private int agentsCompleted;

    private static class CatSerializer extends JsonSerializer<CatModel> {

        @Override
        public void serialize(CatModel value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            gen.writeObject(value.getPlayerId());
        }
        
    }


    private GameStateModel(ArrayDeque<GalaxyNewsCard> galaxyNewsDeck,
                           ArrayDeque<ResistCard> resistCardDeck,
                           ArrayDeque<Meowssion> meowssionDeck,
                           ArrayDeque<MeowssionRewardCard> meowssionAwardDeck,
                           ArrayList<CatModel> cats,
                           ArrayList<PlanetModel> planets,
                           CatModel currTurn,
                           int actionsLeft,
                           int globalFascismScale) {
        this.galaxyNewsDeck = galaxyNewsDeck;
        this.resistCardDeck = resistCardDeck;
        this.meowssionDeck = meowssionDeck;
        this.meowssionAwardDeck = meowssionAwardDeck;
        this.cats = cats;
        this.planets = planets;
        this.currTurn = currTurn;
        this.actionsLeft = actionsLeft;
        this.globalFascismScale = globalFascismScale;
        this.resistCardDiscard = new ArrayList<>();
        this.galaxyNewsDiscard = new ArrayList<>();
        this.meowssionDiscard = new ArrayList<>();
        this.meowssionAwardDiscard = new ArrayList<>();
        this.actionsTaken = new ArrayList<>();
        this.gameStatus = "inProgress";
        this.meowssion = null;
        this.agentsCompleted = 0;
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
                CardConstants.newMeowssionDeck(),
                CardConstants.newMeowssionRewardDeck(),
                cats,
                planets,
                cats.get(ThreadLocalRandom.current().nextInt(0, cats.size())),
                3,
                1);
    }


    public ArrayDeque<GalaxyNewsCard> getGalaxyNewsDeck() {
        return this.galaxyNewsDeck;
    }

    public GalaxyNewsCard drawGalaxyNewsCard() { 
        GalaxyNewsCard card = galaxyNewsDeck.pop();
        discardCard(card);
        if(galaxyNewsDeck.size() == 0){
            refillNewsDeck();
        }
        return galaxyNewsDeck.pop(); 
    }

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

    public ArrayList<MeowssionRewardCard> getMeowssionAwardDiscard(){
        return this.meowssionAwardDiscard;
    }

    public List<ActionLog> getActionsTaken(){
        return actionsTaken;
    }

    public Meowssion getMeowssion(){
        return meowssion;
    }

    public int getAgentsCompleted() {
        return this.agentsCompleted;
    }

    public void setAgentsCompleted(int agentsCompleted) {
        this.agentsCompleted = agentsCompleted;
    }


    public void moveSecretAgent(PlanetModel origin, PlanetModel target, int numberOfAgents){
        if(numberOfAgents < 0){
            throw new IllegalArgumentException("Number of agents cannot be negative!");
        }
        origin.updateSecretAgents(-numberOfAgents);
        target.updateSecretAgents(numberOfAgents);
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

    private void discardMeowssion(){
        meowssionDiscard.add(meowssion);
    }

    public void drawMeowssion(){
        discardMeowssion();
        this.meowssion = this.meowssionDeck.pop();
        if(meowssionDeck.isEmpty()){
            refillMeowssionDeck();
        }
    }

    public void discardCard(MeowssionRewardCard meowssionReward){
        this.meowssionAwardDiscard.add(meowssionReward);
    }

    public void refillMeowssionDeck(){
        if(meowssionDeck.isEmpty()){
            Collections.shuffle(meowssionDiscard);
            meowssionDeck = new ArrayDeque<>(meowssionDiscard);
            meowssionDiscard = new ArrayList<>();
        }
        else{
            throw new IllegalStateException("Cannot reshuffle a meowssion deck that has things in it");
        }
    }

    public MeowssionRewardCard drawMeowssionAward(){
        return this.meowssionAwardDeck.pop();
    }

    public void refillMeowssionAwardDeck(){
        if(meowssionAwardDeck.isEmpty()){
            Collections.shuffle(meowssionAwardDiscard);
            meowssionAwardDeck = new ArrayDeque<>(meowssionAwardDiscard);
            meowssionDiscard = new ArrayList<>();
        }
        else{
            throw new IllegalStateException("Cannot reshuffle a meowssion award deck that has things in it");
        }
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
        if(resistCardDeck.size() == 0){
            refillResistDeck();
        }
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

    public void takeAction(ActionLog actionName){
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
    public void setGalaxyNewsDeck(ArrayDeque<GalaxyNewsCard> galaxyNewsDeck) {
        this.galaxyNewsDeck = galaxyNewsDeck;
    }
    public void setResistCardDeck(ArrayDeque<ResistCard> resistCardDeck) {
        this.resistCardDeck = resistCardDeck;
    }
    public void setResistCardDiscard(ArrayList<ResistCard> resistCardDiscard) {
        this.resistCardDiscard = resistCardDiscard;
    }
    public void setGalaxyNewsDiscard(ArrayList<GalaxyNewsCard> galaxyNewsDiscard) {
        this.galaxyNewsDiscard = galaxyNewsDiscard;
    }

    public ArrayList<Meowssion> getMeowssionDiscard() {
        return this.meowssionDiscard;
    }

    public ArrayDeque<Meowssion> getMeowssionDeck() {
        return this.meowssionDeck;
    }

    public ArrayDeque<MeowssionRewardCard> getMeowssionAwardDeck() {
        return this.meowssionAwardDeck;
    }


    public String getGameStatus() {
        return this.gameStatus;
    }

    
}
