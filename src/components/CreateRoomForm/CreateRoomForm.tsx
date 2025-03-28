"use client";

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { RoomInput } from '@/app/types';
import { API_URL } from '@/app/constants';
import styles from './CreateRoomForm.module.css';

export default function CreateRoomForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);
    const [formData, setFormData] = useState<RoomInput>({
        title: '',
        description: '',
        heroUrl: '',
        pricePerNight: {
            amount: 0,
            currency: 'USD'
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'pricePerNight.amount') {
            setFormData(prev => ({
                ...prev,
                pricePerNight: {
                    ...prev.pricePerNight,
                    amount: Number(value)
                }
            }));
        } else if (name === 'pricePerNight.currency') {
            setFormData(prev => ({
                ...prev,
                pricePerNight: {
                    ...prev.pricePerNight,
                    currency: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setServerErrors([]);

        try {
            const response = await fetch(`${API_URL}/rooms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                const errors = errorData.errors || ['Failed to create room'];
                setServerErrors(Array.isArray(errors) ? errors : [errors]);
                return;
            }

            router.push('/rooms');
        } catch (error) {
            console.error('Room creation error:', error);
            setServerErrors(['An unexpected error occurred']);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {serverErrors.length > 0 && (
                <div className={styles.errorContainer}>
                    {serverErrors.map((error, index) => (
                        <p key={index} className={styles.errorMessage}>{error}</p>
                    ))}
                </div>
            )}

            <div className={styles.formGroup}>
                <label htmlFor="title">Room Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="heroUrl">Hero Image URL</label>
                <input
                    type="url"
                    id="heroUrl"
                    name="heroUrl"
                    value={formData.heroUrl}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="pricePerNight.amount">Price per Night</label>
                <div className={styles.priceContainer}>
                    <select
                        name="pricePerNight.currency"
                        value={formData.pricePerNight.currency}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                    </select>
                    <input
                        type="number"
                        id="pricePerNight.amount"
                        name="pricePerNight.amount"
                        value={formData.pricePerNight.amount}
                        onChange={handleInputChange}
                        min="0"
                        step="0.01"
                        required
                        disabled={isLoading}
                    />
                </div>
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={isLoading}
            >
                {isLoading ? 'Creating Room...' : 'Create Room'}
            </button>
        </form>
    );
}