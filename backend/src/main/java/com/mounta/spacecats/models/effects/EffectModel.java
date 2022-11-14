package com.mounta.spacecats.models.effects;

import com.mounta.spacecats.util.PlayStateInfo;

public interface EffectModel {
    boolean condition(PlayStateInfo playState);

    void resolve(PlayStateInfo playState);
}
