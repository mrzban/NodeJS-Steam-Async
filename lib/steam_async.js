"use strict";
var _createClass = (function() {
  function a(b, c) {
    for (var e, d = 0; d < c.length; d++)
      (e = c[d]),
        (e.enumerable = e.enumerable || !1),
        (e.configurable = !0),
        "value" in e && (e.writable = !0),
        Object.defineProperty(b, e.key, e);
  }
  return function(b, c, d) {
    return c && a(b.prototype, c), d && a(b, d), b;
  };
})();
function _classCallCheck(a, b) {
  if (!(a instanceof b))
    throw new TypeError("Cannot call a class as a function");
}
var steam = require("./steam");
module.exports = (function() {
  function a(b) {
    var d = this;
    _classCallCheck(this, a), (this.instance = new steam(b));
    "getNewsForApp,getGlobalAchievementPercentagesForApp,getPlayerSummaries,getFriendList,getSchema,getPlayerItems,getAssetPrices,getAssetClassInfo,getPlayerAchievements,getRecentlyPlayedGames,getUserStatsForGame,getOwnedGames,getGlobalStatsForGame,isPlayingSharedGame,getSchemaForGame,getPlayerBans,getAppList,getServersAtAddress,upToDateCheck,getUserGroupList,resolveVanityURL,getNumberOfCurrentPlayers,getSteamLevel,getBadges,getCommunityBadgeProgress,getServerInfo,getSupportedAPIList,getSchemaURL,getStoreMetadata,getStoreStatus"
      .split(",")
      .forEach(function(e) {
        d[e] = function(f) {
          return this.call(e, f);
        };
      });
  }
  return (
    _createClass(a, [
      {
        key: "call",
        value: function call(b, c) {
          var d = this;
          return new Promise(function(e, f) {
            (d.steamErr = ""),
              (c.callback = function(g, h) {
                g && ((d.steamErr = g), f(g)), e(h);
              }),
              d.instance[b](c);
          }).catch(function(e) {
            console.log(e);
          });
        }
      }
    ]),
    a
  );
})();