package main

import (
	// "post-article-app/models"
	"github.com/gin-gonic/gin"
	"post-article-app/routes"
	"post-article-app/database"
)

func main() {
	router := gin.Default()
	database.ConnectDatabase()
	routes.SetupRoutes(router)
	router.Run(":8080")
}
