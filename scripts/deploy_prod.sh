#!/usr/bin/env sh

set -eu

COMPOSE_FILE="docker/prod/docker-compose.yml"
ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Missing $ENV_FILE in deploy directory."
  exit 1
fi

if [ -n "${REGISTRY_HOST:-}" ] && [ -n "${REGISTRY_USERNAME:-}" ] && [ -n "${REGISTRY_PASSWORD:-}" ]; then
  printf '%s' "$REGISTRY_PASSWORD" | docker login "$REGISTRY_HOST" -u "$REGISTRY_USERNAME" --password-stdin
fi

APP_IMAGE_TAG="${APP_IMAGE_TAG:-main}" docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" pull drupal
APP_IMAGE_TAG="${APP_IMAGE_TAG:-main}" docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" up -d
