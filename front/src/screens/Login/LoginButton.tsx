import React from 'react';
import { Button } from '@mui/material';
import { login } from '../../api/auth/login';
import { LoginRequest } from '../../api/types';

interface LoginButtonProps {
    username: string;
    password: string;
    onLogin: (token: string) => void;
  }
  
  export const LoginButton = ({ 
    username,
    password,
    onLogin,
  }: LoginButtonProps) => {

    const handleLogin = () => {
        const loginData: LoginRequest = {
            username,
            password,
        };
        
        login.loginUser(loginData)
        .then((response) => {
            if (response.token) {
                onLogin(response.token);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleLogin}>Login</Button>
    );
  };