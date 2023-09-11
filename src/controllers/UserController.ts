import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  const { username, password,email } = req.body;

  try {

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: IUser = new User({ username,email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
  
    try {
    
      const user: IUser | null = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ userId: user._id }, 'secret123', {
        expiresIn: '1h', 
      });
  
      res.json({ token });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };