package models

import (
	"gorm.io/gorm"
)

type Post struct {
	ID        uint   `gorm:"primaryKey"`
	Title     string `gorm:"size:200" validate:"required,min=20"`
	Content   string `gorm:"type:text" validate:"required,min=200"`
	Category  string `gorm:"size:100" validate:"required,min=3"`
	Status    string `gorm:"size:100" validate:"required,oneof=publish draft trash"`
}

func Migrate(db *gorm.DB) {
	db.AutoMigrate(&Post{})
}
