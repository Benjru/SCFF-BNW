package com.mounta.spacecats.controllers.gamestate;

import com.mounta.spacecats.controllers.actions.Action;
import com.mounta.spacecats.controllers.actions.FightFascismAction;
import com.mounta.spacecats.controllers.actions.PlayCardAction;
import com.mounta.spacecats.controllers.actions.RestockAction;
import com.mounta.spacecats.controllers.actions.TravelAction;
import com.mounta.spacecats.controllers.websocket.DTOs.ActionInfo;
import com.mounta.spacecats.mappers.SymbolMapper;
import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.ResistEffects.ResistEffect_F;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.lobby.LobbyModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.models.planets.Symbol;
import com.mounta.spacecats.util.PlayStateInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

import org.mapstruct.factory.Mappers;
import org.springframework.stereotype.Component;

@Component
public class GameStateController {

    private GameStateModel gameState;

    private SymbolMapper symbolMapper;

    private LobbyModel lobby;

    public GameStateController(){
        this.lobby = new LobbyModel();
        this.symbolMapper = Mappers.getMapper(SymbolMapper.class);
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

/**
 * The drawFromNewsDeck function draws a card from the news deck and executes its effects, and then discards it
 * If the news deck is empty, it refills it.
 * 
 *
 * @param playStateInfo Pass information about the state of the game to the card effect
 *
 * @return The cardid of the galaxynewscard that was drawn
 *
 */
    public String drawFromNewsDeck(PlayStateInfo playStateInfo){
        GalaxyNewsCard card = gameState.drawGalaxyNewsCard();
        if(gameState.getGalaxyNewsDeck().isEmpty()){
            gameState.refillNewsDeck();
        }
        card.getCardEffect().resolve(playStateInfo);
        gameState.discardCard(card);
        return card.getCardId();
    }

/**
 * The drawFromResistDeck function draws a card from the resist deck and returns its id.
 * If the resist deck is empty, it refills it.
 
 *
 * @param cat Determine which cat is drawing the card
 *
 * @return A string of the cardid that was drawn from the resist deck
 * 
 */
    public String drawFromResistDeck(CatModel cat){
        ResistCard card = gameState.drawResistCard(cat);
        if(gameState.getResistCardDeck().isEmpty()){
            gameState.refillResistDeck();
        }
        return card.getCardId();
    }

/**
 * The setupGame function sets up the game by creating a GameStateModel object and setting it to the global variable gameState.
 * It also draws two cards for each cat from the resist deck, and updates their home planet's fascism level to 1.
 
 * @return A gamestatemodel
 *
 * @docauthor Trelent
 */
    public void setupGame(){
        if(gameState == null){
            gameState = GameStateModel.create(lobby.getCats());
            lobby.getCats().stream().forEach(cat -> {
                drawFromResistDeck(cat);
                drawFromResistDeck(cat);
                cat.getHomePlanet().updateFascismLevel(1);
            });
        }
    }

/**
 * The joinGame function adds a cat to the lobby, and if the game is full, starts the game
 * 
 * @param catName Name of the cat attempting to join
 *
 * @return The created cat
 *
 */
    public CatModel joinGame(String catName){
        if(this.lobby.getCats().size() < 2 && lobby.getCats().stream().filter(cat -> cat.getName().equals(catName)).count() == 0)
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

/**
 * The takeAction function takes an ActionInfo object and uses it to take the appropriate action.
 *
 * @param actionInfo Pass in the action that was taken by the player
 *
 */
    public void takeAction(ActionInfo actionInfo){
        PlayStateInfo playStateInfo = makePlayStateInfo(actionInfo);

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
                    endTurn(playStateInfo);
                }
            }
            else{
                throw new IllegalArgumentException("Condition could not be verified for playState " + playStateInfo.toString());
            }
        }
        else{
            throw new IllegalArgumentException(actionInfo.actionName() + " is not a valid action");
        }

    }

