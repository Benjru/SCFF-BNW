package com.mounta.spacecats.controllers.actions;

import com.mounta.spacecats.util.PlayStateInfo;

public class FightFascismAction implements Action {

    @Override
    public void resolveAction(PlayStateInfo playStateInfo) {
        playStateInfo.cat().getCurrPlanet().updateFascismLevel(-1);
        
    }

    @Override
    public boolean condition(PlayStateInfo playStateInfo) {
        return playStateInfo.cat().getCurrPlanet().getFascismLevel() > 0;
    }

}
