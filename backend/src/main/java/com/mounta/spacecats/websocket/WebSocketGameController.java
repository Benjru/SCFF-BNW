package com.mounta.spacecats.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mounta.spacecats.controllers.gamestate.GameStateController;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.util.PlayStateInfo;
import com.mounta.spacecats.websocket.DTOs.ActionInfo;
import com.mounta.spacecats.websocket.DTOs.CatInfo;

@RestController
public class WebSocketGameController {

    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    GameStateController gameStateController;

    @PostMapping("/join")
	public ResponseEntity<Void> joinGame(@RequestBody CatInfo catName) {
        CatModel cat = gameStateController.joinGame(catName.catName());
        if(cat != null){
            System.out.println(cat.toString());
        template.convertAndSend("/game/catInfo", catName);
		return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

    @SendTo("/game/catinfo")
    public CatInfo broadcastCatModle(@Payload CatInfo catName){
        return catName;
    }

    @SendTo("/game/gameState")
    @GetMapping("/gamestate")
    public ResponseEntity<GameStateModel> getGameState() {
        GameStateModel gameState = gameStateController.getGameState();
        System.out.println(gameState);
        return ResponseEntity.ok().body(gameState);
    }

    @PostMapping("/action")
    public ResponseEntity<Void> takeAction(@RequestBody ActionInfo actionInfo){
        try{
            gameStateController.takeAction(actionInfo);

            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
}
