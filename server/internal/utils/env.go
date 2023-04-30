package utils

import (
	"fmt"
	"os"
	"reflect"
	"strconv"

	"github.com/joho/godotenv"
)

func init() {
	_ = godotenv.Load()
}

// Loads environment variables into struct T.
// Panics if a variable is not set or if a conversion error occurs.
func LoadEnv[T any]() T {
	env := new(T)
	elem := reflect.TypeOf(env).Elem()
	errors := []error{}

	for i := 0; i < elem.NumField(); i++ {
		field := elem.Field(i)
		key := field.Tag.Get("env")
		if key == "" {
			continue
		}

		valueField := reflect.ValueOf(env).Elem().Field(i)
		defaultValue, isSet := field.Tag.Lookup("default")
		value, err := getOrDefault(key, defaultValue, isSet)
		if err != nil {
			errors = append(errors, err)
			continue
		}

		v, err := convert(*value, valueField.Type())
		if err != nil {
			errors = append(errors, err)
			continue
		}
		valueField.Set(reflect.ValueOf(v).Convert(valueField.Type()))
	}

	if len(errors) > 0 {
		fmt.Println("Errors while loading environment variables:")
		for _, err := range errors {
			fmt.Printf("❌ %+v\n", err)
		}
		os.Exit(1)
	}

	return *env
}

func getOrDefault(k string, defaultValue string, isDefaultValueSet bool) (*string, error) {
	v, isSet := os.LookupEnv(k)
	if isSet {
		return &v, nil
	}
	if isDefaultValueSet {
		os.Setenv(k, defaultValue)
		return &defaultValue, nil
	}
	return nil, fmt.Errorf("Environment variable '%s' is not set", k)
}

func convert(s string, t reflect.Type) (interface{}, error) {
	switch t.Kind() {
	case reflect.String:
		return s, nil
	case reflect.Bool:
		v, err := strconv.ParseBool(s)
		if err != nil {
			return nil, err
		}
		return v, nil
	case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
		v, err := strconv.Atoi(s)
		if err != nil {
			return nil, err
		}
		return v, nil
	case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
		v, err := strconv.ParseUint(s, 10, 0)
		if err != nil {
			return nil, err
		}
		return v, nil
	case reflect.Float32:
		v, err := strconv.ParseFloat(s, 32)
		if err != nil {
			return nil, err
		}
		return v, nil
	case reflect.Float64:
		v, err := strconv.ParseFloat(s, 64)
		if err != nil {
			return nil, err
		}
		return v, nil
	default:
		return nil, fmt.Errorf("Unsupported type %s", t)
	}
}
