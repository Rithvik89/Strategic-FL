package KVStore

type KVStore interface {
	Get(key string) (string, error)
	Set(key string, value interface{}) error
	Delete(key string) error
	LPush(key string, values ...interface{}) error
	RPush(key string, values ...interface{}) error
	LPop(key string) (string, error)
	RPop(key string) (string, error)
	LLen(key string) (int64, error)
	LIndex(key string, index int64) (string, error)
}
