package com.mounta.spacecats.controllers.gamestate;

import com.mounta.spacecats.controllers.actions.Action;
import com.mounta.spacecats.controllers.actions.FightFascismAction;
import com.mounta.spacecats.controllers.actions.PlayCardAction;
import com.mounta.spacecats.controllers.actions.RestockAction;
import com.mounta.spacecats.controllers.actions.TravelAction;
import com.mounta.spacecats.controllers.card.CardController;
import com.mounta.spacecats.controllers.cat.CatController;
import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.lobby.LobbyModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.PlayStateInfo;
import com.mounta.spacecats.websocket.DTOs.ActionInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

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

    public ArrayList<CatModel> getPlayers(){
        return gameState.getCats();
    }

    public ArrayList<PlanetModel> getPlanets(){
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
        gameState.discardCard(card);
        return card.getCardId();
    }

    public String drawFromResistDeck(CatModel cat){
        ResistCard card = gameState.drawResistCard(cat);
        if(gameState.getResistCardDeck().isEmpty()){
            gameState.refillResistDeck();
        }
        return card.getCardId();
    }

    public void setupGame(){
        if(gameState == null){
            gameState = GameStateModel.create(lobby.getCats());
            lobby.getCats().stream().forEach(cat -> {
                drawFromResistDeck(cat);
                drawFromResistDeck(cat);
            });
        }
    }

    public CatModel joinGame(String catName){
        if(this.lobby.getCats().size() < 2 && lobby.getCats().stream().filter(cat -> cat.getName().equals(catName)).toList().size() == 0)
        {
            try{
                CatModel cat = CatModel.create(catName, this.lobby.getCats().size());
                this.lobby.addCat(cat);
                if(this.lobby.getCats().size() == 2){
                    setupGame();
                }
                return cat;
            } catch(IllegalArgumentException e){
                System.out.println("Invalid cat name " + catName + " provided");
            }
        }
        return null;
    }

    public void takeAction(ActionInfo actionInfo){
        CatModel cat = gameState.getCats().stream().filter(thisCat -> thisCat.getPlayerId() == actionInfo.playerId()).findFirst().orElseThrow(IllegalArgumentException::new);
        PlanetModel planet = null;
        if(actionInfo.planetPosition() > 0){
            planet = gameState.getPlanets().stream().filter(thisPlanet -> thisPlanet.getPosition() == actionInfo.planetPosition()).findFirst().orElseThrow(IllegalArgumentException::new);
        }
        ResistCard playedCard = null;
        if(actionInfo.cardName() != null){
            playedCard = cat.getHand().stream().filter(card -> card.getCardId().equals(actionInfo.cardName())).findFirst().orElseThrow(IllegalArgumentException::new);
        }
        PlayStateInfo playStateInfo = new PlayStateInfo(cat, null, planet, gameState, playedCard);

        Map<String, Action> actions = Map.of("playCard", new PlayCardAction(),
        "fightFascism", new FightFascismAction(),
        "restock", new RestockAction(),
        "travel", new TravelAction());

        if(actions.keySet().contains(actionInfo.actionName())){
            Action action = actions.get(actionInfo.actionName());
            if(action.condition(playStateInfo)){
                action.resolveAction(playStateInfo);
                gameState.takeAction(actionInfo.actionName());
                if(gameState.getActionsLeft() <= 0){
                    rollFascistDice(playStateInfo);
                }
            }
            else{
                throw new IllegalArgumentException("Planet chosen is not adjacent to current planet");
            }
        }
        else{
            throw new IllegalArgumentException(actionInfo.actionName() + " is not a valid action");
        }

    }

    private List<String> rollFascistDice(PlayStateInfo playStateInfo){
        int dice = Math.max((gameState.getGlobalFascismScale() > 6 ? 3 : 2) - ((int)gameState.getActionsTaken().stream().filter(action -> action.equals("fightFascism")).count()), 1);
        ArrayList<String> cardsDrawn = new ArrayList<>();
        for(int i = 0; i<dice; i++){
            int planetNum = ThreadLocalRandom.current().nextInt(1, 13);
            PlanetModel planet = gameState.getPlanets().stream().filter(thisPlanet -> thisPlanet.getNumber() == planetNum).findFirst().get();
            System.out.println("Adding fascism to planet #" + planetNum);
            planet.updateFascismLevel(1);
            if(planetNum >= 9){
                String card = drawFromNewsDeck(playStateInfo);
                System.out.println("Drew Galaxy News Card (" + card + ")");
                cardsDrawn.add(card);
            }
        }
        return cardsDrawn;
    }

    public GameStateModel getGameState(){
        return gameState;
    }
}
