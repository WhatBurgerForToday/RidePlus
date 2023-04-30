package server

import (
	"fmt"
	"log"
	"strings"

	"github.com/WhatBurgerForToday/server/internal/handlers"
	"github.com/WhatBurgerForToday/server/internal/utils"
	"github.com/gin-gonic/gin"
)

type Env struct {
	Host                string `env:"GQL_SERVER_HOST" default:"localhost"`
	Port                uint16 `env:"GQL_SERVER_PORT" default:"8080"`
	IsPlaygroundEnabled bool   `env:"GQL_SERVER_PLAYGROUND_ENABLED" default:"true"`

	Environment string `env:"GIN_MODE" default:"debug"`
}

// Run starts the server, and blocks until the server is shut down.
// If in debug mode, it will try to find a free port if the default port is already in use.
func Run() {
	env := utils.LoadEnv[Env]()

	r := gin.Default()

	r.GET("/ping", handlers.Ping)
	r.POST("/graphql", handlers.GraphqlHandler())
	if env.IsPlaygroundEnabled {
		r.GET("/playground", handlers.PlaygroundHandler("/graphql"))
	}

	if env.Environment == "release" {
		log.Panicln(r.Run(fmt.Sprintf("%s:%d", env.Host, env.Port)))
	}

	debugRun(r, env)
}

func debugRun(r *gin.Engine, env Env) {
	addr := fmt.Sprintf("%s:%d", env.Host, env.Port)

	for {
		err := r.Run(addr)
		if err == nil {
			break
		}

		if !strings.Contains(err.Error(), "bind: address already in use") {
			log.Panicln(err)
		}

		log.Printf("Port %d is already in use, trying %d", env.Port, env.Port+1)
		env.Port++
		addr = fmt.Sprintf("%s:%d", env.Host, env.Port)
	}
}
