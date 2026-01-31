import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

export function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const updateUserRole = async (id: string, role: string) => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role }),
            });
            if (!res.ok) throw new Error('Failed to update user role');
            await fetchUsers();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update role');
            return false;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/users?id=${id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete user');
            await fetchUsers();
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete user');
            return false;
        }
    };

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        updateUserRole,
        deleteUser,
    };
}
