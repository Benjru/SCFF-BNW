package com.mounta.spacecats.util;

import com.mounta.spacecats.models.cards.CardModel;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public record PlayStateInfo(CatModel cat, CatModel targetCat, PlanetModel targetPlanet, GameStateModel gameState, ResistCard playedCard) {
    
}
