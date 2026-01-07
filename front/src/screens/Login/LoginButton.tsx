import React from 'react';
import { Button } from '@mui/material';
import { login } from '../../api/auth/login';
import { LoginRequest } from '../../api/types';
import { useSnackbar } from '../../contexts/SnackbarContext';

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
    const { showSuccess, showError } = useSnackbar();

    const handleLogin = () => {
        const loginData: LoginRequest = {
            username,
            password,
        };
        
        login.loginUser(loginData)
        .then((response) => {
            if (response.token) {
                showSuccess('Вход выполнен успешно!');
                onLogin(response.token);
            }
        })
        .catch((error) => {
            console.error(error);
            showError(error.message || 'Ошибка при входе');
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleLogin}>Login</Button>
    );
  };