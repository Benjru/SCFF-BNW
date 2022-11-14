package com.mounta.spacecats.models.effects.GalaxyEffects;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class GalaxyNewsEffect_A implements EffectModel {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        int carryOver = cat.updateScratches(1);
        playState.gameState().updateGlobalFascismScale(carryOver + 1);
        
    }
    
}
