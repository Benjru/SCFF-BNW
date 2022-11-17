package com.mounta.spacecats.models.gamestate;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.concurrent.ThreadLocalRandom;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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

    private CatModel currTurn;

    private int actionsLeft;

    private int globalFascismScale;


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
    }

    public static GameStateModel create(ArrayList<CatModel> cats){
        ArrayList<PlanetModel> planets = PlanetModel.generateNewPlanets();
        cats.stream().forEach(cat -> {
            PlanetModel homePlanet = planets
            .stream()
            .filter(planet -> planet.getNumber() == CatModel.homePlanets.get(cat.getName()).intValue())
            .toList()
            .get(0);
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

    public ResistCard drawResistCard(CatModel cat) {
        ResistCard card = resistCardDeck.pop();
        try{
            cat.giveCard(card);
            return card;
        }
        catch(IllegalStateException e){
            resistCardDeck.add(card);
            System.out.println("Error! Cat (" + cat.getName() + ") already has 4 cards");
            return null;
        }
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

    public void setActionsLeft(int actionsLeft){
        this.actionsLeft = actionsLeft;
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
