export const createAction = (module: string, action: string) => {
  return {
    REQUEST: `${module}/${action}_REQUEST`,
    SUCCESS: `${module}/${action}_SUCCESS`,
    FAILURE: `${module}/${action}_FAILURE`,
  };
};
