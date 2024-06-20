import requests
import csv
import time
import mysql.connector

# Conexión a la base de datos MySQL
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="api_db"
)

mycursor = mydb.cursor()

while True:
    # Query para obtener datos de la tabla usuarios
    mycursor.execute("SELECT * FROM users")
    data = mycursor.fetchall()  # Obtener todos los registros de la consulta

    with open('data.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        # Encabezados de las columnas
        writer.writerow(['id', 'name', 'email'])

        for row in data:
            writer.writerow(row)  # Escribir cada fila en el archivo CSV

    time.sleep(3600)  # Esperar una hora antes de la siguiente ejecución
