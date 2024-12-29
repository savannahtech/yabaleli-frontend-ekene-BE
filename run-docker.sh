#!/bin/bash

# Function to handle errors
handle_error() {
    echo "Error: $1"
    exit 1
}

# Determine environment
ENV=${NODE_ENV:-development}
echo "Starting in $ENV environment..."

# Choose the appropriate docker-compose files based on environment
if [ "$ENV" = "development" ]; then
    docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build "$@" 
elif [ "$ENV" = "production" ]; then
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build "$@"
else
    handle_error "Invalid environment: $ENV"
fi