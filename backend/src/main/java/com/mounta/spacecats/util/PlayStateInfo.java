package com.mounta.spacecats.util;

import java.util.List;

import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public record PlayStateInfo(CatModel cat, List<CatModel> targetCats, PlanetModel targetPlanet, GameStateModel gameState, ResistCard playedCard) {
    
    @Override
    public String toString(){
        return "{" +
            " cat='" + cat.getName() + "'" + 
            " targetCats='" +  ((targetCats == null) ? null : targetCats.stream().map(CatModel::getName).toList().toString()) + "'" +
            " targetPlanet='" + ((targetPlanet == null) ? null : targetPlanet.getPosition()) + "'" +
            " playedCard=" + ((playedCard == null) ? null : playedCard.toString()) + "'" +
            "}";
    }
}
