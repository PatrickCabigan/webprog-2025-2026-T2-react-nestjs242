import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { GENSHIN_REGIONS, GENSHIN_CHARACTERS } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

const schema = z.object({
  username: z.string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username too long'),
  message: z.string()
    .min(3, 'Message must be at least 3 characters')
    .max(500, 'Message too long'),
  character_name: z.string().optional(),
  region: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface EntryFormProps {
  onSubmit: (data: FormData) => Promise<boolean>;  // Fixed: returns Promise<boolean>
  loading?: boolean;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmitForm = async (data: FormData) => {
    const success = await onSubmit(data);
    if (success) {
      reset();  // Only reset if submission was successful
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <Input
        label="Traveler Name"
        placeholder="Enter your name..."
        error={errors.username?.message}
        {...register('username')}
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-200">
          Your Message
        </label>
        <textarea
          className="input-field min-h-[100px]"
          placeholder="Leave your thoughts for the Traveler..."
          {...register('message')}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Favorite Character
          </label>
          <select
            className="input-field"
            {...register('character_name')}
          >
            <option value="">Select a character</option>
            {GENSHIN_CHARACTERS.map((character) => (
              <option key={character} value={character}>
                {character}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-200">
            Region
          </label>
          <select
            className="input-field"
            {...register('region')}
          >
            <option value="">Select a region</option>
            {GENSHIN_REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button
        type="submit"
        loading={loading}
        fullWidth
      >
        Leave Your Message
      </Button>
    </form>
  );
};

export default EntryForm;