import supabase from '../config/database.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    if (authData.user) {
      res.status(201).json({
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.user_metadata.name,
        session: authData.session,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ message: error.message });
    }

    if (data.user && data.session) {
      res.json({
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name,
        session: data.session,
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(req.token);

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.user_metadata.name,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
