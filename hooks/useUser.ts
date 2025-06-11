// hooks/useUser.ts
'use client';

import { useState, useEffect } from 'react';

type User = {
  name: string;
  email: string;
  id?: string;
  // Add more fields if needed
};

export function useUser(): { user: User | null; loading: boolean } {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/me')
      .then(res => res.json())
      .then(data => {
        setUser(data.user || null);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
