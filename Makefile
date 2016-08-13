service := api

# Builds, (re)creates, starts, and attaches to containers for a service
start:
	@docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d
	@docker-compose ps

start\:production:
	@docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
	@docker-compose ps


# Stops running containers without removing them
stop:
	@docker-compose stop

# Restarts service
restart:
	@docker-compose restart ${service}

# Removes stopped service containers
clean:
	@docker-compose rm --force

# Stops running containers with removing, removes service image
kill:
	@docker-compose stop
	@docker-compose rm --force
	@docker rmi -f zephyr_api

# Pulls latest service images.  (Note: docker-compose pull does not work
# on private repositories in Windows, hence the Perl work around that calls
# docker pull for each image referenced in docker-compose.yml.)
pull:
	@perl -ne '{ if (s/\bimage\b: (.*)/docker pull $$1/) { \
								 print "$$_\n"; \
								 system($$_); \
								 print "\n" } }' docker-compose.yml

# Lists containers and their statuses
status:
	@docker-compose ps

# Displays log output from services. Default is main service
logs:
	@docker-compose logs ${service}

# Runs integration tests on service
test:
	@docker-compose build
	@docker-compose run --rm -e NODE_ENV=test MONGO_URL=mongodb://db/zephyr-test api npm run test:integration

.PHONY: start stop restart clean kill status cli logs