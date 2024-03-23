CREATE TABLE IF NOT EXISTS "Place" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"address" json NOT NULL,
	"hoursOfWork" json NOT NULL,
	"seats" json,
	"gallery" json,
	"tags" json
);
