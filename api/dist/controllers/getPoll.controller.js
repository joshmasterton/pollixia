import { Poll } from '../models/Poll.model.js';
import * as yup from 'yup';
// Validation schema for creating poll
const getPollSchema = yup.object().shape({
    fetchSingle: yup.boolean().required('Fetch single required'),
    uid: yup.string().optional(),
    page: yup.number().required(),
    isActive: yup.boolean().required(),
});
export const getPoll = async (req, res) => {
    try {
        const validaton = await getPollSchema.validate(req.query);
        const poll = await new Poll().get(validaton.fetchSingle, undefined, validaton.uid, validaton.page, validaton.isActive);
        return res.status(200).json(poll);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Create poll server error' });
        }
    }
};
