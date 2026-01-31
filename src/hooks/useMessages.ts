'use client';

import { useState, useEffect, useCallback } from 'react';

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    status: string;
    createdAt: string;
}

export function useMessages() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/messages');
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            setMessages(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const deleteMessage = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/messages/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete message');
            setMessages(prev => prev.filter(msg => msg.id !== id));
            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            return false;
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    return {
        messages,
        isLoading,
        error,
        fetchMessages,
        deleteMessage,
    };
}
