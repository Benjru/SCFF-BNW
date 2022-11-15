package com.mounta.spacecats.models.cards;

import com.mounta.spacecats.models.effects.EffectModel;

public abstract class CardModel {

    private String cardId;

    private EffectModel cardEffect;

    public CardModel(String cardId, EffectModel cardEffects){
        this.cardId = cardId;
        this.cardEffect = cardEffects;
    }

    public String getCardId() {
        return this.cardId;
    }

    public EffectModel getCardEffect() {
        return this.cardEffect;
    }
    
}