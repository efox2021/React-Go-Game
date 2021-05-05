import {Component} from 'react';

const underscore = require("underscore");
const _ = require("underscore");


export const board = () => {
  var boardGame = {
     current_color: 1,
     size: 19,
     last_move_passed: false,
     in_atari: false,
     attempted_suicide: false,
     empty: 0,
     black: 1,
     white: 2
  };

  var m =[];
  for(var i=0; i< 19; i++){
    m[i]=[];
    for(var j=0; j< 19; j++){
      m[i][j]=0;
    }
  }

  boardGame.board = m;

  const switch_player = () => {
    boardGame.current_color = boardGame.current_color === 1 ? 2 : 1;
  };


  const pass = () => {
    console.log("Hi")
    if(boardGame.last_move_passed)
      end_game();
    console.log(boardGame);
    boardGame.last_move_passed= true;
    switch_player();
  };

  const end_game = () => {
    console.log("GAME OVER");
  };

  const play = (i, j) => {
      const { board, empty, current_color } = boardGame;
      console.log("Played at " + i + ", " + j);
      boardGame.attempted_suicide = false;
      boardGame.in_atari= false;

      if(board[i][j] !== empty)
      return false;

      var color = board[i][j] = boardGame.current_color;
      var captured = [];
      var neighbors = get_adjacent_intersections(i, j);
      var atari = false;

      _.each(neighbors, function(n) {
          var state = board[n[0]][n[1]];
          if (state != 0 && state != color) {
              var group = get_group(n[0], n[1]);
              console.log(group);
              if (group["liberties"] == 0)
                  captured.push(group);
              else if (group["liberties"] == 1)
                  atari = true;
          }
      });

      // detect suicide
      if (_.isEmpty(captured) && boardGame.get_group(i, j)["liberties"] == 0) {
          board[i][j] = 0;
          boardGame.attempted_suicide = true;
          return false;
      }

      console.log(captured)

      _.each(captured, function(group) {
          _.each(group["stones"], function(stone) {
              if(stone && stone.length > 1)
                board[stone[0]][stone[1]] = 0;
          });
      });

      if (atari)
          boardGame.in_atari = true;

      boardGame.last_move_passed = false;
      switch_player();
      return true;
    }

    const get_adjacent_intersections = (i, j) => {
      var neighbors=[];

      if(i > 0)
        neighbors.push([i-1, j]);
      if(j < boardGame.size -1)
        neighbors.push([i, j+1]);
      if(i < boardGame.size - 1)
        neighbors.push([i+1, j]);
      if(j > 0)
        neighbors.push([i, j-1]);

      return neighbors;
    }

    const get_group = (i, j) => {
      const { board, empty, current_color } = boardGame;
      var color = board[i][j];

      console.log(current_color)
      if(color === 0)
        return null; //TODO

      var visited = {};
      var visited_list = [];
      var queue=[[i, j]];
      var count =0;

      while(queue.length > 0){
          var stone = queue.pop();
          if(visited[stone])
            continue;

          var neighbors = get_adjacent_intersections(stone[0], stone[1]);
          underscore.each(neighbors, function(n) {
            var state = board[n[0]][n[1]];
            if(state === 0)
              count++;
            if(state === 1)
              queue.push(n[0],n[1]);
          });

          visited[stone] = true;
          visited_list.push(stone);
      }
      return {
        "liberties": count,
        "stones": visited_list
      };
    }

  boardGame.play = play;
  boardGame.get_group = get_group;
  boardGame.pass = pass;
  return boardGame;
}
