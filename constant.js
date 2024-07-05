const SIGNUP_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}/api/auth/local/register`;
const LOGIN_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}/api/auth/local`;
const CREATE_NEW_CHAT_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}/api/chats`;
const GET_ALL_CHAT_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}/api/chats?sort=updatedAt:desc`;
const GET_ALL_CHAT_DATA_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}/api/messages?sort=id:asc`;
const SOCKET_URL=`${import.meta.env.VITE_SERVER_CONNECT_URL}`;

export {SIGNUP_URL,LOGIN_URL,CREATE_NEW_CHAT_URL,GET_ALL_CHAT_URL,SOCKET_URL,GET_ALL_CHAT_DATA_URL};