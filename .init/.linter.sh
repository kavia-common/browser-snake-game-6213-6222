#!/bin/bash
cd /home/kavia/workspace/code-generation/browser-snake-game-6213-6222/snake_game_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

