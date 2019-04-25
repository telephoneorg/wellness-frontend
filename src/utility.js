export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const isArrayLength = arr => Array.isArray(arr) && !!arr.length
