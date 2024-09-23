'use client'

import React, { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ErrorResponse } from '@/utils';

interface ClientComponentProps {
    error: ErrorResponse;
}

const ClientComponent: React.FC<ClientComponentProps> = ({ error }) => {
    
    useEffect(() => {
        if (error) {
            enqueueSnackbar(error?.message, { key: error?.statusCode, variant: 'error', preventDuplicate: true });
        }
    }, [error]);

    return (<></>);
};

export default ClientComponent;