import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import { getCurrentUser } from '../services/authService';
import { getClientByAuthId } from '../services/clientService';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);

  // Fetch client profile
  const fetchClientProfile = async (userId) => {
    try {
      const { data: profile, error } = await getClientByAuthId(userId);
      if (error) throw error;
      setClientProfile(profile);
    } catch (error) {
      console.error('Error fetching client profile:', error);
      toast.error('Unable to load profile');
    }
  };

  // Check active session
  const checkUser = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      const currentUser = session?.user;
      setUser(currentUser || null);
      if (currentUser) {
        await fetchClientProfile(currentUser.id);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      toast.error('Authentication error');
    } finally {
      setLoadingInitial(false);
    }
  };

  useEffect(() => {
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchClientProfile(session.user.id);
        toast.success('Successfully signed in!');
      } else {
        setUser(null);
        setClientProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Clear all auth state
  const clearAuthState = () => {
    setUser(null);
    setClientProfile(null);
  };

  // Expose the auth context
  const value = {
    user,
    clientProfile,
    loading: loading || loadingInitial,
    clearAuthState,
    refreshProfile: () => user && fetchClientProfile(user.id),
  };

  // Don't render children until initial load is complete
  if (loadingInitial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
