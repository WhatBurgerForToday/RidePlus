package handlers

import "github.com/gin-gonic/gin"

// Ping is a simple handler to test if the server is runningxz
func Ping(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}
