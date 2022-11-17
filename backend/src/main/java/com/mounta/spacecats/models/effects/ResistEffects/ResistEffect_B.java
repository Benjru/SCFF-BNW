package com.mounta.spacecats.models.effects.ResistEffects;

import java.util.List;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.effects.ConditionalEffect;
import com.mounta.spacecats.util.PlayStateInfo;

public class ResistEffect_B implements ConditionalEffect {

    @Override
    public boolean condition(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        CatModel cat = playState.cat();
        List<CatModel> targets = playState.targetCats();

        return targets.stream().allMatch(target -> target.getCurrPlanet().equals(cat.getCurrPlanet())) && targets.size() == 1;
    }

    @Override
    public void resolve(PlayStateInfo playState) {
        // TODO Auto-generated method stub
        for(CatModel target : playState.targetCats()){
        target.updateScratches(-1);
        }
    }
    
}
