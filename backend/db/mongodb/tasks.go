// Package mongodb (tasks) includes db functions for the tasks.
package mongodb

import (
	"context"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db"
	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateTask adds a new task document to the collection.
func (mc *MongoClient) CreateTask(ctx context.Context, task *models.Task) (*models.Task, error) {
	result, err := mc.client.Database(DBName).Collection(TasksCollection).InsertOne(ctx, task)
	if err != nil {
		return nil, err
	}
	taskID := result.InsertedID.(primitive.ObjectID)
	return mc.GetTask(ctx, taskID.Hex())
}

// GetTask retrieves a task by its ID.
func (mc *MongoClient) GetTask(ctx context.Context, taskID string) (*models.Task, error) {
	objectID, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		return nil, err
	}
	var task models.Task
	err = mc.client.Database(DBName).Collection(TasksCollection).
		FindOne(ctx, bson.M{"_id": objectID}).
		Decode(&task)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, db.ErrRecordNotFound
		}
		return nil, err
	}
	return &task, nil
}
