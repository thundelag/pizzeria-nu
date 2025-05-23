import { supabase } from '../lib/supabaseClient';

/**
 * Create a new client
 */
export async function createClient({ full_name, email, phone, address, city, zip_code, auth_id }) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .insert([{ full_name, email, phone, address, city, zip_code, auth_id }])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating client:', error);
    return { data: null, error };
  }
}

/**
 * Get client by email
 */
export async function getClientByEmail(email) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return { data, error: null };
  } catch (error) {
    console.error('Error getting client:', error);
    return { data: null, error };
  }
}

/**
 * Update client information
 */
export async function updateClient(email, updates) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .update(updates)
      .eq('email', email)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating client:', error);
    return { data: null, error };
  }
}

/**
 * Get client by id
 */
export async function getClientById(id) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error getting client by ID:', error);
    return { data: null, error };
  }
}

/**
 * Get client by auth user id
 * This is useful after authentication to get the client profile
 */
export async function getClientByAuthId(auth_id) {
  try {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('auth_id', auth_id)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is no rows returned
    return { data, error: null };
  } catch (error) {
    console.error('Error getting client by auth ID:', error);
    return { data: null, error };
  }
}

/**
 * Delete client
 */
export async function deleteClient(email) {
  try {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('email', email);

    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting client:', error);
    return { error };
  }
}