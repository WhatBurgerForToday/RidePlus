package utils

import (
	"log"
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
	num_fields := elem.NumField()

	for i := 0; i < num_fields; i++ {
		field := elem.Field(i)
		key := field.Tag.Get("env")
		if key == "" {
			continue
		}

		valueField := reflect.ValueOf(env).Elem().Field(i)
		value := mustGet(key)

		switch field.Type.Kind() {
		case reflect.String:
			valueField.SetString(value)
		case reflect.Bool:
			v, err := strconv.ParseBool(value)
			panicOnConversionError(key, err)
			valueField.SetBool(v)
		case reflect.Int, reflect.Int8, reflect.Int16, reflect.Int32, reflect.Int64:
			v, err := strconv.Atoi(value)
			panicOnConversionError(key, err)
			valueField.SetInt(int64(v))
		case reflect.Uint, reflect.Uint8, reflect.Uint16, reflect.Uint32, reflect.Uint64:
			v, err := strconv.ParseUint(value, 10, 64)
			panicOnConversionError(key, err)
			valueField.SetUint(v)
		case reflect.Float32:
			v, err := strconv.ParseFloat(value, 32)
			panicOnConversionError(key, err)
			valueField.SetFloat(v)
		case reflect.Float64:
			v, err := strconv.ParseFloat(value, 64)
			panicOnConversionError(key, err)
			valueField.SetFloat(v)
		default:
			log.Panicf("Unsupported type for %s: %s", key, field.Type)
		}
	}

	return *env
}

func mustGet(k string) string {
	v, isSet := os.LookupEnv(k)
	if !isSet {
		log.Panicf("Environment variable '%s' is not set", k)
	}
	return v
}

func panicOnConversionError(k string, err error) {
	if err != nil {
		log.Panicf("Error parsing value for %s: %s", k, err.Error())
	}
}
