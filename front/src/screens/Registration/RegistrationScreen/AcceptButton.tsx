import React, { useState } from 'react';
import { Button } from '@mui/material';
import { registration, User } from '../../../api/registration';

interface AcceptButtonProps {

    email: string;
    username: string;
    password: string;
  }
  
  export const AcceptButton = ({ 
    email,
    username,
    password,
  }: AcceptButtonProps) => {

    const handleAccept = () => {
        // console.log("email: " + email, "username: " + username, "password: " + password);
        registration.registrationUser(
            {
                email: email,
                username: username,
                password: password,
            } as User
        ).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }
  
  
    return (
    <Button variant="outlined" type="button" onClick={handleAccept}>Accept</Button>
    );
  };