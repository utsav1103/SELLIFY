import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../lib/api';


export const useProducts = () => {
    const result = useQuery({ queryKey: ['products'], queryFn:getAllProducts});
    return result;

};