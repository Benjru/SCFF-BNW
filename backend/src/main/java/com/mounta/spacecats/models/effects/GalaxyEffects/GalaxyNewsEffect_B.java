package com.mounta.spacecats.models.effects.GalaxyEffects;

import java.util.ArrayList;
import java.util.List;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class GalaxyNewsEffect_B implements EffectModel {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        return true;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        PlanetModel planet = cat.getCurrPlanet();
        ArrayList<CatModel> cats = playState.gameState().getCats();

        planet.updateFascismLevel(1);

        cats
        .stream()
        .filter(thisCat -> thisCat.getCurrPlanet().equals(planet))
        .forEach(thisCat -> {
            int carryOver = thisCat.updateScratches(1);
            playState.gameState().updateGlobalFascismScale(carryOver);
        });
    }
    
}
