import { makeVar } from '@apollo/client';

const getCleanValueForStorage = (value) => {
  return typeof value === 'string' ? value : JSON.stringify(value);
};

const makeVarPersisted = (initialValue, storageName) => {
  let value = initialValue;

  // Try to fetch the value from local storage
  const previousValue = localStorage.getItem(storageName);
  if (previousValue !== null) {
    try {
      const parsed = JSON.parse(previousValue);
      value = parsed;
    } catch {
      // It wasn't JSON, assume a valid value
      value = previousValue;
    }
  }

  // Create a reactive var with stored/initial value
  const rv = makeVar(value);

  const onNextChange = (newValue) => {
    try {
      // Try to add the value to local storage
      if (newValue === undefined) {
        localStorage.removeItem(storageName);
      } else {
        localStorage.setItem(storageName, getCleanValueForStorage(newValue));
      }
    } catch {
      // ignore
    }

    // Re-register for the next change
    rv.onNextChange(onNextChange);
  };

  // Register for the first change
  rv.onNextChange(onNextChange);

  return rv;
};

export default makeVarPersisted;
