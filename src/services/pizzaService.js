import { supabase } from '../lib/supabaseClient'

/**
 * Fetch all pizzas from the database
 * @returns {Promise<Array>} Array of pizza objects
 */
export async function getPizzas() {
  try {
    const { data, error } = await supabase
      .from('pizzas')
      .select('*')
      .order('category')
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching pizzas:', error.message)
    return []
  }
}

/**
 * Fetch a single pizza by ID
 * @param {string} id - The pizza's UUID
 * @returns {Promise<Object|null>} Pizza object or null if not found
 */
export async function getPizzaById(id) {
  try {
    const { data, error } = await supabase
      .from('pizzas')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching pizza:', error.message)
    return null
  }
}

/**
 * Create a new pizza
 * @param {Object} pizza - The pizza object to create
 * @returns {Promise<Object|null>} Created pizza object or null if failed
 */
export async function createPizza(pizza) {
  try {
    const { data, error } = await supabase
      .from('pizzas')
      .insert([pizza])
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error creating pizza:', error.message)
    return null
  }
}

/**
 * Update an existing pizza
 * @param {string} id - The pizza's UUID
 * @param {Object} updates - The fields to update
 * @returns {Promise<Object|null>} Updated pizza object or null if failed
 */
export async function updatePizza(id, updates) {
  try {
    const { data, error } = await supabase
      .from('pizzas')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  } catch (error) {
    console.error('Error updating pizza:', error.message)
    return null
  }
}

/**
 * Delete a pizza
 * @param {string} id - The pizza's UUID
 * @returns {Promise<boolean>} True if successful, false otherwise
 */
export async function deletePizza(id) {
  try {
    const { error } = await supabase
      .from('pizzas')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting pizza:', error.message)
    return false
  }
}