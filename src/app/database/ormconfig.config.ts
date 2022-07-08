export default {
   "type": process.env.DB_DRIVER || "mysql",
   "host": process.env.DB_HOST || "localhost",
   "port": process.env.DB_PORT || "3306",
   "username": process.env.DB_USERNAME || "root",
   "password": process.env.DB_PASSWORD || "",
   "database": process.env.DB_NAME || "xpay",
   "synchronize": process.env.DB_SYNCHRONIZE || true,
   "logging": process.env.LOG || true,
   "entities": [
      "src/app/database/entity/**/*.ts"
   ],
   "migrations": [
      "src/app/database/migration/**/*.ts"
   ],
   "subscribers": [
      "src/app/database/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/app/database/entity",
      "migrationsDir": "src/app/database/src/migration",
      "subscribersDir": "src/app/database/src/subscriber"
   }
}