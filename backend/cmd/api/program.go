// Package api (program) defines functions to create and get Programs from DB.
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

type createProgramRequest struct {
	ProgramName        string   `json:"program_name" binding:"required"`
	ProgramDescription string   `json:"program_description" binding:"required"`
	Avatar             string   `json:"avatar_url" binding:"required"`
	MentorManagers     []string `json:"mentor_managers" binding:"required,min=1"`
	Mentors            []string `json:"mentors" binding:"required,min=1"`
	Criteria           []string `json:"criteria" binding:"required,min=1"`
}

func (server *Server) createProgram(ctx *gin.Context) {
	var req createProgramRequest

	if err := bindJSONWithValidation(ctx, ctx.ShouldBindJSON(&req), validator.New()); err != nil {
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to create program"))
		return
	}

	// check if mentor managers exist in the database and get their ids
	mentorManagerIDs := []primitive.ObjectID{}
	for _, mentorManager := range req.MentorManagers {
		user, err := server.store.GetUserByID(ctx, mentorManager)
		if err != nil || user.Role != "Mentor Manager (MM)" {
			ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get mentor manager"))
			return
		}

		mentorManagerIDs = append(mentorManagerIDs, user.ID)
	}

	// check if criteria exist in the database and get their ids
	criteriaIDs := []primitive.ObjectID{}
	for _, criteria := range req.Criteria {
		criteria, err := server.store.GetCriteria(ctx, criteria)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get criteria"))
			return
		}

		criteriaIDs = append(criteriaIDs, criteria.ID)
	}

	program := &models.Program{
		ProgramName:        req.ProgramName,
		ProgramDescription: req.ProgramDescription,
		Avatar:             req.Avatar,
		MentorManagers:     mentorManagerIDs,
		Mentors:            mentorManagerIDs,
		Criteria:           criteriaIDs,

		CreatedAt: time.Now(),
	}

	resp, err := server.store.CreateProgram(ctx, program)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to create program"))
		return
	}

	ctx.JSON(http.StatusCreated, envelop{"data": resp})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("program created")
}

// listPrograms returns a list of programs.
func (server *Server) listPrograms(ctx *gin.Context) {

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to list programs"))
		return
	}

	programs, err := server.store.ListPrograms(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to list programs"))
		return
	}
	// Todo: add mentor managers and mentors to the response
	ctx.JSON(http.StatusOK, envelop{"data": programs})

}

// getProgram returns a program by id.
func (server *Server) getProgram(ctx *gin.Context) {
	programID := ctx.Param("id")

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to get program"))
		return
	}

	program, err := server.store.GetProgram(ctx, programID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get program"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": program})
}

type updateProgramRequest struct {
	ProgramName        string   `json:"program_name" binding:"required"`
	ProgramDescription string   `json:"program_description" binding:"required"`
	Avatar             string   `json:"avatar_url" binding:"required"`
	MentorManagers     []string `json:"mentor_managers" binding:"required,min=1"`
	Mentors            []string `json:"mentors" binding:"required,min=1"`
	Criteria           []string `json:"criteria" binding:"required,min=1"`
}

// updateProgram updates an existing program document in the collection.
func (server *Server) updateProgram(ctx *gin.Context) {

	var req updateProgramRequest

	if err := bindJSONWithValidation(ctx, ctx.ShouldBindJSON(&req), validator.New()); err != nil {
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to update program"))
		return
	}

	// check if mentors exist in the database and get their ids
	mentorIDs := []primitive.ObjectID{}
	for _, mentor := range req.Mentors {
		user, err := server.store.GetUserByID(ctx, mentor)
		if err != nil || user.Role != "Mentor" {
			ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get mentor"))
			return
		}
		mentorIDs = append(mentorIDs, user.ID)
	}

	// check if mentor managers exist in the database and get their ids
	mentorManagerIDs := []primitive.ObjectID{}
	for _, mentorManager := range req.MentorManagers {
		user, err := server.store.GetUserByID(ctx, mentorManager)
		if err != nil || user.Role != "Mentor Manager (MM)" {
			ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get mentor manager"))
			return
		}

		mentorManagerIDs = append(mentorManagerIDs, user.ID)
	}

	// check if criteria exist in the database and get their ids
	criteriaIDs := []primitive.ObjectID{}
	for _, criteria := range req.Criteria {
		criteria, err := server.store.GetCriteria(ctx, criteria)
		if err != nil {
			ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get criteria"))
			return
		}

		criteriaIDs = append(criteriaIDs, criteria.ID)
	}

	programID := ctx.Param("id")

	program, err := server.store.GetProgram(ctx, programID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get program"))
		return
	}

	program.ProgramName = req.ProgramName
	program.ProgramDescription = req.ProgramDescription
	program.MentorManagers = mentorManagerIDs
	program.Mentors = mentorIDs
	program.Criteria = criteriaIDs

	program.Avatar = req.Avatar

	resp, err := server.store.UpdateProgram(ctx, programID, program)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to update program"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": resp})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("program updated")
}

// deleteProgram deletes a program by id.
func (server *Server) deleteProgram(ctx *gin.Context) {
	programID := ctx.Param("id")

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)
	if authPayload.UserRole != "Admin" {
		ctx.JSON(http.StatusUnauthorized, errorResponse("not authorised to delete program"))
		return
	}

	program, err := server.store.GetProgram(ctx, programID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to get program"))
		return
	}

	_, err = server.store.DeleteProgram(ctx, programID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse("failed to delete program"))
		return
	}

	ctx.JSON(http.StatusOK, envelop{"data": program})
	log.Info().
		Str("user_id", authPayload.UserID).
		Str("ip_address", ctx.ClientIP()).
		Str("user_agent", ctx.Request.UserAgent()).
		Str("request_method", ctx.Request.Method).
		Str("request_path", ctx.Request.URL.Path).
		Msg("program deleted")
}
