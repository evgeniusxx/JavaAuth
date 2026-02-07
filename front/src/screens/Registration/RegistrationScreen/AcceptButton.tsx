import React from "react";
import { Button } from '../../../components/ui/Button';
import { registration } from '../../../api/auth/registration';
import { RegisterRequest } from "../../../api/types";

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
        const registerData: RegisterRequest = {
            email,
            username,
            password,
        };

        registration.registrationUser(registerData).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <Button variant="outline" type="button" onClick={handleAccept}>Accept</Button>
    );
};