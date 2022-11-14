package com.mounta.spacecats.models.cards;

import java.util.List;

import com.mounta.spacecats.models.effects.EffectModel;

public abstract class CardModel {

    private String cardId;

    private List<EffectModel> cardEffects;

    public CardModel(String cardId, List<EffectModel> cardEffects){
        this.cardId = cardId;
        this.cardEffects = cardEffects;
    }

    public String getCardId() {
        return this.cardId;
    }

    public List<EffectModel> getCardEffects() {
        return this.cardEffects;
    }
    
}