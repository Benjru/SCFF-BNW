package com.mounta.spacecats.controllers.gamestate;

import com.mounta.spacecats.configurations.ApplicationConfiguration;
import com.mounta.spacecats.controllers.card.CardController;
import com.mounta.spacecats.controllers.cat.CatController;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class GameStateController {

    private static final ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfiguration.class);

    private GameStateModel gameState;

    @Autowired
    private CardController cardController;

    @Autowired
    private CatController catController;

    public void setCatController(CatController catController){
        this.catController = catController;
    }

    public void setCardController(CardController cardController){
        this.cardController = cardController;
    }

}
