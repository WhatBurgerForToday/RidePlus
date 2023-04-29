package handlers

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/WhatBurgerForToday/server/internal/gql"
	"github.com/WhatBurgerForToday/server/internal/gql/models"
	"github.com/WhatBurgerForToday/server/internal/gql/resolvers"
	"github.com/gin-gonic/gin"
)

func GraphqlHandler() gin.HandlerFunc {
	resolver := &resolvers.Resolver{UsersList: make([]*models.User, 0)}
	h := handler.NewDefaultServer(gql.NewExecutableSchema(gql.Config{Resolvers: resolver}))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func PlaygroundHandler(gqlPath string) gin.HandlerFunc {
	h := playground.Handler("GraphQL playground", gqlPath)

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}
