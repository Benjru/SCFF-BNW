package com.mounta.spacecats.models.meowssions.rewards;

import com.mounta.spacecats.controllers.websocket.DTOs.ResolveMeowssion;
import com.mounta.spacecats.models.effects.EffectModel;

public interface MeowssionReward extends EffectModel {
    boolean condition(ResolveMeowssion resolveMeowssion);
    
}
