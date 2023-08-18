# Swine house system PGR212 Exam (2023)
A pig farmer heard about your Greenhouse prototype (Obligatory Submission 1) and needs a similar system.
He has taken over the neighbouring farms and now has three times as many pigs as before. His problem is
that the three different farmhouses all have different systems and the needs to use 3 different App’s to check
the conditions for his pigs.

The client wants an App (web or mobile) that can show the state of all 3 pig sty’s and alert him of problems.
The requirements are:
- You must register and store Temperature, Humidity and Light from your ESP32 Edge device
- The client wants the solution to run on their own servers, so you must make a Node API to store the sensor
data
- They want a Dashboard written in React that shows a graph of the last 24 hours of sensor data
- Deliver a video showing the final solution, all required code and written documentation. The reviewer should
be able to replicate your solution.

You can build the Dashboard as either a web App or a mobile App written in Expo. If you are able to come up
reasons to use other sensors in the Edge device, please do so. If you think the Dashboard needs more than
just a graph, you are free to add features to the solution. Draw on your experience from the obligatory
submissions and lectures to get ideas for good additions.

## Solution
This react typescript project solves the frontend of the swine house system. The application gathers data from the backend server and handles both deployed and locally run API calls. It also subscribes to an MQTT broker in order to display real time data in the form of a dashboard. The historic data, gathered from the DB is displayed in line charts and tables with search functionality. This solution handles any new devices being registered both with responsive design and by seperating concerns. I have attempted to write maintainable code, by organizing the project to be changable with the use of pages, components, services, interfaces and contexts. After testing the solution with different microcontrollers, I observed new instances appearing on the screen without needing to change the code. The solution displays data readings from temperature, humidity, light, accelometer and hall sensor.

### Components
- Libraries used for implementation
- Dashboard
- Statistics
- History

### Usage
- Follow the steps for configurations.
- Open a web browser and navigate to http://localhost:3000 to view the dashboard. Note! It is important to run on port 3000 as CORS configuration on the backend server doesnt allow any other ports.
- The dashboard will display real-time data.
- The charts of each sensor are using historic data.
- Use the search feature to filter the data by date.

### Frontend configuration
- If you encounter any issues with getting data from MQTT, make sure you are on a network that doesn't block WebSockets, some local networks such as those at universities will not work. Worst case scenario use mobile data.

### How to use
- npm i
- npm run start

## Libraries
- apexcharts 3.41.1
- axios 1.4.0
- bootstrap 5.3.1
- buffer 6.0.3
- moment 2.29.4
- moment-timezone 0.5.43
- paho-mqtt 1.1.0
- react 18.2.0
- react-bootstrap 2.8.0
- react-icons 4.10.1
- react-router-dom 6.15.0
- timers-browserify 2.0.12