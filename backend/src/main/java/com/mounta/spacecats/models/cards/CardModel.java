package com.mounta.spacecats.models.cards;

import java.util.List;

import com.mounta.spacecats.controllers.EffectController;

public abstract class CardModel {

    private String cardId;

    private List<EffectController> cardEffects;

    public CardModel(String cardId, List<EffectController> cardEffects){
        this.cardId = cardId;
        this.cardEffects = cardEffects;
    }

    public String getCardId() {
        return this.cardId;
    }

    public List<EffectController> getCardEffects() {
        return this.cardEffects;
    }
    
}