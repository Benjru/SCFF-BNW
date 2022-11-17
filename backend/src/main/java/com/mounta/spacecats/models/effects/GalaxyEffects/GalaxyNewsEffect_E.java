package com.mounta.spacecats.models.effects.GalaxyEffects;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class GalaxyNewsEffect_E implements EffectModel {

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        int carryOver = cat.updateScratches(2);
        playState.gameState().updateGlobalFascismScale(carryOver);

        cat.moveToPlanet(cat.getHomePlanet());


    }
    
}
