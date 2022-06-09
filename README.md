# MusicRecomenderSystem_Flask
- Music Recommender System Server Using Flask
- Using Spotify API
- Using this link for get information song with id: https://developer.spotify.com/console/get-track/?id=6JVy1PrxgvsljjACUupfQ5&market=
- Link Colab: https://colab.research.google.com/drive/1NKXIiSKFi5rnvPuHTjDc9n5KvpmmP7_E?usp=sharing
- Link tutorial: https://towardsdatascience.com/how-to-build-an-amazing-music-recommendation-system-4cce2719a572
#### Request Data Example: [{
		"name": "I Don't Think I'm Okay",
		"year": 2020
	},
	{
		"name": "Do It To My Heart",
		"year": 2022
	},
	{
		"name": "Soda (feat. Take A Daytrip)",
		"year": 2020
	},
	{
		"name": "Halloweenie III: Seven Days",
		"year": 2020
	},
	{
		"name": "AYA",
		"year": 2020
	}
]
#### Response Data Example: 
[
    {
        "artists": "['Vance Joy']",
        "id": "7oekneJCJO74ycdLzdk16v",
        "name": "Lay It on Me",
        "year": 2018
    },
    {
        "artists": "['Surfaces']",
        "id": "5Pgq1Gfeth2CuUhyCXwlfC",
        "name": "Take It Easy",
        "year": 2020
    },
    {
        "artists": "['EVERGLOW']",
        "id": "06Pvy98db25O7wlfFFFIRM",
        "name": "Bon Bon Chocolat",
        "year": 2019
    },
    {
        "artists": "['NOTD', 'Bea Miller']",
        "id": "18W92Zm1KjLCbUIszOhpkD",
        "name": "I Wanna Know (feat. Bea Miller)",
        "year": 2018
    },
    {
        "artists": "['Moguai', 'Cheat Codes']",
        "id": "0XnHIhm9ppEHHDSRESdEcV",
        "name": "Hold On (feat. Cheat Codes) - Radio Edit",
        "year": 2015
    },
    {
        "artists": "['Lee Brice']",
        "id": "1ATvZTCBsBo7tL6YwHUc1m",
        "name": "Don't Need No Reason",
        "year": 2020
    },
    {
        "artists": "['James Bay']",
        "id": "7tmtOEDxPN7CWaQWBsG1DY",
        "name": "Hold Back The River",
        "year": 2014
    },
    {
        "artists": "['Katy Perry']",
        "id": "02FaKXXL7KUtRc7K0k54tL",
        "name": "Cozy Little Christmas",
        "year": 2018
    },
    {
        "artists": "['EXO']",
        "id": "7GbUWl6qLW1gdngbEV2WDJ",
        "name": "Monster",
        "year": 2016
    },
    {
        "artists": "['Usher']",
        "id": "7beY8mXJuC4l0J2WgVoCfm",
        "name": "Bad Habits",
        "year": 2020
    }
]                                     
