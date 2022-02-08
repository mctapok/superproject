import { $authApi, $api } from ".";
import jwtDecode from "jwt-decode";


export const registration = async (name, email, password) => {
  const {data} = await $api.post('/auth/register', {name, email, password, role: 'USER'})
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
};

export const login = async (email, password) => {
    const {data} = await $api.post('/auth/login', {email, password})
    localStorage.setItem('token', data.token)
    console.log('отрбатал декод', jwtDecode(data.token));
    return jwtDecode(data.token)
  };

  export const isVerify = async () => {
      try {
          const {data} = await $authApi.get('/auth/isverify')
          localStorage.setItem('token', data.token)
          return jwtDecode(data.token)
      } catch(err){
        console.log(err.message)
      }
  };