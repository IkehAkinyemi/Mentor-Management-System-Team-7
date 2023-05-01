package mongodb

import (
	"context"
	"testing"
	"time"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func createTestTask(t *testing.T) *models.Task {
	// test object
	// {
	// 	"title": "Task title",
	// 	"details": "Task details",
	// 	"mentor_managers": ["644b99e39b4964f5c55c7d59"],
	// 	"mentors": ["644b9a018a46b3d3ec2d1f43"]
	// }

	mentorManagerID, _ := primitive.ObjectIDFromHex("644b99e39b4964f5c55c7d59")
	mentorID, _ := primitive.ObjectIDFromHex("644b9a018a46b3d3ec2d1f43")

	task := &models.Task{
		Title:          "Test Task",
		Details:        "Test Details",
		MentorManagers: []primitive.ObjectID{mentorManagerID},
		Mentors:        []primitive.ObjectID{mentorID},
		CreatedAt:      time.Now(),
	}

	_, err := testStore.CreateTask(context.Background(), task)

	require.NoError(t, err)
	require.NotEmpty(t, task)

	return task
}

func TestCreateTask(t *testing.T) {
	createTestTask(t)
}
