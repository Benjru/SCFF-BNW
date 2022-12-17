package com.mounta.spacecats.controllers.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mounta.spacecats.controllers.gamestate.GameStateController;
import com.mounta.spacecats.controllers.websocket.DTOs.ActionInfo;
import com.mounta.spacecats.controllers.websocket.DTOs.CatInfo;
import com.mounta.spacecats.controllers.websocket.DTOs.PlayerInfo;
import com.mounta.spacecats.controllers.websocket.DTOs.ResolveMeowssion;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;

@RestController
public class WebSocketGameController {

    @Autowired
    private SimpMessagingTemplate template;

    @Autowired
    private GameStateController gameStateController;

    @PostMapping("/join")
	public ResponseEntity<Void> joinGame(@RequestBody CatInfo catName) {
        System.out.println("Received join request from cat with name " + catName);
        if(gameStateController.getGameState() != null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        CatModel cat = gameStateController.joinGame(catName.catName());
        if(cat != null){
            System.out.println(cat.toString());
        template.convertAndSend("/game/catInfo", cat);
        if(gameStateController.getGameState() != null){
            template.convertAndSend("/game/gameState", gameStateController.getGameState());
        }
        System.out.println("Successfully added cat with name " + catName );
		return new ResponseEntity<>(HttpStatus.OK);
        }
        System.out.println("Could not add cat with name " + catName);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}

    @SendTo("/game/catinfo")
    public CatInfo broadcastCatModel(@Payload CatInfo catName){
        return catName;
    }

    @SendTo("/game/gameState")
    @GetMapping("/gamestate")
    public ResponseEntity<GameStateModel> getGameState() {
        GameStateModel gameState = gameStateController.getGameState();
        //System.out.println(gameState);
        if(gameState == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(gameState);
    }

    @PostMapping("/action")
    public ResponseEntity<Void> takeAction(@RequestBody ActionInfo actionInfo){
        if(gameStateController.getGameState() == null){
            System.out.println("Received request to take action, but the game hasn't started yet");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        try{
            System.out.println("Received request to take action " + actionInfo.toString());
            gameStateController.takeAction(actionInfo);
            template.convertAndSend("/game/gameState", gameStateController.getGameState());

            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            System.out.println("Error: " + e.toString());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/grabAgent")
    public ResponseEntity<Void> pickupAgent(@RequestBody PlayerInfo playerInfo){
        try{
            gameStateController.pickupAgent(playerInfo.playerId());
            return ResponseEntity.ok().build();
        }
        catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/meowssionTargets")
    public ResponseEntity<Void> meowssionTargets(@RequestBody ResolveMeowssion resolveMeowssion){
        try{
            gameStateController.resolveMeowssion(resolveMeowssion);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/cat/{catName}")
    public ResponseEntity<CatModel> getCat(@PathVariable(value = "catName") String catName){
        try{
            CatModel cat = gameStateController.getLobby().getCats().stream().filter(thisCat -> thisCat.getName().equals(catName)).findFirst().orElseThrow(IllegalArgumentException::new);
            return ResponseEntity.ok().body(cat);
        }
        catch(IllegalArgumentException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    
}
