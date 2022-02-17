import axios from "axios";

const serverApi = 'http://localhost:5002';

export const getRoomExits = async (roomId) => {
    const response = await axios.get(`${ serverApi }/room_exists/${ roomId }`);
    return response.data;
};
