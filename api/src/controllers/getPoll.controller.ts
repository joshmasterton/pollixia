import { Request, Response } from 'express';
import { Poll } from '../models/Poll.model';
import * as yup from 'yup';

// Validation schema for creating poll
const getPollSchema = yup.object().shape({
  fetchSingle: yup.boolean().required('Fetch single required'),
  uid: yup.string().optional(),
  page: yup.number().required(),
  isActive: yup.boolean().optional(),
  isUser: yup.boolean().optional(),
  pid: yup.string().optional(),
});

export const getPoll = async (req: Request, res: Response) => {
  try {
    const validaton = await getPollSchema.validate(req.query);
    const poll = await new Poll().get(
      validaton.fetchSingle,
      validaton.pid,
      validaton.uid,
      validaton.page,
      validaton.isActive,
      validaton.isUser,
    );

    return res.status(200).json(poll);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Get poll server error' });
    }
  }
};
