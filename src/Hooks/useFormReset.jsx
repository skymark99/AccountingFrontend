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

export function useUnivFormReset(reset, selected) {
  useEffect(() => {
    reset({
      student: selected?.student || "",
      courseFee: selected?.courseFee || "",
      counsillor: selected?.counsillor || "",
      country: selected?.country || "",
      agent: selected?.agent || "",
      university: selected?.university || "",
      commition: selected?.commition || "",
      branchName: selected?.branchName || "",
      status: selected?.status || "",
      intake: selected?.intake || "",
      inr: selected?.inr || "",
      currency: selected?.currency || "USD",
      intakeMonth: selected?.intakeMonth || "",
      date: selected?.date
        ? new Date(selected.date).toISOString().split("T")[0]
        : "",
    });
  }, [reset, selected]);
}
