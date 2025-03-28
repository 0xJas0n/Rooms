import { describe, it, expect } from 'vitest';
import { formatDate } from './formatDate';

describe('formatDate utility', () => {
    it('should format a standard ISO date string correctly', () => {
        const isoDate = '2023-11-15T00:00:00.000Z';
        const formattedDate = formatDate(isoDate);
        expect(formattedDate).toBe('15.11.2023');
    });

    it('should handle dates from different timezones', () => {
        const isoDate = '2022-03-07T10:30:00-05:00';
        const formattedDate = formatDate(isoDate);
        expect(formattedDate).toBe('07.03.2022');
    });

    it('should work with dates without time component', () => {
        const isoDate = '2024-01-20';
        const formattedDate = formatDate(isoDate);
        expect(formattedDate).toBe('20.01.2024');
    });

    it('throws an error for invalid date string', () => {
        expect(() => formatDate('invalid-date')).toThrow();
    });
});