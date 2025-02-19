package routes

import (
	"github.com/gin-gonic/gin"
	"post-article-app/handlers"
	"github.com/gin-contrib/cors"
)

func SetupRoutes(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://127.0.0.1:5500"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	}))

	router.POST("/article", handlers.CreatePost)
	router.GET("/article", handlers.GetPosts)
	router.GET("/article/:id", handlers.GetPostByID)
	router.PUT("/article/:id", handlers.UpdatePost)
	router.DELETE("/article/:id", handlers.DeletePost)
}
