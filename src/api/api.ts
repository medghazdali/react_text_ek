import axios from 'axios';

const apiEndpoint = 'https://61b0dd073c954f001722a6c4.mockapi.io/test-react';

const instance = axios.create({
    baseURL: apiEndpoint,
});

export const getMeters = () => instance.get(`${apiEndpoint}/meters`);
export const getMetersData = (id: string) => instance.get(`${apiEndpoint}/${id}`);
