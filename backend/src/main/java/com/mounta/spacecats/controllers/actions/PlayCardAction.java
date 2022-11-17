package com.mounta.spacecats.controllers.actions;

import com.mounta.spacecats.util.PlayStateInfo;

public class PlayCardAction implements Action {

    @Override
    public void resolveAction(PlayStateInfo playStateInfo) {
        playStateInfo.playedCard().getCardEffect().resolve(playStateInfo);
        playStateInfo.gameState().discardCard(playStateInfo.playedCard(), playStateInfo.cat());

    }

    @Override
    public boolean condition(PlayStateInfo playStateInfo) {
        return playStateInfo.playedCard().effectCondition(playStateInfo);
    }

}
