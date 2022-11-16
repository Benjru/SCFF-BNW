package com.mounta.spacecats.controllers.gamestate;

import com.mounta.spacecats.controllers.card.CardController;
import com.mounta.spacecats.controllers.cat.CatController;
import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.lobby.LobbyModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.CardConstants;
import com.mounta.spacecats.util.PlayStateInfo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameStateController {

    private GameStateModel gameState;

    @Autowired
    private CardController cardController;

    @Autowired
    private CatController catController;

    private LobbyModel lobby;

    public GameStateController(){
        this.lobby = new LobbyModel();
    }

    public void setCatController(CatController catController){
        this.catController = catController;
    }

    public void setCardController(CardController cardController){
        this.cardController = cardController;
    }

    public List<CatModel> getPlayers(){
        return gameState.getCats();
    }

    public List<PlanetModel> getPlanets(){
        return gameState.getPlanets();
    }

    public CatModel getCurrTurn(){
        return gameState.getCurrTurn();
    }

    public int getFascismLevel(){
        return gameState.getGlobalFascismScale();
    }

    public String drawFromNewsDeck(PlayStateInfo playStateInfo){
        GalaxyNewsCard card = gameState.drawGalaxyNewsCard();
        if(gameState.getGalaxyNewsDeck().isEmpty()){
            gameState.refillNewsDeck();
        }
        card.getCardEffect().resolve(playStateInfo);
        return card.getCardId();
    }

    public String drawFromResistDeck(PlayStateInfo playStateInfo){
        ResistCard card = gameState.drawResistCard(playStateInfo.cat());
        if(gameState.getResistCardDeck().isEmpty()){
            gameState.refillResistDeck();
        }
        return card.getCardId();
    }

    public void setupGame(){
        if(gameState == null){
            gameState = GameStateModel.create(lobby.getCats());
        }
    }

    public CatModel joinGame(String catName){
        if(this.lobby.getCats().size() < 2 && lobby.getCats().stream().filter(cat -> cat.getName().equals(catName)).toList().size() == 0)
        {
            CatModel cat = CatModel.create(catName, this.lobby.getCats().size());
            this.lobby.addCat(cat);
            if(this.lobby.getCats().size() == 2){
                setupGame();
            }
            return cat;
        }
        return null;
    }
}
