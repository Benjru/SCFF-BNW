package com.mounta.spacecats.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.mounta.spacecats.controllers.gamestate.GameStateController;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.websocket.DTOs.CatInfo;

@RestController
public class WebSocketGameController {
    @Autowired
    SimpMessagingTemplate template;

    @Autowired
    GameStateController gameStateController;

    @PostMapping("/join")
	public ResponseEntity<Void> sendMessage(@RequestBody CatInfo catName) {
        template.convertAndSend("/game/catInfo", gameStateController.joinGame(catName.catName()));
		return new ResponseEntity<>(HttpStatus.OK);
	}

    @SendTo("/game/catInfo")
    public CatModel broadcastCatModle(@Payload CatModel catModel){
        return catModel;
    }


    
}
