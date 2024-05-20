package mysql

import (
	"context"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
)

func (store *MySQLClient) CreateUser(ctx context.Context, arg *models.User) (*models.User, error) {
	store.orm.findOne()
}