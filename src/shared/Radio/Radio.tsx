import type { FC } from 'react';
import React from 'react';

export interface RadioProps {
  className?: string;
  name: string;
  id: string;
  onChange?: (value: string) => void;
  checked?: boolean;
  sizeClassName?: string;
  label?: string;
  defaultChecked?: boolean;
}

const Radio: FC<RadioProps> = ({
  className = '',
  name,
  id,
  onChange,
  label,
  sizeClassName = 'w-6 h-6',
  defaultChecked = false,
  checked,
}) => {
  console.log('checked', checked);
  return (
    <div className={`flex items-center text-sm sm:text-base ${className}`}>
      <input
        id={id}
        name={name}
        type="radio"
        className={`focus:ring-action-primary rounded-full border-neutral-400 bg-transparent text-primary hover:border-neutral-700  focus:ring-primary ${sizeClassName}`}
        onChange={(e) => onChange && onChange(e.target.value)}
        checked={checked}
        value={id}
        defaultChecked={defaultChecked}
      />
      {label && <div className="block select-none pl-2.5 sm:pl-3">{label}</div>}
    </div>
  );
};

export default Radio;
