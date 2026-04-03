from flask import Flask, request, send_from_directory, render_template
import sqlite3
import os

app = Flask(__name__)

def check_user(email, password):
    conn = sqlite3.connect("vastraa.db")
    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email, password)
    )

    user = cursor.fetchone()
    conn.close()
    return user

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = check_user(email, password)

        if user:
            return "Login Success 💃 Welcome to Vastraa Fashion"
        else:
            return "Invalid Email or Password ❌"

    return render_template("signin.html")

@app.route("/users")
def show_users():
    conn = sqlite3.connect("vastraa.db")
    cursor = conn.cursor()

    cursor.execute("SELECT id, email FROM users")
    users = cursor.fetchall()

    conn.close()
    return render_template("users.html", users=users)

@app.route("/")
def index():
    return send_from_directory(os.getcwd(), "index.html")

@app.route("/<path:path>")
def serve_static_html(path):
    if path.endswith(".html"):
        return send_from_directory(os.getcwd(), path)
    return "File not found", 404

if __name__ == "__main__":
    app.run(debug=True)

