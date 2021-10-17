# import necessary packages
 
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
 
#  Creo una instancia del objeto mensaje
msg = MIMEMultipart()
 
 #Mensaje
message = "Test invernadero"
 
 
#Parametros para el envio de mensajes
password = "gdi092021"
msg['From'] = "gdinverna092021@gmail.com"
msg['To'] = "victorl_222@hotmail.com"
msg['Subject'] = "Test"
 
msg.attach(MIMEText(message, 'plain'))

#Creo el servidor
server = smtplib.SMTP('smtp.gmail.com: 587')
 
server.starttls()
 
#Login con las credenciales
server.login(msg['From'], password)
 
 #Envio el mail por medio del servidor
server.sendmail(msg['From'], msg['To'], msg.as_string())

#Salgo
server.quit()
# Imprimo un mensaje de enviado
print ("Mensaje enviado a : %s:" % (msg['To']))