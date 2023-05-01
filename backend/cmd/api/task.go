// Package api (discussion) includes endpoints for the discussion forum.
package api

import (
	"net/http"
	"time"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/internal/token"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type createTaskRequest struct {
	Title           string             `json:"title" binding:"required"`
	Details         string             `json:"details" binding:"required"`
	MentorManagerID primitive.ObjectID `bson:"mentor_manager_id,omitempty" json:"mentor_manager_id,omitempty"`
	MentorID        primitive.ObjectID `bson:"mentor_id,omitempty" json:"mentor_id,omitempty"`
}

func (server *Server) createTask(ctx *gin.Context) {
	var req createTaskRequest
	if err := bindJSONWithValidation(ctx, ctx.ShouldBindJSON(&req), validator.New()); err != nil {
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	userID, err := primitive.ObjectIDFromHex(authPayload.UserID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to parse user's ID"))
		return
	}

	arg := &models.Task{
		Title:           req.Title,
		Details:         req.Details,
		MentorManagerID: userID,
		MentorID:        userID,
		CreatedAt:       time.Now(),
	}

	discussion, err := server.store.CreateTask(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to create task"))
		return
	}

	ctx.JSON(http.StatusCreated, envelop{"data": discussion})
	log.Info().
		Str("task_id", discussion.ID.String()).
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("Task created")
}
