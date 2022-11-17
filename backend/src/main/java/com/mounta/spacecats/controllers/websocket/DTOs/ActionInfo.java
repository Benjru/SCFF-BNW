package com.mounta.spacecats.controllers.websocket.DTOs;

public record ActionInfo(int playerId, int planetPosition, String cardName, String actionName, String symbol)  {
    
}
