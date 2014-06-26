"use strict";

$(document).ready(function (){

var source   = $("#game").html();
var template = Handlebars.compile(source);
var html = template({gameid:"test", progress:45, guest_score:"1", host_score:"0", game_started:1});

$.ajax({
  url: "http://worldcup.sfg.io/matches/today",
  dataType: "json",

  success: function( data ) {

  data.forEach(function(match) {
    var now = new Date();
    var progress = new Date(match.datetime);

    var minutes = (now - progress) / (1000*60);

    var minutes_percent = ((minutes - 15) / 90) * 100;

    var guest_flag = "flags/" + match.away_team.code + ".png";
    var host_flag = "flags/" + match.home_team.code + ".png";

    var html = template({
      gameid: match.match_number,
      progress: minutes_percent,
      guest_score: match.away_team.goals,
      host_score: match.home_team.golas,
      game_started: match.status === "in progress" ? 1 : 0,
      guest_flag: guest_flag,
      host_flag: host_flag
    });

  $("body").append(html);

  });

}

});

});
