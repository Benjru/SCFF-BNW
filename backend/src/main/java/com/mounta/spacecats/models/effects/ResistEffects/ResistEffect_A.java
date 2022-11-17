package com.mounta.spacecats.models.effects.ResistEffects;

import com.mounta.spacecats.models.effects.ConditionalEffect;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_A implements ConditionalEffect {

    @Override
    public boolean condition(PlayStateInfo playState) {
        return playState.cat().getCurrPlanet().getFascismLevel() <= 0;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        PlanetModel planet = playState.cat().getCurrPlanet();
        
        planet.updateFascismLevel(-1);
    }
    
}
