package com.mounta.spacecats.models.lobby;

import java.util.List;

import com.mounta.spacecats.models.cats.CatModel;

public class LobbyModel {
    private List<CatModel> cats;

    public LobbyModel(){
        this.cats = List.of();
    }

    public void addCat(CatModel cat){
        if(!cats.contains(cat) && cats.size() < 2){
            cats.add(cat);
        }
    }

    public List<CatModel> getCats(){
        return cats;
    }
}
