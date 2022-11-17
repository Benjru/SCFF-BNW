# Spring Boot Backend

Wyatt Stagg, Nathan Kimball, Ben Hallihan

## Running the backend

### Requirements
JDK 17

### Running the backend

In the backend directory, run the command `./gradlew bootRun`
this will create an instance of the backend hosted on `localhost:8080`

## Endpoints

### POST Endpoints

#### /join

The join endpoint lets cats join the game, you must provide a message body matching the following syntax:

`{
  "catName": "*Insert Cat Name*"
}`

#### /action

The action endpoint allows a player to take an action, you must provide a message body matching the following syntax:

`{
  "playerId": PlayerId(INTEGER),
  "planetPosition": PositionOOfPlanet(INTEGER),
  "cardName": "ID of card that has been played if applicable",
  "actionName": "fightFascism"/"playCard"/"travel"/"restock",
  "symbol": "Symbol of the played card if it is a symbol card"
}`

### GET Endpoints

#### /gameState

Provides a copy of the gamestate, example given below

```{
    "resistCardDiscard": [],
    "galaxyNewsDiscard": [],
    "cats": [
        {
            "name": "cj",
            "abilities": [],
            "scratches": 0,
            "homePlanet": 9,
            "currPlanet": 9,
            "playerId": 0,
            "hand": [
                {
                    "cardId": "ResistCard_F",
                    "cardEffect": "PAW"
                },
                {
                    "cardId": "ResistCard_D",
                    "cardEffect": null
                }
            ]
        },
        {
            "name": "jasper",
            "abilities": [],
            "scratches": 0,
            "homePlanet": 2,
            "currPlanet": 2,
            "playerId": 1,
            "hand": [
                {
                    "cardId": "ResistCard_F",
                    "cardEffect": "TAIL"
                },
                {
                    "cardId": "ResistCard_F",
                    "cardEffect": "WHISKERS"
                }
            ]
        }
    ],
    "planets": [
        {
            "number": 4,
            "fascismLevel": 0,
            "position": 1
        },
        {
            "number": 6,
            "fascismLevel": 1,
            "position": 2
        },
        {
            "number": 8,
            "fascismLevel": 0,
            "position": 3
        },
        {
            "number": 3,
            "fascismLevel": 0,
            "position": 4
        },
        {
            "number": 11,
            "fascismLevel": 0,
            "position": 5
        },
        {
            "number": 5,
            "fascismLevel": 0,
            "position": 6
        },
        {
            "number": 2,
            "fascismLevel": 0,
            "position": 7
        },
        {
            "number": 12,
            "fascismLevel": 0,
            "position": 8
        },
        {
            "number": 7,
            "fascismLevel": 1,
            "position": 9
        },
        {
            "number": 10,
            "fascismLevel": 0,
            "position": 10
        },
        {
            "number": 9,
            "fascismLevel": 0,
            "position": 11
        },
        {
            "number": 1,
            "fascismLevel": 0,
            "position": 12
        }
    ],
    "currTurn": 0,
    "actionsLeft": 3,
    "globalFascismScale": 1,
    "actionsTaken": []
}```
