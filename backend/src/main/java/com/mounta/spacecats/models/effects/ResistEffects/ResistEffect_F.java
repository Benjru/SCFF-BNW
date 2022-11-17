package com.mounta.spacecats.models.effects.ResistEffects;

import com.mounta.spacecats.models.effects.EffectModel;
import com.mounta.spacecats.models.planets.PlanetModel;
import com.mounta.spacecats.models.planets.Symbol;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_F implements EffectModel {

    private Symbol symbol;

    public ResistEffect_F(Symbol symbol){
        this.symbol = symbol;
    }

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub

        PlanetModel planet = playState.cat().getCurrPlanet();

        return planet.getSymbol().equals(symbol) && planet.getFascismLevel() <= 0;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        PlanetModel planet = playState.cat().getCurrPlanet();

        planet.updateFascismLevel(-2);
    }
    
    public Symbol getSymbol(){
        return symbol;
    }
    
}
