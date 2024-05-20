package mysql

import (
	"database/sql"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db"
)

type MySQLClient struct {
	// db *sql.DB
	orm int
}

func NewMySQLClient(db *sql.DB) db.Store {
	return &MySQLClient { db }
}


