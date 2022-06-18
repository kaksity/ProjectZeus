export default {
   "type": process.env.DB_DRIVER || "mysql",
   "host": process.env.DB_HOST || "localhost",
   "port": process.env.DB_PORT || 3306,
   "username": process.env.DB_USERNAME || "kaksity",
   "password": process.env.DB_PASSWORD || "D@ud@p0n@2",
   "database": process.env.DB_NAME || "zeus",
   "synchronize": process.env.DB_SYNCHRONIZE || true,
   "logging": process.env.LOG || false,
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