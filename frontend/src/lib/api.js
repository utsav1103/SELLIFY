import api from "./axios";

//users apI
export const syncUser = async(userData) =>{
  const {data} = await api.post('/users/sync', userData);
  return data;
};

//Products API
export const getAllProducts = async() =>{
  const {data} = await api.get('/products');
  return data;
};

//Single Product
export const getProductById = async(id) =>{
  const {data} = await api.get(`/products/${id}`);
  return data;
};

//my products
export const getMyProducts = async() =>{
    const {data} = await api.get('/products/my');
    return data;
};

//create product
export const createProduct = async(productData) =>{
  const {data} = await api.post('/products', productData);
  return data;
};
//edit product
export const updateProduct = async({id, ...productData}) =>{
  const {data} = await api.put(`/products/${id}`, productData);
  return data;
};
//delete product
export const deleteProduct = async(id) =>{
  const {data} = await api.delete(`/products/${id}`);
  return data;
};

//Comments api

export const createComment = async({productId, content}) =>{
  const {data} = await api.post(`/comments/${productId}`, {content});
  return data;
};

//delete comment
export const deleteComment = async(id) =>{
  const {data} = await api.delete(`/comments/${id}`);
  return data;
};