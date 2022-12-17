package com.mounta.spacecats.models.meowssions.rewards;

import com.mounta.spacecats.controllers.websocket.DTOs.ResolveMeowssion;
import com.mounta.spacecats.util.PlayStateInfo;

public class TakeTime implements MeowssionReward {
    @Override
    public void resolve(PlayStateInfo playStateInfo){
        
    }

    @Override
    public boolean condition(ResolveMeowssion resolveMeowssion) {
        // TODO Auto-generated method stub
        return resolveMeowssion.removeFascism() == null && resolveMeowssion.heal() != null && resolveMeowssion.teleport() == null && resolveMeowssion.liberate() == null;
    }
}
