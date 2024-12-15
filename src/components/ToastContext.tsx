// Correct import statement for 'react-hot-toast'
import React, { createContext, useContext,  ReactNode } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { ToastContextProps } from '../types/Types';

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Removed unused state hooks toastMessage and toastType
    const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
        // Directly use toast[type] without setting unused state
        switch (type) {
            case 'success':
                toast.success(message);
                break;
            case 'error':
                toast.error(message);
                break;
            case 'info':
                toast(message); // Assuming 'info' uses the default toast
                break;
            case 'warning':
                toast(message); // Assuming there's no direct 'warning' method, using default toast
                break;
            default:
                toast(message); // Fallback to default toast
                break;
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toaster />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};