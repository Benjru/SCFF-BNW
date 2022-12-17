package com.mounta.spacecats.models.cards;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mounta.spacecats.models.meowssions.rewards.MeowssionReward;

public class MeowssionRewardCard extends CardModel {

    public MeowssionRewardCard(String id, MeowssionReward meowssionReward){
        super(id, meowssionReward);
    }

    @JsonIgnore
    public MeowssionReward getEffect(){
        return (MeowssionReward)this.getCardEffect();
    }

}
