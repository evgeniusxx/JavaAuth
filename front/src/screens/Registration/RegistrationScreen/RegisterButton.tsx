import React from 'react';
import { Button } from '@mui/material';
import { registration } from '../../../api/auth/registration';
import { RegisterRequest } from '../../../api/types';
import { useSnackbar } from '../../../contexts/SnackbarContext';

interface RegisterButtonProps {
    email: string;
    username: string;
    password: string;
    onRegister: (token: string) => void;
  }
  
  export const RegisterButton = ({ 
    email,
    username,
    password,
    onRegister,
  }: RegisterButtonProps) => {
    const { showSuccess, showError } = useSnackbar();

    const handleRegister = () => {
        const registerData: RegisterRequest = {
            email,
            username,
            password,
        };
        
        registration.registrationUser(registerData)
        .then((response) => {
            if (response.token) {
                showSuccess('Регистрация прошла успешно!');
                onRegister(response.token);
            }
        })
        .catch((error) => {
            console.error(error);
            showError(error.message || 'Ошибка при регистрации');
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleRegister}>Register</Button>
    );
  };