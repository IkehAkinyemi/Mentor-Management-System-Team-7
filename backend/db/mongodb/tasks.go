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

// ListTasks retrieves a list  all tasks
func (mc *MongoClient) ListTasks(ctx context.Context) ([]*models.Task, error) {
	var tasks []*models.Task
	cursor, err := mc.client.Database(DBName).Collection(TasksCollection).Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	if err = cursor.All(ctx, &tasks); err != nil {
		return nil, err

	}
	return tasks, nil

}

// UpdateTask updates an existing task document in the collection.
func (mc *MongoClient) UpdateTask(ctx context.Context, taskID string, data *models.Task) (*models.Task, error) {
	objectID, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		return nil, err
	}
	result, err := mc.client.Database(DBName).Collection(TasksCollection).UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": data})
	if err != nil {
		return nil, err
	}
	if result.MatchedCount == 0 {
		return nil, db.ErrRecordNotFound
	}
	return mc.GetTask(ctx, taskID)
}

// DeleteTask deletes a task document from the collection.
func (mc *MongoClient) DeleteTask(ctx context.Context, taskID string) (*mongo.DeleteResult, error) {
	objectID, err := primitive.ObjectIDFromHex(taskID)
	if err != nil {
		return nil, err
	}
	return mc.client.Database(DBName).Collection(TasksCollection).DeleteOne(ctx, bson.M{"_id": objectID})
}























    

     





   

	 

