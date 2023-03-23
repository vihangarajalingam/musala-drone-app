
# Project Title

An application to manage drones used to deliver medicine.

Features required:
* Registering a drone;
* Loading a drone with medication items;
* Checking loaded medication items for a given drone;
* Checking available drones for loading;
* Check drone battery level for a given drone;
* Prevent the drone from being loaded with more weight that it can carry;
* Prevent the drone from being in LOADING state if the battery level is below 25%;
* Introduce a periodic task to check drones battery levels and create history/audit event log for this;




## Authors

- [@Vihanga Rajalingam](https://github.com/vihangarajalingam)


## Deployment

Deploying this project requires docker.

Navigate to the project folder ```musala-drone-app```.

In a terminal run:
```bash
docker compose up
```
This should create the database inside docker.

In a seperate terminal run:
```
npm install
```
If you're running the application for the first time.

Then run:
```
npm start
```
This will start the application and populate the DB with dummy data, and expose port 8080 for the REST API services.
## API Reference

#### Create/Register a drone

```http
POST /api/drone/create HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
    "serialNumber": 100001,
    "model": "LIGHTWEIGHT",
    "weightLimit": 500,
    "batteryCapacity": 23.5,
    "state": "IDLE"
}
```

#### Load drone with medication items

```http
POST /api/drone/load HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
    "droneID": 5,
    "medications": ["JJMRY", "JJMRY", "JJMRY"]
}
```
#### Check loaded medication items for a given drone

```http
GET /api/drone/get-load?droneID=15 HTTP/1.1
Host: localhost:8080
```

#### Check available drones for loading

```http
GET /api/drone/get-idle-drones HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```

#### check drone battery level for a given drone

```http
GET /api/drone/battery-level?droneID=1 HTTP/1.1
Host: localhost:8080
Content-Type: application/json
```