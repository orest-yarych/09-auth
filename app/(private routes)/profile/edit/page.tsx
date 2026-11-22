'use client';

import { useAuthStore } from '@/lib/store/authStore';
import css from './EditProfilePage.module.css';
import Image from 'next/image';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { updateMe } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EditProfilePage() {
  const user = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    try {
      const username = formData.get('username');
      console.log('username:', username);
      if (typeof username !== 'string') {
        throw new Error('Invalid form data');
      }

      const res = await updateMe(username);
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid username');
      }
    } catch {
      setError('Oops... some error');
    }
  };

  if (!user) {
    return <ErrorMessage />;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              defaultValue={user.username}
              className={css.input}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={() => router.push('/profile')}
            >
              Cancel
            </button>
          </div>
          {error && <p className={css.error}>{error}</p>}
        </form>
      </div>
    </main>
  );
}
