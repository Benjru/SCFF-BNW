package com.mounta.spacecats.models.effects.ResistEffects;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_E implements EffectModel {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub

        return true;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        PlanetModel targetPlanet = playState.targetPlanet();

        cat.moveToPlanet(targetPlanet);
    }
    
}
