package com.mounta.spacecats.models.cards;

import com.mounta.spacecats.models.meowssions.rewards.MeowssionReward;

public class MeowssionRewardCard {
    
    private String id;
    private MeowssionReward reward;

    public MeowssionRewardCard(String id, MeowssionReward meowssionReward){
        this.reward = meowssionReward;
        this.id = id;
    }
}
