'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from '@/components/Checkbox';
import { Input } from '@/components/Input';
import { Loader } from '@/components/Loader';
import { Instructions } from '@/components/Instructions';
import { Highlight } from '@/components/Highlight';
import { Color, Form, Post } from '@/types';
import useSearch from '@/hooks/useSearch';

export default function HomePage() {
  const [customColorName, setCustomColorName] = useState<Color>('blue');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Form>({
    mode: 'onSubmit',
    defaultValues: {
      textValue: 'init',
      checkboxValue: true,
    },
  });

  const onSubmit: SubmitHandler<Form> = (data) => console.log(data, 'test');

  const textValue = watch('textValue');
  const checkboxValue = watch('checkboxValue');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useSearch({
    list: posts,
    fuseOptions: { keys: ['title'], includeMatches: true },
    searchValue: textValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-2">
        <div className="bg-gray-200 pb-1 pt-1 fixed top-0 left-0 right-0 z-10">
          <div className="flex flex-col gap-2 my-2 ml-1">
            <div>
              <code className="bg-cyan-400">customColorName</code> = "{customColorName}"
            </div>
            <div>
              <code className="bg-green-400">textValue</code> = "{textValue}"
            </div>
            <div>
              <code className="bg-purple-400">checkboxValue</code> = "{checkboxValue.toString()}"
            </div>
          </div>
          <div className="flex gap-3 my-3 items-center justify-center">
            <button onClick={() => setCustomColorName('green')} className="bg-slate-300 rounded-md p-1.5" type="button">
              set theme to green
            </button>
            <button onClick={() => setCustomColorName('blue')} className="bg-slate-300 rounded-md p-1.5" type="button">
              set theme to blue
            </button>

            <button
              onClick={() => setValue('textValue', 'new value')}
              className="bg-slate-300 rounded-md p-1.5"
              type="button"
            >
              set input value
            </button>
            <button
              className="bg-slate-300 rounded-md p-1.5"
              onClick={() => setValue('checkboxValue', !checkboxValue)}
              type="button"
            >
              <span>toggle checkbox</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 mb-3 items-center pt-48">
          <div>
            <Checkbox
              {...register('checkboxValue', { required: 'Checkbox required' })}
              color={customColorName}
              checked={checkboxValue}
              onChange={(e) => setValue('checkboxValue', e.target.checked)}
            >
              Test
            </Checkbox>
            {errors.checkboxValue && <p className="text-red-500 text-xs">{errors.checkboxValue.message}</p>}
          </div>
          <div className="mt-3">
            <Input
              {...register('textValue', {
                required: 'Input required',
                minLength: { value: 4, message: '5 length minimum' },
                maxLength: { value: 8, message: '8 length maximum' },
                pattern: { value: /^[A-Za-z]+$/, message: 'Only latin letters' },
              })}
              id={'textValue'}
              value={textValue}
              onChange={(e) => setValue('textValue', e.target.value)}
              color={customColorName}
            />
            {errors.textValue && <p className="text-red-500 text-xs">{errors.textValue.message}</p>}
          </div>
          <div className="flex justify-center gap-2">
            <button className="bg-slate-300 rounded-md p-1.5" type="submit">
              <span>form submit</span>
            </button>
          </div>
          <div className="font-bold text-center mt-3">Results:</div>
          <div className="p-1">
            <div className="bg-gray-100 p-2 rounded-xl">
              {isLoading ? (
                <Loader />
              ) : (
                filteredPosts.map((post) => (
                  <div key={post.item.id} className="mt-1">
                    <h3 className="text-center font-bold">
                      <Highlight hit={post} attribute="title" />
                    </h3>
                    <p className="mt-1 text-gray-700 mt-2">{post.item.body}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <Instructions />
      </div>
    </form>
  );
}
