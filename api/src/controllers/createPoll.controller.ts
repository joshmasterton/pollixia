import { Request, Response } from 'express';
import * as yup from 'yup';
import { Poll } from '../models/Poll.model';

// Validation schema for creating poll
const createSchema = yup.object().shape({
  question: yup
    .string()
    .max(200, 'Question cannot exceed 50 characters')
    .required('You must have a question'),
  category: yup
    .string()
    .required('You must choose a category')
    .notOneOf([''], 'You must choose a category'),
  lengthActive: yup.number().required(),
  options: yup
    .array()
    .of(
      yup.object().shape({
        value: yup
          .string()
          .max(50, 'Option cannot exceed 50 characters')
          .required('Cannot be empty'),
      }),
    )
    .min(2)
    .max(5)
    .required(),
});

export const createPoll = async (req: Request, res: Response) => {
  try {
    const validaton = await createSchema.validate(req.body);

    // Create new poll class with details
    const poll = new Poll(
      validaton.question,
      validaton.category,
      validaton.lengthActive,
      validaton.options,
    );

    // Insert into database
    const newPoll = await poll.create();

    // Return details to user
    return res.status(200).json(newPoll);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: 'Create poll server error' });
    }
  }
};
