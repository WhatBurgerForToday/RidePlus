AIR := $(shell go env GOPATH)/bin/air

.PHONY: tidy run dev lint gqlgen

tidy:
	go mod tidy

run:
	go run cmd/server/main.go

dev:
	@docker run -it --rm -v $(PWD):/app -w /app -e air_wd=/app -p 8080:8080 cosmtrek/air:v1.43.0 -c /app/.air.toml

lint:
	@docker run -it --rm -v $(PWD):/app -w /app golangci/golangci-lint:v1.52.2-alpine golangci-lint run -v 

gqlgen:
	@echo "Generating graphql files..."
	@rm -vf internal/gql/generated.go \
		internal/gql/models/generated.go \
		internal/gql/resolvers/generated.go
	go run github.com/99designs/gqlgen generate
	@echo "Done"