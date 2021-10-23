#include <ArduinoJson.h>
#include <Ethernet.h>
#include <SPI.h>

//
#include "DHT.h"
#define DHTPIN 8
#define DHTTYPE DHT11
DHT dht(DHTPIN, DHTTYPE);
//

long id_modulo = 0;
long id_configuracion = 0;
float valor_objetivo = 0.0;
String accion = "";
String tipo = "";
float lectura = 0.0;



//
const String id = "1370027";
//
void setup() {
  // Initialize Serial port
  Serial.begin(9600);
  while (!Serial) continue;
  //
  dht.begin();

  // Initialize Ethernet library
  byte mac[] = {0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
  if (!Ethernet.begin(mac)) {
    Serial.println(F("Failed to configure Ethernet"));
    return;
  }
  delay(1000);


}
void clienteHTTP() {
  Serial.println(F("Connecting..."));

  // Connect to HTTP server
  EthernetClient client;
  client.setTimeout(20000);
  if (!client.connect("192.168.1.5", 80)) {
    Serial.println(F("Connection failed"));
    return;
  }

  Serial.println(F("Connected!"));
  //
  lectura = dht.readTemperature();
  //
  String content = "id_modulo=" + id + "&lectura=" + String(lectura);
  // Send HTTP request
  client.println("POST /inverna/php/actualizo-lectura-modulo.php HTTP/1.1");
  client.println("Host: 192.168.1.5");
  client.println("User-Agent: Arduino/1.0");

  client.println("Content-Type: application/x-www-form-urlencoded");
  client.print("Content-Length: ");
  client.println(content.length());
  client.println();
  client.println(content);
  client.println(F("Connection: close"));
  if (client.println() == 0) {
    Serial.println(F("Failed to send request"));
    client.stop();
    return;
  }

  // Check HTTP status
  char status[32] = {0};
  client.readBytesUntil('\r', status, sizeof(status));
  // It should be "HTTP/1.0 200 OK" or "HTTP/1.1 200 OK"
  if (strcmp(status + 9, "200 OK") != 0) {
    Serial.print(F("Unexpected response: "));
    Serial.println(status);
    client.stop();
    return;
  }

  // Skip HTTP headers
  char endOfHeaders[] = "\r\n\r\n";
  if (!client.find(endOfHeaders)) {
    Serial.println(F("Invalid response"));
    client.stop();
    return;
  }
  const size_t capacity = JSON_OBJECT_SIZE(3) + JSON_ARRAY_SIZE(2) + 120;
  DynamicJsonDocument doc(capacity);
  // Parse JSON object
  DeserializationError error = deserializeJson(doc, client);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    client.stop();
    return;
  }

  long id_configuracion = doc["id_configuracion"];
  long id_modulo = doc["id_modulo"];
  float valor_objetivo = doc["valor_objetivo"];
  String accion = doc["accion"];
  String tipo = doc["tipo"];
  float lectura = doc["lectura"];



  // Extract values
  Serial.println(F("Response:"));
  Serial.println(id_configuracion);
  Serial.println(id_modulo);
  Serial.println(valor_objetivo);
  Serial.println(accion);
  Serial.println(tipo);
  Serial.println(lectura);

  
  if (valor_objetivo < lectura) {
   digitalWrite(7, LOW);
    if (accion == "ON") {
      Serial.println("2");
      digitalWrite(6, HIGH);
    } else {
      Serial.println("4");
      digitalWrite(6, LOW);
    }
  } else{
       digitalWrite(6, LOW);
          digitalWrite(7, HIGH);
  }

  // Disconnect
  client.stop();

}
void loop() {
  clienteHTTP();
  delay(5000);
}
