package com.mounta.spacecats.models.cards;


import com.mounta.spacecats.models.effects.ConditionalEffect;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistCard extends CardModel {

    public ResistCard(String cardId, ConditionalEffect cardEffect) {
        super(cardId, cardEffect);
    }

    public boolean effectCondition(PlayStateInfo playStateInfo){
        return ((ConditionalEffect)getCardEffect()).condition(playStateInfo);
    }
    
}
