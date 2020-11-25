## Einführung Backenddienst
REST

CRUD
Create
Read
Update
Delete

POST      /api/waterfill - CREATE
GET       /api/waterfill - READ ALL
GET       /api/waterfill/:id - READ ONE
PUT       /api/waterfill/:id UPDATE
DELETE    /api/waterfill/:id DELETE

GET /api/waterfill?timestamp=123456789

DTO - Data Transfer Objects

## Meine awesome todo Liste für Backenddienste
1. VS Code installieren
2. NodeJS LTS installieren
3. Typescript installieren 'npm i -g typescript'
4. NestCLI installieren 'npm i -g @nestjs/cli'
5. Docker installieren
6. MongoDB installeren (Docker)
7. Docker Hub registrieren 
8. `docker login`
9. `docker build -t kosren/waterfill-service:1.0.0`
10. `docker push kosren/waterfill-service:1.0.0`
11. `docker run -it -p 3000:3000 --name myService kosren/waterfill-service:1.0.0` (`-e TOKEN=123456`)

## Deploy
1. Prüft, ob ihr die gleichen Dependencies wie ich im Demo Service habt
2. Wartet auf Email von Seb
3. Sendet an Seb 
   1. Name eurer Docker Images (kosren/waterfill-service)
   2. Eventuelle Umgebungsvariablen
4. Secrets in GitHub, so wie in EMail beschrieben 
5. Änderungen von Dev auf Master mergen ... profit

Dienste:
waterfill (demo): https://waterfill.uniks.de/api
