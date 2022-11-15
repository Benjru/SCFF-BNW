package com.mounta.spacecats.controllers.actions;

import com.mounta.spacecats.util.PlayStateInfo;

public interface Action {
    void resolveAction(PlayStateInfo playStateInfo);

    boolean condition(PlayStateInfo playStateInfo);
}