/**
 * The makePlayStateInfo function takes in an ActionInfo object and returns a PlayStateInfo object.
 * The ActionInfo contains information about the player, planet, card played, etc.
 * This function will check to make sure that the player is indeed the current turn's player and that they have not already played their turn. 
 * If they have not yet played their turn then it will return a PlayStateInfo with all of this information filled out for you! 
 
 *
 * @param actionInfo Action request information
 *
 * @return A playstateinfo object
 * 
 */
    private PlayStateInfo makePlayStateInfo(ActionInfo actionInfo){
        CatModel cat = gameState.getCats()
                                .stream()
                                .filter(thisCat -> thisCat.getPlayerId() == actionInfo.playerId())
                                .findFirst()
                                .orElseThrow(IllegalArgumentException::new);
        if(!cat.equals(gameState.getCurrTurn())){
            throw new IllegalArgumentException("You are not the current player!");
        }
        PlanetModel planet = null;
        if(actionInfo.planetPosition() > 0){
            planet = gameState.getPlanets()
            .stream()
            .filter(thisPlanet -> thisPlanet.getPosition() == actionInfo.planetPosition())
            .findFirst()
            .orElseThrow(IllegalArgumentException::new);
        }
        ResistCard playedCard = null;
        if(actionInfo.cardName() != null){
            if(actionInfo.cardName().equals("ResistCard_F")){
                if(actionInfo.symbol() != null){    
                    Symbol symbol = symbolMapper.toSymbol(actionInfo.symbol());
                    playedCard = cat.getHand()
                                .stream()
                                .filter(card -> card.getCardId().equals(actionInfo.cardName()))
                                .filter(card -> {
                                    ResistEffect_F effect = (ResistEffect_F)card.getCardEffect();
                                    return effect.getSymbol().equals(symbol);
                                })
                                .findFirst()
                                .orElseThrow(IllegalArgumentException::new);
                }
                else{
                    throw new IllegalArgumentException("Must provide a symbol with a symbol card");
                }
            }
            else{
                playedCard = cat.getHand()
                                .stream()
                                .filter(card -> card.getCardId().equals(actionInfo.cardName()))
                                .findFirst()
                                .orElseThrow(IllegalArgumentException::new);
            }
        }
        return new PlayStateInfo(cat, null, planet, gameState, playedCard);
    }

/**
 * The rollFascistDice function rolls dice for the fascist track, and draws galaxy news cards if 
 * a stronghold was rolled
 *
 * @return A list of cards that were drawn from the news deck
 *
 */
    private List<String> rollFascistDice(PlayStateInfo playStateInfo){
        int dice = Math.max((gameState.getGlobalFascismScale() > 6 ? 3 : 2) - 
                    ((int)gameState.getActionsTaken()
                                    .stream()
                                    .filter(action -> action.equals("fightFascism"))
                                    .count()), 1);

        ArrayList<String> cardsDrawn = new ArrayList<>();

        for(int i = 0; i<dice; i++){
            int planetNum = ThreadLocalRandom.current().nextInt(1, 13);
            PlanetModel planet = gameState.getPlanets()
            .stream()
            .filter(thisPlanet -> thisPlanet.getNumber() == planetNum)
            .findFirst()
            .get();

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

/**
 * The endTurn function is called when a player ends their turn. It rolls the fascist die, clears the actions
 * list and sets the number of actions left to 3. Finally it changes whose turn it is by finding out who's next in line after 
 * currTurnPos % cats.size() (which will be either 0 or 1).  then we go to checkForLose().
 *
 * @param playStateInfo Pass information about the current state of the game
 *
 */
    private void endTurn(PlayStateInfo playStateInfo){
        rollFascistDice(playStateInfo);
        gameState.clearActions();
        gameState.setActionsLeft(3);
        List<CatModel> cats = gameState.getCats();
        int currTurnPos = cats.indexOf(gameState.getCurrTurn()) + 1;
        gameState.setCurrTurn(cats.get(currTurnPos % cats.size()));
        checkForLose();
    }

/**
 * The checkForLose function checks if the game has been lost.
 *
 */
    private void checkForLose(){
        if(gameState.getPlanets().stream().filter(planet -> planet.getFascismLevel() >= 4).count() >= 3 ||
        gameState.getGlobalFascismScale() >= 13 ||
        gameState.getPlanets().stream().mapToInt(PlanetModel::getFascismLevel).sum() >= 20
        ){
            gameState.setGameStatus("lose");
        }
    }
    
    public GameStateModel getGameState(){
        return gameState;
    }
}
