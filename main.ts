const isObject = (obj: unknown): boolean => obj && typeof obj === 'object' && !Array.isArray(obj);

const transformStrToCamel = (str: string, divider: string = '_'): string => {
    const [first, ...rest] = str.split(divider);
    return [first, ...rest.map((item) => item[0].toUpperCase() + item.slice(1))].join('');
};

const keysToCamelCase = <T>(obj: T): T => {
    if (!isObject(obj)) return obj;
    return Object.entries(obj).reduce((acc, [key, value]: [string, T | unknown]) => {
        const lowerKey = key.toLowerCase();
        const snakeToKamel = transformStrToCamel(lowerKey, '_');
        const transformedKey = transformStrToCamel(snakeToKamel, '-');
        return { ...acc, [transformedKey]: keysToCamelCase(value) };
    }, {} as T);
};