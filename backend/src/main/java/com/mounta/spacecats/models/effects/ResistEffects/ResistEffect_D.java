package com.mounta.spacecats.models.effects.ResistEffects;

import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_D implements EffectModel {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        PlanetModel planet = playState.cat().getCurrPlanet();

        int level = planet.getFascismLevel();

        return level > 0;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        PlanetModel planet = playState.cat().getCurrPlanet();

        int level = planet.getFascismLevel();

        int val = 2;

        if(val > level){
            val = level;
        }
        planet.updateFascismLevel(-val);
    }
    
}
