package com.mounta.spacecats.controllers.websocket.DTOs;

import java.util.List;

public record ActionInfo(int playerId, int planetPosition, String cardName, String actionName, String symbol, List<String> targetCats)  {
    
}
