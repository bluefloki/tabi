import { createClient } from '@supabase/supabase-js';
import { variables } from '../utils/variables';

export const supabase = createClient(variables.apiUrl, variables.apiKey);
