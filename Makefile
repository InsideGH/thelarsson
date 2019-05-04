LOCAL_IP = $(shell ./scripts/local_ip.sh)
SHELL := /bin/bash

up:
	@LOCAL_IP=$(LOCAL_IP) docker-compose up -d

logs:
	@LOCAL_IP=$(LOCAL_IP) docker-compose logs -f

build:
	@LOCAL_IP=$(LOCAL_IP) docker-compose build

stop:
	@LOCAL_IP=$(LOCAL_IP) docker-compose stop

down:
	@LOCAL_IP=$(LOCAL_IP) docker-compose down -v

ps:
	@LOCAL_IP=$(LOCAL_IP) docker-compose ps

clean_proxy:
	@docker rmi -f thelarsson_proxy

restart_frontend:
	@LOCAL_IP=$(LOCAL_IP) docker-compose restart frontend
