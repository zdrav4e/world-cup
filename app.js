"use strict";

$(document).ready(function (){

var source   = $("#game").html();
var template = Handlebars.compile(source);

var source_team   = $("#team-details").html();
var template_team = Handlebars.compile(source_team);


$.ajax({
  url: "http://worldcup.sfg.io/matches/today",
  dataType: "json",

  success: function( data ) {

    var teams;
    $.getJSON("http://worldcup.sfg.io/teams/results", function(_data) {
      teams = _data;

  data.forEach(function(match) {
    var now = new Date();
    var progress = new Date(match.datetime);

    var minutes = (now - progress) / (1000*60);

    var minutes_percent = ((minutes - 15) / 90) * 100;

    var guest_flag = "flags/" + match.away_team.code + ".png";
    var host_flag = "flags/" + match.home_team.code + ".png";
    var min_left = 105 - minutes;
    var starts_at = progress.getHours();


    teams.forEach(function(team){

      if (team.country === match.home_team.country) {
        match.home_team.details = team;
      }
      if (team.country === match.away_team.country) {
        match.away_team.details = team;
      }

    });

    var host_details = template_team({
      group: match.home_team.details.group_letter,
      wins: match.home_team.details.wins,
      losses: match.home_team.details.losses,
      games: match.home_team.details.games_played,
      name: match.home_team.details.country
    });


if (typeof match.away_team.details.group_letter === "undefined") {
  console.log(match.away_team.details);
}
    var guest_details = template_team({
      group: match.away_team.details.group_letter,
      wins: match.away_team.details.wins,
      losses: match.away_team.details.losses,
      games: match.away_team.details.games_played,
      name: match.away_team.details.country
    });

    var html = template({
      gameid: match.match_number,
      progress: minutes_percent,
      guest_score: match.away_team.goals,
      host_score: match.home_team.goals,
      game_started: match.status === "in progress" ? 1 : 0,
      guest_flag: guest_flag,
      host_flag: host_flag,
      guest_name: match.away_team.country,
      host_name: match.home_team.country,
      min_left: min_left,
      starts_at: starts_at,
      host_details : host_details,
      guest_details: guest_details
    });

  $("body").append(html);
  $("button").popover();

    });




  $("img.flag").click(function() {
    $(this).parent().find("span.details").toggle();
  });

  });

}

});

});
