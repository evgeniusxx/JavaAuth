import React from 'react';
import { Button } from '@mui/material';
import { registration } from '../../../api/auth/registration';
import { RegisterRequest } from '../../../api/types';

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

    const handleRegister = () => {
        const registerData: RegisterRequest = {
            email,
            username,
            password,
        };
        
        registration.registrationUser(registerData)
        .then((response) => {
            if (response.token) {
                onRegister(response.token);
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleRegister}>Register</Button>
    );
  };