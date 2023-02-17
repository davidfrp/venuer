![Screenshot 2023-02-17 at 21-57-25 Find an event - Venuer](https://user-images.githubusercontent.com/6499570/219791895-e753eb26-ca92-4d48-baa2-0fe4ac354b41.png)
_Forsiden af webstedet. Her ses at brugen allerede er logget ind som administrator og i stand til at kunne oprette nye events._

![Screenshot 2023-02-17 at 21-57-39 Find an event - Venuer](https://user-images.githubusercontent.com/6499570/219791898-2a064e23-e380-430e-8546-1da0462a053f.png)
_Der er adskillige valgmuligheder for at kunne afgrænse hvilke events man ønsker at få returneret. Tilmed også efter geo-placering, så man kun får returneret de events som ligger i nærheden af én._

![Screenshot 2023-02-17 at 21-59-35 Your account - Venuer](https://user-images.githubusercontent.com/6499570/219792174-5bc95170-5863-4025-852b-7abe187a75e0.png)
_Mulighed for kunne ændre indstillinger og detaljer vedrørende én selv._

![Screenshot 2023-02-17 at 21-49-11 Your account - Venuer](https://user-images.githubusercontent.com/6499570/219791910-35579b1b-d558-40db-87c5-a83a9a0600e9.png)
_Demonstration af brugen af websockets til at kunne sende beskeder frem og tilbage mellem brugere der er logget ind._

# Venuer

## Indholdsfortegnelse

- [Om projektet](#om-projektet)
- [Opsætning](#opsætning)
  - [Forudsætninger](#forudsætninger)
  - [Installation](#installation)
- [Kørsel](#kørsel)

## Om projektet

Mit Node.js eksamensprojekt, bygget i Svelte og express.js med TypeScript, og Mongoose for MongoDB.
Tailwind CSS bruges til at style frontenden.

## Opsætning

### Forudsætninger

- [Node.js](https://nodejs.org/en/) (v16.16.0 or above)

### Installation

1. Klon repoen.

```sh
git clone https://github.com/davidfrp/dr-interview.git
```

2. Installér NPM pakkerne i både client og server stierne.

```sh
cd client
npm i
cd ../server
npm i
cd ..
```

3. Start server og client separat, i hver deres terminal.

```sh
cd server
npm start
```

```sh
cd client
npm run dev
```

### Kørsel

For at se projektet, navigér til http://localhost:3000 i din webbrowser.

Oversigt over relavante porte og deres brug:

| Port | Beskrivelse |
| :--- | :---------- |
| 3000 | Frontend    |
| 4000 | Backend     |
