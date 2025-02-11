import mysql.connector
import random
import itertools as it
import numpy as npy

mycon = mysql.connector.connect(host="localhost", user="root", password="root", database="ttscheduler")
if mycon.is_connected():
    print("Server connected")
mycur = mycon.cursor()

# Define subjects and their types
subjects = {
    "English": {"credit": 3, "is_lab": False},
    "Maths": {"credit": 4, "is_lab": False},
    "PPS": {"credit": 2, "is_lab": False},
    "BIO": {"credit": 3, "is_lab": True},  # Example lab subject
    "Chemistry": {"credit": 4, "is_lab": False},
    "Physics": {"credit": 4, "is_lab": True},  # Example lab subject
    "AI": {"credit": 3, "is_lab": False},
    "Project": {"credit": 4, "is_lab": True},  # Joint Course example
}

# Helper function to get available slots
def get_available_slots():
    return [f"Period{i}" for i in range(1, 9)]

# Function to assign periods based on constraints
def timetable():
    mycur.execute("CREATE TABLE IF NOT EXISTS datas(Period1 varchar(20), Period2 varchar(20), Period3 varchar(20), "
                  "Period4 varchar(20), Period5 varchar(20), Period6 varchar(20), Period7 varchar(20), Period8 varchar(20))")

    # Assign 8 periods each day
    days = int(input("Enter the number of days: "))
    available_slots = get_available_slots()

    schedules = []

    for i in range(days):
        day_schedule = {slot: None for slot in available_slots}

        # Shuffle subjects for random assignment
        random.shuffle(list(subjects.keys()))

        # Assign subjects
        for subject, details in subjects.items():
            if details["is_lab"]:
                if details["credit"] == 4:
                    # Assign 2 continuous lab periods once per week
                    lab_slot = available_slots.pop(random.choice([3, 6]))  # Either after snack or lunch break
                    day_schedule[lab_slot] = f"{subject} Lab"
                    day_schedule[available_slots[available_slots.index(lab_slot) + 1]] = f"{subject} Lab"
                else:
                    # Single period assignments
                    for period in available_slots:
                        if day_schedule[period] is None:
                            day_schedule[period] = subject
                            break
            else:
                # Non-lab subjects
                for period in available_slots:
                    if day_schedule[period] is None:
                        day_schedule[period] = subject
                        break

        schedules.append(day_schedule)

    # Insert timetable into MySQL
    for schedule in schedules:
        mycur.execute("INSERT INTO datas (Period1, Period2, Period3, Period4, Period5, Period6, Period7, Period8) "
                      "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", 
                      (schedule["Period1"], schedule["Period2"], schedule["Period3"], schedule["Period4"], 
                       schedule["Period5"], schedule["Period6"], schedule["Period7"], schedule["Period8"]))
    
    display()

# Display function to show timetable
def display():
    print("Here is your timetable:")
    mycur.execute("SELECT * FROM datas")
    week = mycur.fetchall()
    for day in week:
        print(day)
    
    h = input("Do you prefer another timetable? [Yes/No] ")
    if h.lower() == "yes":
        mycur.execute("DROP TABLE datas")
        timetable()
    else:
        print("Thank you!")



# Login display function
def logindis():
    mycur.execute("CREATE TABLE IF NOT EXISTS login (sname VARCHAR(30), password VARCHAR(20))")
    d = input("Do you have an account? [Yes/No] ")
    if d.lower() == "yes":
        sname = input("Enter your name: ")
        passwd = input("Enter your password: ")
        mycur.execute("SELECT * FROM login")
        r = mycur.fetchall()
        for row in r:
            if row[0] == sname and row[1] == passwd:
                print("Successfully logged in")
                timetable()
                break
        else:
            print("Invalid username or password")
            logindis()
    else:
        sname = input("Please enter your username: ")
        passwd = input("Enter your security password (maximum 20 characters): ")
        verify = input("Please enter your password again for verification: ")
        if verify == passwd:
            mycur.execute("INSERT INTO login VALUES (%s, %s)", (sname, passwd))
            print("Account successfully created!")
            logindis()
        else:
            print("Password is incorrect")
            logindis()

logindis()