import sqlite3

conn = sqlite3.connect("vastraa.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
)
""")

# demo user
cursor.execute("""
INSERT OR IGNORE INTO users (email, password)
VALUES ('admin@vastraa.com', '12345')
""")

conn.commit()
conn.close()

print("Vastraa database created successfully")
