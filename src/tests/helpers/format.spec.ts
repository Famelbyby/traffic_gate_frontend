import { FormatTimestamp, FormatWorkTime, PadStart } from '~/helpers/formats';

const mockedData = (3600 + 67) * 1000;

describe('formats testing', () => {
    test('format timestamp', () => {
        expect(FormatTimestamp(mockedData)).toBe('04:01:07');
    });

    test('format work time', () => {
        expect(FormatWorkTime(mockedData)).toBe('01:01:07');
    });

    test('pad start', () => {
        expect(PadStart(1, 7, '#')).toBe('######1');
    });
});