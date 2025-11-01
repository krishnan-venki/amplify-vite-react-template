/**
 * Hook to check Epic connection status and fetch patient data
 */
import { useState, useEffect } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { API_ENDPOINTS } from '../config/api';

export interface EpicPatientData {
  userId: string;
  epicPatientId: string;
  normalizedData: {
    firstName: string;
    lastName: string;
    fullName: string;
    birthDate: string;
    gender: string;
    mrn: string;
    phone?: string;
    email?: string;
    address?: {
      line: string[];
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
    identifiers: Array<{
      system: string;
      value: string;
      type: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface EpicConnectionStatus {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  patientData: EpicPatientData | null;
}

export function useEpicConnection() {
  const [status, setStatus] = useState<EpicConnectionStatus>({
    isConnected: false,
    isLoading: true,
    error: null,
    patientData: null,
  });

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setStatus(prev => ({ ...prev, isLoading: true, error: null }));

      // Get user session
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        setStatus({
          isConnected: false,
          isLoading: false,
          error: 'Not authenticated',
          patientData: null,
        });
        return;
      }

      // Check Epic connection status
      const response = await fetch(API_ENDPOINTS.EPIC_CONNECTION_STATUS, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStatus({
          isConnected: data.connected,
          isLoading: false,
          error: null,
          patientData: data.patientData || null,
        });
      } else {
        setStatus({
          isConnected: false,
          isLoading: false,
          error: 'Failed to check connection status',
          patientData: null,
        });
      }
    } catch (error) {
      console.error('Error checking Epic connection:', error);
      setStatus({
        isConnected: false,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        patientData: null,
      });
    }
  };

  const disconnect = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(`${API_ENDPOINTS.EPIC_CONNECTION_STATUS}/disconnect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setStatus({
          isConnected: false,
          isLoading: false,
          error: null,
          patientData: null,
        });
      } else {
        throw new Error('Failed to disconnect');
      }
    } catch (error) {
      console.error('Error disconnecting from Epic:', error);
      throw error;
    }
  };

  return {
    ...status,
    refresh: checkConnection,
    disconnect,
  };
}
