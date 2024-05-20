package mysql

import (
	"context"
)

func (store *MySQLClient) CreateUserCart(ctx context.Context, userID int) (models.Cart, error) {}