package com.mounta.spacecats.models.actions;

import java.util.List;

import com.mounta.spacecats.models.cats.CatModel;
import com.mounta.spacecats.models.planets.PlanetModel;

public record ActionLog(String action, PlanetModel planet, List<CatModel> targetCats) {
    
}
