// Package mongodb (criteria) includes db functions for the criteria.
package mongodb

import (
	"context"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db"
	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateCriteria adds a new criteria document to the collection.
func (mc *MongoClient) CreateCriteria(ctx context.Context, criteria *models.Criteria) (*models.Criteria, error) {
	result, err := mc.client.Database(DBName).Collection(CriteriaCollection).InsertOne(ctx, criteria)
	if err != nil {
		return nil, err
	}
	criteriaID := result.InsertedID.(primitive.ObjectID)

	return mc.GetCriteria(ctx, criteriaID.Hex())
}

// GetCriteria retrieves a criteria by its ID.
func (mc *MongoClient) GetCriteria(ctx context.Context, criteriaID string) (*models.Criteria, error) {
	objectID, err := primitive.ObjectIDFromHex(criteriaID)
	if err != nil {
		return nil, err
	}
	var criteria models.Criteria
	err = mc.client.Database(DBName).Collection(CriteriaCollection).
		FindOne(ctx, bson.M{"_id": objectID}).
		Decode(&criteria)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, db.ErrRecordNotFound
		}
		return nil, err
	}
	return &criteria, nil
}

// ListCriterias retrieves a list  all criteria
func (mc *MongoClient) ListCriterias(ctx context.Context) ([]*models.Criteria, error) {
	var criteria []*models.Criteria
	cursor, err := mc.client.Database(DBName).Collection(CriteriaCollection).Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}
	if err = cursor.All(ctx, &criteria); err != nil {
		return nil, err

	}
	return criteria, nil

}

// UpdateCriteria updates an existing criteria document in the collection.
func (mc *MongoClient) UpdateCriteria(ctx context.Context, criteriaID string, data *models.Criteria) (*models.Criteria, error) {
	objectID, err := primitive.ObjectIDFromHex(criteriaID)
	if err != nil {
		return nil, err
	}
	result, err := mc.client.Database(DBName).Collection(CriteriaCollection).UpdateOne(ctx, bson.M{"_id": objectID}, bson.M{"$set": data})
	if err != nil {
		return nil, err
	}
	if result.MatchedCount == 0 {
		return nil, db.ErrRecordNotFound
	}
	return mc.GetCriteria(ctx, criteriaID)
}

// DeleteCriteria deletes a criteria document from the collection.
func (mc *MongoClient) DeleteCriteria(ctx context.Context, criteriaID string) (*mongo.DeleteResult, error) {
	objectID, err := primitive.ObjectIDFromHex(criteriaID)
	if err != nil {
		return nil, err
	}
	return mc.client.Database(DBName).Collection(CriteriaCollection).DeleteOne(ctx, bson.M{"_id": objectID})
}



