"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext<{ user: User | null }>({ user: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // Protected Route Logic
      const publicRoutes = ['/login', '/register', '/'];
      if (!loading && !currentUser && !publicRoutes.includes(pathname)) {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router, pathname, loading]);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center bg-[#00000a]">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan border-t-transparent" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
