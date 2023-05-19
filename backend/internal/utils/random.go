// Package utils (random) defines general utilities for codebase.
package utils

import (
	"fmt"
	"math/rand"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

const alphabets = "abcdefghijklmnopqrstuvwxyz"

// User role
const (
	SUPERADMIN = "SuperAdmin"
	ADMIN      = "Admin"
	MENTOR     = "Mentor"
	MENTEE     = "Mentee"
)

func init() {
	rand.New(rand.NewSource(time.Now().UnixNano()))
}

// RandomInt generates random integer between min and max.
func RandomInt(min, max int64) int64 {
	return min + rand.Int63n(max-min+1)
}

// RandomString generates a random string of length n.
func RandomString(n int) string {
	var sb strings.Builder
	k := len(alphabets)

	for i := 0; i < n; i++ {
		c := alphabets[rand.Intn(k)]
		sb.WriteByte(c)
	}

	return sb.String()
}

// RandomUserID generates a random user name.
func RandomUserID() primitive.ObjectID {
	return primitive.NewObjectID()
}

// UserRole returns a role if found.
func UserRole(role string) string {
	roles := []string{ADMIN, MENTOR, MENTEE}
	for _, r := range roles {
		if role == r {
			return role
		}
	}
	return roles[0]
}

// RandomEmail generates a random email.
func RandomEmail() string {
	return fmt.Sprintf("%s@gmail.com", RandomString(6))
}

// Extract retrieve a substring of the PASETO token string value.
func Extract(s string) string {
	start := "v2.local."
	end := ".bnVsbA"
	startIndex := strings.Index(s, start)
	endIndex := strings.Index(s, end)

	if startIndex == -1 || endIndex == -1 {
		return ""
	}

	startIndex += len(start)
	return s[startIndex:endIndex]
}

// Concat concatenates the substring of the PASETO token string value.
func Concat(s string) string {
	return fmt.Sprintf("v2.local.%s.bnVsbA", s)
}
