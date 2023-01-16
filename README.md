# birdnest

Assignment for Racktor summer trainee 23

The deployed version of the app can be found here: https://reaktorbirdnest.fly.dev/

## Setup on a local machine

1. Get the repocitory using git
```
git clone git@github.com:juhakaup/birdnest.git
```

2. Install backend in the server folder using npm
```
cd server
npm install
cd ..
```

3. Install frontend in the client forlder using npm
```
cd client
npm install
cd ..
```

## Running the server
After installing you can start the server by entering
```
cd server
npm start
```
To see that the server is running and functioning correctly go to 
http://localhost:8080/api/drones

After a while you should see some drone data displayed on the page.

Like this:
```
[
 {
  serialNumber: "SN-dz5hNECxx8",
  nestDistance: 84497.78005458736,
  positionX: "309209.3384280256",
  positionY: "186666.92890685852",
  captureTime: "2023-01-13T11:48:17.797Z"
  },
  {
  serialNumber: "SN-lJ_TQBSM9D",
  nestDistance: 27621.854339355305,
  positionX: "222067.08783102242",
  positionY: "318201.44353834254",
  captureTime: "2023-01-13T11:48:35.812Z"
  },
]
```
## Running the front-end
Start the frontend by going into client directory
and running the command:
```
npm start
```
The page displaying the front-end should open automatically in you web browser, if not you can locate it in the address: http://localhost:3000/
