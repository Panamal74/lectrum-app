import { sum, getUniqueID, getFullApiUrl } from './index';

describe.skip('test sum function', () => {
    test('first operand should be a number', () => {
        expect(() => sum('num', 2)).toThrow('Operand 1 should be a number.');
    });

    test('second operand should be a number', () => {
        expect(() => sum(2, 'num')).toThrow('Operand 2 should be a number.');
    });

    test('sum function should return 3 for 1 + 2', () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe.skip('test getUniqueID function', () => {
    test('аргумент функции должен иметь тип number', () => {
        expect(() => getUniqueID('num')).toThrow('The function argument should be a number!');
    });

    test('getUniqueID должна вернуть значение типа string', () => {
        expect(typeof getUniqueID()).toBe('string');
    });

    test('getUniqueID без аргументов должна вернуть значение длиной 15 символов', () => {
        expect(getUniqueID().length).toBe(15);
    });

    test('getUniqueID(12) должна вернуть значение длиной 12 символов', () => {
        expect(getUniqueID(12).length).toBe(12);
    });
});

describe.skip('test getFullApiUrl function', () => {

    test('первый аргумент функции  getFullApiUrl должен иметь тип string', () => {
        expect(() => getFullApiUrl(2, 'num')).toThrow("'api' and 'GROUP_ID' arguments passed should be a string!");
    });

    test('второй аргумент функции getFullApiUrl должен иметь тип string', () => {
        expect(() => getFullApiUrl('num', 2)).toThrow("'api' and 'GROUP_ID' arguments passed should be a string!");
    });

    test("getFullApiUrl('api', 'GROUP_ID') должна вернуть значение 'api/GROUP_ID'", () => {
        expect(getFullApiUrl('api', 'GROUP_ID')).toBe('api/GROUP_ID');
    });
});
