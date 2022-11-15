package com.mounta.spacecats.configurations;

import com.mounta.spacecats.controllers.card.CardController;
import com.mounta.spacecats.controllers.cat.CatController;
import com.mounta.spacecats.controllers.gamestate.GameStateController;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "com.mounta.spacecats.controllers")
public class ApplicationConfiguration {
    @Bean
    public GameStateController gameStateController(){
        return new GameStateController();
    }

    @Bean
    public CatController catController(){
        return new CatController();
    }

    @Bean
    public CardController cardController(){
        return new CardController();
    }
}
