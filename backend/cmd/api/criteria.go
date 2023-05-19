// Package api (task) defines functions to create and get Tasks from DB.
package api

import (
	"net/http"
	"time"

	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/db/models"
	"github.com/ALCOpenSource/Mentor-Management-System-Team-7/backend/internal/token"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/rs/zerolog/log"
)

type createCriteriaRequest struct {
	Questions []createQuestionRequest `json:"questions" binding:"required"`
}

type createQuestionRequest struct {
	Question string     `json:"question" binding:"required"`
	Answer   answerType `json:"answer" binding:"required"`
}

type answerType string


// createCriteria creates a criteria.
func (server *Server) createCriteria(ctx *gin.Context) {
	var req createCriteriaRequest

	if err := bindJSONWithValidation(ctx, ctx.ShouldBindJSON(&req), validator.New()); err != nil {
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to create criteria"))
		return
	}

	questions := []models.Question{}
	for _, question := range req.Questions {
		questions = append(questions, models.Question{
			Question: question.Question,
			Answer:   models.AnswerType(question.Answer),
		})
	}

	criteria := &models.Criteria{
		Questions: questions,

		CreatedAt: time.Now(),
	}

	resp, err := server.store.CreateCriteria(ctx, criteria)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to create criteria"))
		return
	}

	ctx.JSON(http.StatusCreated, envelop{"data": resp})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("criteria created")
}

// listCriteria returns a list of criteria.
func (server *Server) listCriteria(ctx *gin.Context) {
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	criteria, err := server.store.ListCriterias(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to list criteria"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": criteria})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("criteria listed")



}

// getCriteria returns a criteria by id.
func (server *Server) getCriteria(ctx *gin.Context) {
	criteriaID := ctx.Param("id")

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	criteria, err := server.store.GetCriteria(ctx, criteriaID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get criteria"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": criteria})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("criteria retrieved")


}

type updateCriteriaRequest struct {
	Questions []createQuestionRequest `json:"questions" binding:"required"`

}


// updateCriteria updates a criteria by id.
func (server *Server) updateCriteria(ctx *gin.Context) {

	var req updateCriteriaRequest

	if err := bindJSONWithValidation(ctx, ctx.ShouldBindJSON(&req), validator.New()); err != nil {
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to update task"))
		return
	}


	questions := []models.Question{}
	for _, question := range req.Questions {
		questions = append(questions, models.Question{
			Question: question.Question,
			Answer:   models.AnswerType(question.Answer),
		})
	}

	criteria := &models.Criteria{
		Questions: questions,
		CreatedAt: time.Now(),
	}

	criteriaID := ctx.Param("id")

	resp, err := server.store.UpdateCriteria(ctx, criteriaID, criteria)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to update criteria"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": resp})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("task updated")
}

// deleteCriteria deletes a criteria by id.
func (server *Server) deleteCriteria(ctx *gin.Context) {
	criteriaID := ctx.Param("id")

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to delete criteria"))
		return
	}

	_, err := server.store.DeleteCriteria(ctx, criteriaID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to delete criteria"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": "criteria deleted"})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("task deleted")
}
