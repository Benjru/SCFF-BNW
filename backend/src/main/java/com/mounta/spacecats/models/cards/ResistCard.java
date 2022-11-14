package com.mounta.spacecats.models.cards;

import java.util.List;

import com.mounta.spacecats.controllers.EffectController;
import com.mounta.spacecats.models.cats.CatModel;

public class ResistCard extends CardModel {

    private CatModel player;

    public ResistCard(String cardId, List<EffectController> cardEffects, CatModel player) {
        super(cardId, cardEffects);
        this.player = player;
    }

    public CatModel getPlayer() {
        return this.player;
    }

    public void setPlayer(CatModel player) {
        this.player = player;
    }
    
}
