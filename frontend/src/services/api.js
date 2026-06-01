import axios from 'axios';

// Replace this with your actual EC2 Public IPv4 address or domain
const EC2_BASE_URL = 'http://YOUR_EC2_PUBLIC_IP:8000'; 

export const api = axios.create({
  baseURL: EC2_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});