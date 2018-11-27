# steam-web

## [Full Documentation on GH Pages](http://tidwell.github.io/nodeSteam/)

A [node.js](http://github.com/joyent/node) wrapper for Valve's [Steam Web API](http://developer.valvesoftware.com/wiki/Steam_Web_API).  Also supports the methods provided for [TF2/TF2Beta/Portal](http://wiki.teamfortress.com/wiki/WebAPI).

Use of the API requires an API key, obtainable [here](http://steamcommunity.com/dev/apikey).

This implementation is not supported, endorsed, or created by Valve - I'm just a fan.  This is just a wrapper - all of Valve's terms and conditions for using their API still apply, see the [Steam community developer page](http://steamcommunity.com/dev) for additional information.

## Installation

```bash
$ npm install steam-web-async
```

## Basic idea and usage

```javascript
const SteamWebAsync = require('steam-web-async');



var apiSWA = new SteamWebAsync({
    apiKey: '6A734940D66F571698692EE0F3816E12',
    format: 'json' //optional ['json', 'xml', 'vdf']
});


//examples of Async code
(async () => {
    
    var news = await apiSWA.getNewsForApp({appid: 440,count: 3, maxlength: 100})
    console.log(news);

    var acc = await apiSWA.resolveVanityURL({ vanityurl: 'Gabe'}); 
    console.log( acc.response);

})();

```

### Methods

All methods accept a single options object.  The key names match the query string parameters specified in the valve documentation. See usage and the valve documentation for any additional params.

All methods can be passed a ``.apiVersion`` property that overrides the default api version in the url.  Some methods (such as getSchema) will support different games on different versions (TF2 is only supported on v0001, CSGO is only supported on v0002). You can use this property to change the version for the api request if you are not getting back the expected response.

If using JSON for results (default), the result will automatically be parsed into a json object. Any other formats will return the raw data (xml or vdf).

#### getNewsForApp


#### getGlobalAchievementPercentagesForApp


#### getPlayerSummaries


#### getFriendList


#### getSchema


#### getPlayerItems


#### getAssetPrices


#### getAssetClassInfo


#### getPlayerAchievements


#### getRecentlyPlayedGames


#### getUserStatsForGame


#### getOwnedGames


#### getGlobalStatsForGame


#### isPlayingSharedGame


#### getSchemaForGame


#### getPlayerBans


#### getAppList


#### getServersAtAddress


#### upToDateCheck


#### getUserGroupList


#### resolveVanityURL


#### getNumberOfCurrentPlayers


#### getSteamLevel


#### getBadges


#### getCommunityBadgeProgress


#### getServerInfo


#### getSupportedAPIList


#### getSchemaURL


#### getStoreMetadata


#### getStoreStatus


## Usage

```javascript
var steamAsync = require('steam-web-async');

var s = new steamAsync({
  apiKey: 'XXXXXXXXXXXXXXXX',
  format: 'json' //optional ['json', 'xml', 'vdf']
});

s.getNewsForApp({
  appid: 440,
  count: 3,
  maxlength: 300
})
s.getGlobalAchievementPercentagesForApp({
  gameid: 440
});
s.getPlayerSummaries({
  steamids: ['76561198037414410', '76561197960435530']
})
s.getFriendList({
  steamid: '76561197960435530',
  relationship: 'all', //'all' or 'friend'
  callback: function(err,data) {
    console.log(data);
  },
})
s.getSchema({
  gameid: 440
})
s.getPlayerItems({
  gameid: 440,
  steamid: '76561197960435530'
})
s.getAssetPrices({
  appid: 440,  //can also use gameid instead for convenience
  callback: function(err,data) {
    console.log(data);
  }
})
s.getPlayerAchievements({
  gameid: 440,
  steamid: '76561197960435530',
  l: 'en',
  callback: function(err,data) {
    console.log(data);
  }
})
s.getRecentlyPlayedGames({
  steamid: '76561197960435530',
  callback: function(err,data) {
    console.log(data)
  }
})
s.getOwnedGames({
  steamid: '76561197960435530',
  callback: function(err,data) {
    console.log(data)
  }
})
s.getUserStatsForGame({
  steamid: '76561197963506690',
  appid: 730,
  callback: function(err,data) {
    console.log(data);
  }
})
s.getGlobalStatsForGame({
  appid: 17740,
  name: ['global.map.emp_isle'], // can also pass a single string
  count: 1, // or you can let the module work it out for you
  callback: function(err,data) {
    console.log(data);
  }
})
s.isPlayingSharedGame({
  steamid: '76561198120639625',
  appid_playing: 730,
  callback: function(err,data) {
    console.log(data);
  }
})
s.getSchemaForGame({
  appid: 730,
  callback: function(err,data) {
    console.log(data);
  }
})
s.getPlayerBans({
  steamids: ['76561198120639625'], // can also pass a single string
  callback: function(err,data) {
    console.log(data);
  }
})
s.getAppList(
})
s.getServersAtAddress({
  addr: '193.192.58.116'
})    
s.upToDateCheck({
  version: 100,
  appid: 440
})  
s.getUserGroupList({
  steamid: '76561197960435530'
})    
s.resolveVanityURL({
  vanityurl: 'vincegogh'
})  
s.getNumberOfCurrentPlayers({
  appid: 440
})
s.getSteamLevel({
  steamid: '76561197960435530'
})    
s.getBadges({
  steamid: '76561197960435530',
  callback: function(err, data) {
    console.log(data);   
  }
})
s.getCommunityBadgeProgress({
  steamid: '76561197960435530',
  badgeid: 2
})  
s.getServerInfo(
})    
s.getSupportedAPIList(
})
s.getSchemaURL({
  appid: 440
})    
s.getStoreMetadata({
  appid: 440
})
s.getStoreStatus({
  appid: 440
})
```

There are two ways to use getAssetClassInfo.  By default, the Steam API
wants a query string formatted as: ?classid0=1234&classid1=5678&class_count=2

As such, you can either manually generate the keys and call the method like this:

```javascript
s.getAssetClassInfo({
  appid: 440, //can also use gameid instead for convenience
  classid0: '16891096',
  classid1: 151,
  class_count: 2,
  callback: function(err,data) {
    console.log(data);
  }
})
```

OR, we have provided a convenience property so you can just pass an array of ids
(when using the convenience property, you don't need to pass class_count either)

```javascript
s.getAssetClassInfo({
  appid: 440, //can also use gameid instead for convenience
  classIds: ['16891096',151],
  callback: function(err,data) {
    console.log(data);
  }
})
```
## Changes

#### 1.0.0
* Added async / await support
* Added error handler (console output)


