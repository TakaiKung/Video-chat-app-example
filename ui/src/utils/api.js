import axios from "axios";

const serverApi = 'http://localhost:5002';

export const getRoomExits = async (roomId) => {
    const response = await axios.get(`${ serverApi }/api/room_exits/${ roomId }`);
    return response.data;
};
