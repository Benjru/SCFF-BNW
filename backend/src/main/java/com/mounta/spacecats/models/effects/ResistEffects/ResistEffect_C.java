package com.mounta.spacecats.models.effects.ResistEffects;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_C implements EffectModel {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        CatModel target = playState.targetCat();

        return cat.getCurrPlanet().equals(target.getCurrPlanet());
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel target = playState.targetCat();

        target.updateScratches(-2);
    }
    
}
