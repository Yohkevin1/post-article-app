package handlers

import (
	"net/http"
	"post-article-app/models"
	"post-article-app/database"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func validatePost(post models.Post) map[string]string {
	err := validate.Struct(post)
	if err != nil {
		errors := make(map[string]string)
		for _, err := range err.(validator.ValidationErrors) {
			switch err.Field() {
			case "Title":
				errors["title"] = "Title is required and must be at least 20 characters long"
			case "Content":
				errors["content"] = "Content is required and must be at least 200 characters long"
			case "Category":
				errors["category"] = "Category is required and must be at least 3 characters long"
			case "Status":
				errors["status"] = "Status is required and must be one of: 'publish', 'draft', or 'trash'"
			}
		}
		return errors
	}
	return nil
}

func CreatePost(c *gin.Context) {
	var post models.Post
	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if validationErrors := validatePost(post); validationErrors != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}
	database.DB.Create(&post)
	c.JSON(http.StatusCreated, post)
}

func GetPosts(c *gin.Context) {
	var posts []models.Post
	database.DB.Find(&posts)
	c.JSON(http.StatusOK, posts)
}

func GetPostByID(c *gin.Context) {
	var post models.Post
	id := c.Param("id")
	if err := database.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}
	c.JSON(http.StatusOK, post)
}

func UpdatePost(c *gin.Context) {
	var post models.Post
	id := c.Param("id")
	if err := database.DB.First(&post, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Post not found"})
		return
	}
	if err := c.BindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validasi JSON
	if validationErrors := validatePost(post); validationErrors != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errors": validationErrors})
		return
	}
	database.DB.Save(&post)
	c.JSON(http.StatusOK, post)
}

func DeletePost(c *gin.Context) {
	var post models.Post
	id := c.Param("id")
	database.DB.Delete(&post, id)
	c.JSON(http.StatusOK, gin.H{"message": "Post deleted"})
}
