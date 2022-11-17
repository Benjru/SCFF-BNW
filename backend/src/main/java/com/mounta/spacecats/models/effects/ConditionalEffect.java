package com.mounta.spacecats.models.effects;

import com.mounta.spacecats.util.PlayStateInfo;

public interface ConditionalEffect extends EffectModel {
    boolean condition(PlayStateInfo playState);
}
