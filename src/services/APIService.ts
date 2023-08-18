import axios from 'axios';

const APIService = (
    () => {
        const deployedEndpoint = "https://pig-binge-monitoring-server.onrender.com/?skip=0&limit=1000";
        const localEndpoint = "http://127.0.0.1:3001/";
        
        const getAllSensorReadings = async () => {
            try {
                const response = await axios.get(deployedEndpoint);
                if (response.status === 200 || response.status === 304 ) {
                    return response.data;
                } else {
                    throw new Error("Error fetching data from API, switching to local server");
                }
            } catch (error) {
                console.error(error);
                const response = await axios.get(localEndpoint);
                return response.data;
            } finally {
                console.log("API call finished");
            }
        }

        return {
            getAllSensorReadings
        }
    }
)();

export default APIService;