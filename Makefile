docker-build:	
	docker-compose up -d --build
	
docker-clean:
	docker system prune -af --volumes