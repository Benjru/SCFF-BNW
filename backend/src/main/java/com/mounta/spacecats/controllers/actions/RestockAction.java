package com.mounta.spacecats.controllers.actions;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.util.PlayStateInfo;

public class RestockAction implements Action {

    @Override
    public void resolveAction(PlayStateInfo playStateInfo) {
        CatModel cat = playStateInfo.cat();
        int numCards = cat.getHand().size();
        for(int i = numCards; i<CatModel.MAX_CARDS; i++){
            playStateInfo.gameState().drawResistCard(cat);
        }
        
    }

    @Override
    public boolean condition(PlayStateInfo playStateInfo) {
        return true;
    }

}
