package com.mounta.spacecats.models.gamestate;

import java.util.ArrayDeque;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.CardConstants;

public class GameStateModel {
    private ArrayDeque<GalaxyNewsCard> galaxyNewsDeck;

    private ArrayDeque<ResistCard> resistCardDeck;

    private List<ResistCard> resistCardDiscard;

    private List<GalaxyNewsCard> galaxyNewsDiscard;

    private List<CatModel> cats;

    private List<PlanetModel> planets;

    private CatModel currTurn;

    private int actionsLeft;

    private int globalFascismScale;


    private GameStateModel(ArrayDeque<GalaxyNewsCard> galaxyNewsDeck,
                           ArrayDeque<ResistCard> resistCardDeck,
                           List<CatModel> cats,
                           List<PlanetModel> planets,
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
        this.resistCardDiscard = List.of();
        this.galaxyNewsDiscard = List.of();
    }

    public GameStateModel create(List<CatModel> cats){
        return new GameStateModel(CardConstants.newGalaxyDeck(),
                CardConstants.newResistDeck(),
                cats,
                PlanetModel.generateNewPlanets(cats),
                cats.get(ThreadLocalRandom.current().nextInt(0, cats.size())),
                3,
                1);
    }


    public ArrayDeque<GalaxyNewsCard> getGalaxyNewsDeck() {
        return this.galaxyNewsDeck;
    }

    public GalaxyNewsCard drawGalaxyNewsCard() { return galaxyNewsDeck.pop(); }

    public void drawResistCard(CatModel cat) {
        ResistCard card = resistCardDeck.pop();
        try{
            cat.giveCard(card);
        }
        catch(IllegalStateException e){
            resistCardDeck.add(card);
            System.out.println("Error! Cat (" + cat.getName() + ") already has 4 cards");
        }
    }

    public ArrayDeque<ResistCard> getResistCardDeck() {
        return this.resistCardDeck;
    }

    public List<CatModel> getCats() {
        return this.cats;
    }

    public List<PlanetModel> getPlanets() {
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

    public void setActions(int actionsLeft){
        this.actionsLeft = actionsLeft;
    }
    
}
