import { HttpRequest } from './http';

export const getProducts = async () => {
  try {
    const response = await HttpRequest('task_api.php');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProductDetails = async (productId: number) => {
  try {
    const response = await HttpRequest('task_api.php', 'POST', {
      product_id: productId,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
