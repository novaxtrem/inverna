import serial
serialPort = serial.Serial ('com3',9600)
while True:    
    print (serialPort.readline()) 
    if serialPort.readline() == "b'43\r\n'":
        print("b is greater than a")


