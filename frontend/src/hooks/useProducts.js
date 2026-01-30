import { useMutation, useQuery } from '@tanstack/react-query';
import { createProduct, deleteProduct, getAllProducts, getProductById } from '../lib/api';


export const useProducts = () => {
    const result = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
    return result;

};

export const useCreateProduct = () => {
    const result = useMutation({ mutationFn: createProduct })
    return result;
};

export const useProduct = (id) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        enabled: !!id
        // !! two exclamiantion marks convets to boolean valuse as id is a string we conveted it- !! this is called double bang operator
    });
};

export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: deleteProduct,
    });
};

export const useMyProducts  = () => {
  return useQuery({ queryKey: ["myProducts"], queryFn: getMyProducts });
};