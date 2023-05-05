const isObject = (obj: unknown): boolean => obj && typeof obj === 'object' && !Array.isArray(obj);

const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);

const transformStrToCamelCase = (str: string, divider: string = '_'): string => {
    const [first, ...rest] = str.split(divider);
    return [first, ...rest.map((word) => capitalizeFirstLetter(word))].join('');
};

export const keysToCamelCase = <T>(obj: T): T => {
    if (!isObject(obj)) return obj;
    return Object.entries(obj).reduce((acc, [key, value]: [string, T | unknown]) => {
        const lowerKey = key.toLowerCase();
        const snakeToKamel = transformStrToCamelCase(lowerKey, '_');
        const transformedKey = transformStrToCamelCase(snakeToKamel, '-');
        return { ...acc, [transformedKey]: keysToCamelCase(value) };
    }, {} as T);
};
