#!/usr/bin/env bash

project_dir=$HOME/Code/projects/voxabook/

cd "$project_dir"/backend/
zellij run --name "backend" -- zsh -ic "pnpm run dev";

cd "$project_dir"/frontend/
zellij run --name "frontend" -- zsh -ic "pnpm run dev";

cd "$project_dir"
docker compose -f ./docker-compose-dev.yml up
