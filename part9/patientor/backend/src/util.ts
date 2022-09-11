export function fail(field: string): never {
  throw new Error(`Incorrect or missing ${field}`);
}
export const isString = (input: unknown): input is string =>
  typeof input === 'string' || input instanceof String

export const isObject = (input: unknown): input is object =>
  typeof input === 'object' && input !== null && 
  !(input instanceof String || input instanceof Number)

export const isDate = (date: unknown): date is string => // date is Date is better but we need to convert patient date to new Date()
  isString(date) && date.length === 10 &&
  ( Date.parse(date) > Date.parse('1900-01-01') && 
    Date.parse(date) < Date.now()
  )

export const isNumber = (num: unknown): num is number =>
  typeof num === 'number' || num instanceof Number
