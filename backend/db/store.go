// Package db (store) defines the Store interface that a datastore
// needs to implement/satisfy.
package db

import (
	"context"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"go.mongodb.org/mongo-driver/mongo"
)

// A Store provides all functions to execute db queries
// and transactions.
type Store interface {
	// CreateUser adds a new user document to the collection.
	CreateUser(ctx context.Context, user *models.User) (*models.User, error)

	// GetUserByID retrieves a user document from the collection by ID.
	GetUser(ctx context.Context, id string) (*models.User, error)

	// GetUserByEmail retrieves a user document from the collection by email.
	GetUserByEmail(ctx context.Context, email string) (*models.User, error)

	// GetUserBy ID retrieves a user document from the collection by ID.
	GetUserByID(ctx context.Context, id string) (*models.User, error)

	// UpdateUser updates a user document in the collection by ID.
	UpdateUser(ctx context.Context, userID string, updateData map[string]interface{}) (*models.User, error)

	// DeleteUser removes a user document from the collection by ID.
	DeleteUser(ctx context.Context, id string) (*mongo.DeleteResult, error)

	// CreateUserAction inserts a new record into the user_actions collection.
	CreateUserAction(ctx context.Context, userAction *models.UserAction) (*models.UserAction, error)

	// GetUserAction return a record by ID from the user_actions collection.
	GetUserAction(ctx context.Context, id string) (*models.UserAction, error)

	// UpdateUserAction updates and returns a record from the user_actions collection
	UpdateUserAction(ctx context.Context, id string, updateData map[string]interface{}) (*models.UserAction, error)

	// CreateFAQ inserts a new record into the faq collection.
	CreateFAQ(ctx context.Context, faq *models.Faq) (*models.Faq, error)

	// GetFAQ return a record by ID from the faq collection.
	GetFAQ(ctx context.Context, id string) (*models.Faq, error)

	// GetAllFAQs returns all records in faq collection.
	GetAllFAQs(ctx context.Context) ([]*models.Faq, error)

	// CreateDiscussion adds a new discussion document to the collection.
	CreateDiscussion(ctx context.Context, discussion *models.Discussion) (*models.Discussion, error)

	// GetDiscussion retrieves a discussion by its ID.
	GetDiscussion(ctx context.Context, discussionID string) (*models.Discussion, error)

	// ListDiscussions retrieves a list of discussions belonging to a particular owner with pagination.
	ListDiscussions(ctx context.Context, ownerID string, page int64, limit int64) ([]*models.Discussion, error)

	// UpdateDiscussion updates an existing discussion document in the collection.
	UpdateDiscussion(ctx context.Context, discussionID string, data map[string]interface{}) (*models.Discussion, error)

	// AddComment adds a new comment document to a discussion document in the collection.
	AddComment(ctx context.Context, discussionID string, comment *models.Comment) ([]models.Comment, error)

	// CreateTask adds a new task document to the collection.
	CreateTask(ctx context.Context, task *models.Task) (*models.Task, error)

	// GetTask retrieves a task by its ID.
	GetTask(ctx context.Context, taskID string) (*models.Task, error)

	// ListTasks retrieves a list of tasks
	ListTasks(ctx context.Context) ([]*models.Task, error)

	// UpdateTask updates an existing task document in the collection.
	UpdateTask(ctx context.Context, taskID string, data *models.Task) (*models.Task, error)

	//DeleteTask deletes a task document from the collection by ID.
	DeleteTask(ctx context.Context, taskID string) (*mongo.DeleteResult, error)

	// List all mentors
	ListMentors(ctx context.Context) ([]*models.User, error)

	// List all mentor managers
	ListMentorManagers(ctx context.Context) ([]*models.User, error)

	// CreateProgram adds a new program document to the collection.
	CreateProgram(ctx context.Context, program *models.Program) (*models.Program, error)

	// GetProgram retrieves a program by its ID.
	GetProgram(ctx context.Context, programID string) (*models.Program, error)

	// ListPrograms retrieves a list of programs
	ListPrograms(ctx context.Context) ([]*models.Program, error)

	// UpdateProgram updates an existing program document in the collection.
	UpdateProgram(ctx context.Context, programID string, data *models.Program) (*models.Program, error)

	// DeleteProgram deletes a program document from the collection by ID.
	DeleteProgram(ctx context.Context, programID string) (*mongo.DeleteResult, error)

	// CreateCriteria adds a new criteria document to the collection.
	CreateCriteria(ctx context.Context, criteria *models.Criteria) (*models.Criteria, error)

	// GetCriteria retrieves a criteria by its ID.
	GetCriteria(ctx context.Context, criteriaID string) (*models.Criteria, error)

	// ListCriterias retrieves a list of criterias
	ListCriterias(ctx context.Context) ([]*models.Criteria, error)

	// UpdateCriteria updates an existing criteria document in the collection.
	UpdateCriteria(ctx context.Context, criteriaID string, data *models.Criteria) (*models.Criteria, error)

	// DeleteCriteria deletes a criteria document from the collection by ID.
	DeleteCriteria(ctx context.Context, criteriaID string) (*mongo.DeleteResult, error)





	
}
