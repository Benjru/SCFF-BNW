package com.mounta.spacecats.models.cards;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.effects.ResistEffects.ResistEffect_F;

public abstract class CardModel {

    private String cardId;

    @JsonSerialize(using = EffectSerializer.class)
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

    @Override
    public String toString(){
        return cardId;
    }
    
    private static class EffectSerializer extends JsonSerializer<EffectModel> {

        @Override
        public void serialize(EffectModel value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
            // TODO Auto-generated method stub
            if(value instanceof ResistEffect_F){
                gen.writeObject(((ResistEffect_F)value).getSymbol());
            }
            else{
                gen.writeObject(null);
            }
        }
        
    }
}