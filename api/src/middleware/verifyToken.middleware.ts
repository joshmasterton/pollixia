import { Request, Response, NextFunction } from 'express';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

const verifyToken = async (
  req: Request & DecodedIdToken,
  res: Response,
  next: NextFunction,
) => {
  const idToken = req.header('Authorization')?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'No ID token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired ID token' });
  }
};
