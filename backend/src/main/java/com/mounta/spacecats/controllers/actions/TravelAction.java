package com.mounta.spacecats.controllers.actions;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class TravelAction implements Action {

    @Override
    public void resolveAction(PlayStateInfo playStateInfo) {
        CatModel cat = playStateInfo.cat();
        cat.moveToPlanet(playStateInfo.targetPlanet());
    }

    @Override
    public boolean condition(PlayStateInfo playStateInfo) {
        return true;
    }

}
