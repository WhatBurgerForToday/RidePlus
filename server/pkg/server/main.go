package server

import (
	"fmt"
	"log"

	"github.com/WhatBurgerForToday/server/internal/handlers"
	"github.com/WhatBurgerForToday/server/internal/utils"
	"github.com/gin-gonic/gin"
)

type Env struct {
	Host                string `env:"GQL_SERVER_HOST"`
	Port                uint16 `env:"GQL_SERVER_PORT"`
	GqlPath             string `env:"GQL_SERVER_PATH"`
	GqlPlaygroundPath   string `env:"GQL_SERVER_PLAYGROUND_PATH"`
	IsPlaygroundEnabled bool   `env:"GQL_SERVER_PLAYGROUND_ENABLED"`
}

func Run() {
	env := utils.LoadEnv[Env]()

	r := gin.Default()

	r.GET("/ping", handlers.Ping)
	r.POST(env.GqlPath, handlers.GraphqlHandler())
	if env.IsPlaygroundEnabled {
		r.GET(env.GqlPlaygroundPath, handlers.PlaygroundHandler(env.GqlPath))
	}

	log.Panicln(r.Run(fmt.Sprintf("%s:%d", env.Host, env.Port)))
}
