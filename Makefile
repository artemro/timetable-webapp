run:
	yarn serve

build-docker-local:
	docker build --build-arg BUILD_MODE=development --progress=plain -t calendar_ui:local .
