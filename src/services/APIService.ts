import axios from 'axios';

const APIService = (
    () => {
        const endpoint = "https://pig-binge-monitoring-server.onrender.com/?skip=0&limit=1000";
        
        const getAllSensorReadings = async () => {
            const response = await axios.get(endpoint);
            return response.data;
        }

        return {
            getAllSensorReadings
        }
    }
)();

export default APIService;