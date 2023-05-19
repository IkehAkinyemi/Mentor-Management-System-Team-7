// Package mongodb (programs) includes db functions for the Programs.
package mongodb

import (
	"context"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db"
	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateProgram adds a new program document to the collection.
func (mc *MongoClient) CreateProgram(ctx context.Context, program *models.Program) (*models.Program, error) {
	result, err := mc.client.Database(DBName).Collection(ProgramsCollection).InsertOne(ctx, program)
	if err != nil {
		return nil, err
	}
	ProgramID := result.InsertedID.(primitive.ObjectID)
	return mc.GetProgram(ctx, ProgramID.Hex())
}

// GetProgram retrieves a program by its ID.
func (mc *MongoClient) GetProgram(ctx context.Context, ProgramID string) (*models.Program, error) {
	objectID, err := primitive.ObjectIDFromHex(ProgramID)
	if err != nil {
		return nil, err
	}
	var program models.Program
	err = mc.client.Database(DBName).Collection(ProgramsCollection).
		FindOne(ctx, bson.M{"_id": objectID}).
		Decode(&program)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, db.ErrRecordNotFound
		}
		return nil, err
	}
	return &program, nil
}

// ListPrograms retrieves a list  all programs
func (mc *MongoClient) ListPrograms(ctx context.Context) ([]*models.Program, error) {
	var programs []*models.Program
	cursor, err := mc.client.Database(DBName).Collection(ProgramsCollection).Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	if err = cursor.All(ctx, &programs); err != nil {
		return nil, err

	}
	return programs, nil

}


// UpdateProgram updates an existing program document in the collection.
func (mc *MongoClient) UpdateProgram(ctx context.Context, ProgramID string, data *models.Program) (*models.Program, error) {
	objectID, err := primitive.ObjectIDFromHex(ProgramID)
	if err != nil {
		return nil, err
	}
	filter := bson.M{"_id": objectID}
	update := bson.M{"$set": data}
	_, err = mc.client.Database(DBName).Collection(ProgramsCollection).UpdateOne(ctx, filter, update)
	if err != nil {
		return nil, err
	}
	return mc.GetProgram(ctx, ProgramID)
}

// DeleteProgram deletes a program document from the collection.
func (mc *MongoClient) DeleteProgram(ctx context.Context, programID string) (*mongo.DeleteResult, error) {
	objectID, err := primitive.ObjectIDFromHex(programID)
	if err != nil {
		return nil, err
	}
	return mc.client.Database(DBName).Collection(TasksCollection).DeleteOne(ctx, bson.M{"_id": objectID})
}
