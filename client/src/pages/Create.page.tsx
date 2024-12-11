import { Nav } from '../comps/Nav.comp';
import { CgClose } from 'react-icons/cg';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dropdown } from '../comps/Dropdown.comp';
import { useEffect, useState } from 'react';
import { CreateFormData } from '../types/comps.types';
import { Side } from '../comps/Side.comp';
import { Slider } from '../comps/Slider.comp';
import axios from 'axios';
import { API_URL } from '../utilities/Api.utilitities';
import { useAppDispatch, useAppSelector } from '../store';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../utilities/Loading.utilities';
import { Footer } from '../comps/Footer.comp';
import { activatePopup } from '../features/popupSlice.feature';

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

export const Create = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.user);

  const categories = [
    'Entertainment',
    'Sports',
    'Technology',
    'Lifestyle',
    'Politics',
    'Education',
    'Health',
    'Business',
    'Travel',
    'Food',
    'Other',
  ];

  // React hook form setup
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm<CreateFormData>({
    mode: 'onChange',
    defaultValues: {
      question: '',
      lengthActive: 1,
      options: [
        {
          value: '',
        },
        {
          value: '',
        },
      ],
    },
    resolver: yupResolver(createSchema),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'options',
    control,
  });

  const addOption = () => {
    if (fields.length < 5) {
      append({ value: '' });
    }
  };

  const removeOption = (index: number) => {
    if (fields.length > 2) {
      remove(index);
    }
  };

  const category = watch('category');
  const active = watch('lengthActive');

  useEffect(() => {
    if (category) {
      clearErrors('category');
    }
  }, [category]);

  const createPoll = async (data: CreateFormData) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/createPoll`, data, {
        headers: {
          Authorization: `Bearer ${user?.idToken}`,
        },
      });

      navigate('/polls');
    } catch (error) {
      if (error instanceof Error) {
        activatePopup(dispatch, error.message, '');
      } else {
        activatePopup(dispatch, 'Error signing in', '');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="create">
        <h2>Lets create a poll!</h2>
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit(createPoll)}
        >
          <h3>Please choose a question</h3>
          <header>
            <h4>Question</h4>
            <label htmlFor="question" className="textarea">
              <textarea
                maxLength={200}
                id="question"
                {...register('question')}
                placeholder="Put your question here..."
              />
              {errors.question && (
                <p className="error">{errors.question.message}</p>
              )}
            </label>
          </header>
          <h3>Choose a category</h3>
          <div>
            <h4>Category</h4>
            <Dropdown options={categories} setValue={setValue} />
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>
          <h3>How long will the poll be?</h3>
          <div>
            <h4>Length of poll</h4>
            <Slider
              register={register('lengthActive')}
              type={`${active}hr`}
              value={active}
            />
          </div>
          <h3>Provide options for the poll?</h3>
          <main>
            <h4>Options</h4>
            {fields.map((field, index) => (
              <div key={field.id} className="label">
                <label htmlFor={`options.${index}.value`}>
                  <input
                    max={50}
                    id={`options.${index}.value`}
                    {...register(`options.${index}.value` as const)}
                    placeholder="Option value..."
                  />
                </label>
                <button type="button" onClick={() => removeOption(index)}>
                  <CgClose />
                </button>
                {errors.options?.[index] && (
                  <p className="error">
                    {errors.options?.[index]?.value?.message}
                  </p>
                )}
              </div>
            ))}
            <button type="button" className="background" onClick={addOption}>
              <div>Add option</div>
            </button>
          </main>
          <footer>
            {errors.options && (
              <p className="error">{errors.options.message}</p>
            )}
            <button disabled={loading} type="submit" className="primary full">
              {loading ? <Loading /> : <div>Create poll</div>}
            </button>
          </footer>
        </form>
        <Footer />
      </div>
    </>
  );
};
