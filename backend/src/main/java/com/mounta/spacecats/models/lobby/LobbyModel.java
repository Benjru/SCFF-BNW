package com.mounta.spacecats.models.lobby;

import java.util.ArrayList;

import com.mounta.spacecats.models.cats.CatModel;

public class LobbyModel {
    private ArrayList<CatModel> cats;

    public LobbyModel(){
        this.cats = new ArrayList<>();
    }

    public void addCat(CatModel cat){
        if(!cats.contains(cat) && cats.size() < 2){
            cats.add(cat);
        }
    }

    public ArrayList<CatModel> getCats(){
        return cats;
    }
}
