from flask import Flask, request, send_from_directory
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

@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = check_user(email, password)

        if user:
            return "Login Success 💃 Welcome to Vastraa Fashion"
        else:
            return "Invalid Email or Password ❌"

    return send_from_directory(os.getcwd(), "signin.html")


@app.route("/users")
def show_users():
    import sqlite3
    conn = sqlite3.connect("vastraa.db")
    cursor = conn.cursor()

    cursor.execute("SELECT id, email FROM users")
    users = cursor.fetchall()

    conn.close()
    return render_template("users.html", users=users)


from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def signin():
    return render_template("signin.html")

if __name__ == "__main__":
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)
