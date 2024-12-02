import { Nav } from '../comps/Nav.comp';
import { CgClose } from 'react-icons/cg';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dropdown } from '../comps/Dropdown.comp';
import { useEffect } from 'react';
import { CreateFormData } from '../types/comps.types';
import { Side } from '../comps/Side.comp';
import { Slider } from '../comps/Slider.comp';
import axios from 'axios';
import { API_URL } from '../utilities/Api.utilitities';

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
    await axios.post(`${API_URL}/createPoll`, data);
  };

  return (
    <>
      <Nav type="main" />
      <Side />
      <div id="create">
        <form
          method="post"
          autoComplete="off"
          onSubmit={handleSubmit(createPoll)}
        >
          <header>
            <h3>Question</h3>
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
          <div>
            <h3>Category</h3>
            <Dropdown options={categories} setValue={setValue} />
            {errors.category && (
              <p className="error">{errors.category.message}</p>
            )}
          </div>
          <div>
            <h3>Length of poll</h3>
            <Slider
              register={register('lengthActive')}
              type={`${active}hr`}
              value={active}
            />
          </div>
          <main>
            <h3>Options</h3>
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
            <button type="button" className="container" onClick={addOption}>
              <div>Add option</div>
            </button>
          </main>
          <footer>
            {errors.options && (
              <p className="error">{errors.options.message}</p>
            )}
            <button type="submit" className="primary full">
              <div>Create poll</div>
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};
