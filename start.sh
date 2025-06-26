#!/usr/bin/env bash

project_dir=$HOME/Code/projects/ai-story-teller/

cd "$project_dir"/backend/
zellij run --name "backend" -- zsh -ic "pnpm run dev";

cd "$project_dir"/frontend/story_teller/
zellij run --name "frontend" -- zsh -ic "pnpm run dev";

cd "$project_dir"
docker compose up
