package com.mounta.spacecats.util;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.mounta.spacecats.models.cards.GalaxyNewsCard;
import com.mounta.spacecats.models.cards.ResistCard;
import com.mounta.spacecats.models.effects.GalaxyEffects.*;
import com.mounta.spacecats.models.effects.ResistEffects.*;
import com.mounta.spacecats.models.meowssions.condition.BuildANetwork;
import com.mounta.spacecats.models.meowssions.condition.FreeTheDogs;
import com.mounta.spacecats.models.meowssions.condition.Meowssion;
import com.mounta.spacecats.models.meowssions.condition.RecruitAllies;
import com.mounta.spacecats.models.meowssions.condition.StealMedicine;
import com.mounta.spacecats.models.meowssions.rewards.MeowssionReward;
import com.mounta.spacecats.models.meowssions.rewards.RiseOfBunnies;
import com.mounta.spacecats.models.meowssions.rewards.TakeTime;
import com.mounta.spacecats.models.meowssions.rewards.Turmoil;
import com.mounta.spacecats.models.meowssions.rewards.WelcomedAsHeroes;
import com.mounta.spacecats.models.planets.Symbol;

public class CardConstants {

    public static GalaxyNewsCard GalaxyCard_A(){
        return new GalaxyNewsCard("GalaxyCard_A", new GalaxyNewsEffect_A());
    }

    public static GalaxyNewsCard GalaxyCard_B(){
        return new GalaxyNewsCard("GalaxyCard_B", new GalaxyNewsEffect_B());
    }

    public static GalaxyNewsCard GalaxyCard_C(){
        return new GalaxyNewsCard("GalaxyCard_C", new GalaxyNewsEffect_C());
    }

    public static GalaxyNewsCard GalaxyCard_D(){
        return new GalaxyNewsCard("GalaxyCard_D", new GalaxyNewsEffect_D());
    }

    public static GalaxyNewsCard GalaxyCard_E(){
        return new GalaxyNewsCard("GalaxyCard_E", new GalaxyNewsEffect_E());
    }

    public static ArrayDeque<GalaxyNewsCard> newGalaxyDeck(){
        ArrayList<GalaxyNewsCard> list = new ArrayList<>();

        for(int i = 0; i<10; i++){
            list.add(GalaxyCard_A());
        }

        for(int i = 0; i<2; i++){
            list.add(GalaxyCard_B());
        }

        for(int i = 0; i<2; i++){
            list.add(GalaxyCard_C());
        }

        list.add(GalaxyCard_D());

        list.add(GalaxyCard_E());

        Collections.shuffle(list);

        return new ArrayDeque<>(list);
    }

    public static ResistCard ResistCard_A(){
        return new ResistCard("ResistCard_A", new ResistEffect_A());
    }

    public static ResistCard ResistCard_B(){
        return new ResistCard("ResistCard_B", new ResistEffect_B());
    }

    public static ResistCard ResistCard_C(){
        return new ResistCard("ResistCard_C", new ResistEffect_C());
    }

    public static ResistCard ResistCard_D(){
        return new ResistCard("ResistCard_D", new ResistEffect_D());
    }

    public static ResistCard ResistCard_E(){
        return new ResistCard("ResistCard_E", new ResistEffect_E());
    }

    public static ResistCard ResistCard_F(Symbol symbol){
        return new ResistCard("ResistCard_F", new ResistEffect_F(symbol));
    }

    public static ArrayDeque<ResistCard> newResistDeck(){
        ArrayList<ResistCard> list = new ArrayList<>();

        for(int i = 0; i<8; i++){
            list.add(ResistCard_A());
        }

        for(int i = 0; i<6; i++){
            list.add(ResistCard_B());
        }

        for(int i = 0; i<4; i++){
            list.add(ResistCard_C());
        }

        for(int i = 0; i<5; i++){
            list.add(ResistCard_D());
        }

        for(int i = 0; i<3; i++){
            list.add(ResistCard_E());
        }

        Symbol[] symbols = Symbol.values();
        for(int i = 0; i<5; i++){
            for(Symbol symbol : symbols) {
                list.add(ResistCard_F(symbol));
            }
        }

        Collections.shuffle(list);
        return new ArrayDeque<>(list);
    }

    public static ArrayDeque<Meowssion> newMeowssionDeck(){
        ArrayList<Meowssion> list = new ArrayList<>();

        list.addAll(List.of(new BuildANetwork(), new FreeTheDogs(), new RecruitAllies(), new StealMedicine()));

        Collections.shuffle(list);
        return new ArrayDeque<>(list);
    }

    public static ArrayDeque<MeowssionReward> newMeowssionRewardDeck(){
        ArrayList<MeowssionReward> list = new ArrayList<>();

        list.addAll(List.of(new RiseOfBunnies(), new TakeTime(), new Turmoil(), new WelcomedAsHeroes()));

        Collections.shuffle(list);
        return new ArrayDeque<>(list);
    }
}
