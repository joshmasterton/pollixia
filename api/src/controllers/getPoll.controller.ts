import { Request, Response } from 'express';
import * as yup from 'yup';
import { Poll } from '../models/Poll.model';

// Validation schema for creating poll
const getPollSchema = yup.object().shape({
  fetchSingle: yup.boolean().required('Fetch single required'),
});

export const getPoll = async (req: Request, res: Response) => {
  try {
    const validaton = await getPollSchema.validate(req.query);
    const poll = await new Poll().get(validaton.fetchSingle);

    return res.status(200).json(poll);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Create poll server error' });
    }
  }
};
