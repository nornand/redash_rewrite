import { useCallback } from "react";
import EditQueryVisualDialog from "@/components/EditQueryVisualDialog";

export default function useAddNewParameterDialog(query, onParameterAdded) {
  return useCallback(() => {
    EditQueryVisualDialog.showModal({
      parameter: {
        title: null,
        name: "",
        type: "text",
        value: null,
      },
    })
      .result.then(param => {
        const newQuery = query.clone();
        param = newQuery.getParameters().add(param);
        onParameterAddedRef.current(newQuery, param);
      })
      .catch(() => {}); // ignore dismiss
  }, [query]);
}
