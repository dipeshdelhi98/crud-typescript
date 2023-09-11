import jwt from 'jsonwebtoken';

export const verifyToken = (req:any, res:any, next:any) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'secret123', (err:any, decoded:any) => {

    console.log(err,"err")
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    next();
  });
};
