import { useEffect } from "react";

function useFormReset(reset, values) {
  useEffect(() => {
    reset({
      date: values?.date
        ? new Date(values.date).toISOString().split("T")[0]
        : "",
      remark: values?.remark || "",
      bank: values?.bank || "",
      type: values?.type || "",
      purpose: values?.purpose || "",
      status: values?.status || "",
      branch: values?.branch || "",
      amount: values?.amount || "",
    });
  }, [values, reset]);
}

export default useFormReset;
