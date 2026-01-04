# MongoDB Connection String Fix

## Issue
Your MongoDB connection string is missing the database name, which causes timeout errors.

## Current Connection String (in server/.env)
```
MONGODB_URI=mongodb+srv://db_user:KgNu6aK9b3HfEi48@dwarika.4cuq2sy.mongodb.net/?appName=dwarika
```

## Fixed Connection String
Update your `server/.env` file to:

```
MONGODB_URI=mongodb+srv://db_user:KgNu6aK9b3HfEi48@dwarika.4cuq2sy.mongodb.net/dwarika?appName=dwarika
```

**Key Change**: Add `/dwarika` before the `?` in the connection string.

## Steps to Fix

1. Open `server/.env` file
2. Find the line with `MONGODB_URI=`
3. Change:
   - FROM: `...mongodb.net/?appName=...`
   - TO: `...mongodb.net/dwarika?appName=...`
4. Save the file
5. Restart the backend server

## After Fixing

The server code will automatically handle this, but it's better to have the correct format in your .env file.

