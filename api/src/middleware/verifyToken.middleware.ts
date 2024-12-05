import { Request, Response, NextFunction } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import admin from 'firebase-admin';

export const verifyToken = async (
  req: Request & { user?: DecodedIdToken },
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
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({ error: error.message });
    }

    return res.status(401).json({ error: 'Invalid or expired ID token' });
  }
};
