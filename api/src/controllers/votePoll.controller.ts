import { Request, Response } from 'express';
import * as yup from 'yup';
import { Poll } from '../models/Poll.model';
import { DecodedIdToken } from 'firebase-admin/auth';

// Validation schema for voting on a poll
const voteSchema = yup.object().shape({
  uid: yup.string().optional(),
  pid: yup.number().required(),
  oid: yup.number().required(),
});

export const votePoll = async (
  req: Request & { user?: DecodedIdToken },
  res: Response,
) => {
  try {
    const { user } = req;

    if (user) {
      const validaton = await voteSchema.validate(req.body);

      await new Poll().vote(validaton.oid, validaton.pid, user.uid);
      const poll = await new Poll().get(true, validaton.pid, user.uid);

      return res.status(200).json(poll);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Create poll server error' });
    }
  }
};
