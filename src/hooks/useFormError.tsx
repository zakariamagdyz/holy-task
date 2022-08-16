import { useState, useEffect } from "react";
import { isEmptyValueExist } from "../utils/isEmptyValueExist";
import validator from "validator";

const useFormError = (formValue: EditState) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // validate email & url and check for empty value
    if (isEmptyValueExist(formValue)) {
      setError("All input fields are required");
    } else if (!validator.isEmail(formValue.email)) {
      setError("Please enter a valid email");
    } else if (!validator.isURL(formValue.website)) {
      setError("Please enter a valid URL");
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
