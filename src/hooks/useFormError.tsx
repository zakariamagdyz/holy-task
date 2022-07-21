import { useState, useEffect } from "react";
import { isEmptyValueExist } from "../utils/isEmptyValueExist";

const useFormError = (formValue: EditState) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // check for empty value
    const isEmptyValue = isEmptyValueExist(formValue);
    if (isEmptyValue) {
      setError("All Input Fields are required");
    } else {
      // only clear the error if the error exists
      if (error) {
        setError(null);
      }
    }
    // eslint-disable-next-line
  }, [formValue, setError]);

  return [error, setError] as const;
};

export default useFormError;
