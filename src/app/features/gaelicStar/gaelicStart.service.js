import api from "../../../utils/api";

const getProducts = async (data) => {
  const response = await api.get(`api/products`);
  return response.data;
};

const product = {
  getProducts,
};

export default product;
