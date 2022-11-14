package com.mounta.spacecats.models.gamestate;

import java.util.ArrayDeque;
import java.util.List;

import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public class GameStateModel {
    private ArrayDeque<GalaxyNewsCard> galaxyNewsDeck;

    private ArrayDeque<ResistCard> resistCardDeck;

    private List<CatModel> cats;

    private List<PlanetModel> planets;

    private CatModel currTurn;

    private int actionsLeft;

    private int globalFascismScale;


    private GameStateModel(ArrayDeque<GalaxyNewsCard> galaxyNewsDeck, ArrayDeque<ResistCard> resistCardDeck, List<CatModel> cats, List<PlanetModel> planets, CatModel currTurn, int actionsLeft, int globalFascismScale) {
        this.galaxyNewsDeck = galaxyNewsDeck;
        this.resistCardDeck = resistCardDeck;
        this.cats = cats;
        this.planets = planets;
        this.currTurn = currTurn;
        this.actionsLeft = actionsLeft;
        this.globalFascismScale = globalFascismScale;
    }


    public ArrayDeque<GalaxyNewsCard> getGalaxyNewsDeck() {
        return this.galaxyNewsDeck;
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
    
}
