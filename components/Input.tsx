import clsx from 'clsx';
import { Color } from '@/types';

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  color?: Color;
  className?: string;
  id: string;
  placeholder?: string;
}

export function Input(props: InputProps) {
  const { value, onChange, color = 'blue', className, id, placeholder = 'Standard' } = props;
  return (
    <div className="mx-auto h-8 w-64">
      <label className="relative justify-center items-center">
        <div className={className}>
          <input
            type="text"
            className={clsx(
              'peer placeholder-transparent outline-none absolute border border-1 border-t-0 border-r-0 border-l-0 border-b-slate-500 hover:border-b-slate-800 hover:border-b-2',
              {
                'focus:border-b-2 focus:border-green-500': color === 'green',
                'focus:border-b-2 focus:border-blue-500': color === 'blue',
              }
            )}
            id={id}
            color={color}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
          />
          <div
            className={clsx(
              'absolute cursor-text top-2 left-0 text-gray-500 text-xs transition-all -translate-y-6 peer-focus:-translate-y-6 peer-placeholder-shown:-translate-y-1/2 peer-focus:text-xs peer-placeholder-shown:text-base peer-focus:text-blue-500'
            )}
          >
            {placeholder}
          </div>
        </div>
      </label>
    </div>
  );
}
