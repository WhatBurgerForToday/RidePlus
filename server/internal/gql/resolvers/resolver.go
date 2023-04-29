package resolvers

import "github.com/WhatBurgerForToday/server/internal/gql/models"

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	UsersList []*models.User
}
