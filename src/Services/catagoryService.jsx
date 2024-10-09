import axios from "axios";

const URL = import.meta.env.VITE_URL;

export const addCatagory = async (body) => {
  const response = await axios.post(`${URL}/v1/catagory`, body, {
    withCredentials: true,
  });
  return response.data;
};

export const editCatagory = async (id, body) => {
  const response = await axios.patch(`${URL}/v1/catagory/${id}`, body, {
    withCredentials: true,
  });
  return response.data;
};

export const addParticular = async (catagoryName, particular) => {
  const response = await axios.patch(
    `${URL}/v1/catagory/addParticular`,
    { particular, catagoryName },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
export const updateParticular = async (
  catagory,
  particularName,
  particular
) => {
  const response = await axios.patch(
    `${URL}/v1/catagory/updateParticular?catagoryName=${catagory}&particularName=${particularName}`,
    { particular },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
