package com.mounta.spacecats.models.meowssions.condition;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.mounta.spacecats.models.actions.ActionLog;
import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.gamestate.GameStateModel;


public class StealMedicine extends Meowssion {

    public StealMedicine(){
        super(List.of(1, 2, 3), "StealMedicine");
    }

    @Override
    public boolean condition(GameStateModel gameState){
        List<String> healCards = List.of("ResistCard_B", "ResistCard_C");
        List<ActionLog> healActions = gameState.getActionsTaken().stream().filter(action -> action.action().equals("playCard")).filter(action -> healCards.contains(action.cardName())).toList();
        List<CatModel> healedCats = healActions.stream().flatMap(action -> action.targetCats().stream()).toList();
        Map<CatModel, Integer> heals = healedCats.stream().collect(Collectors.toMap(Function.identity(),
        cat -> healActions.stream().flatMap(action -> action.targetCats().stream()).filter(targetCat -> targetCat.equals(cat)).toList().size()));
        return heals.values().stream().anyMatch(val -> val >=2);
    }

}
