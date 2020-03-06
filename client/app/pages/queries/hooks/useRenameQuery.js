import { useCallback } from "react";
import useUpdateQuery from "./useUpdateQuery";
import recordEvent from "@/services/recordEvent";
import { clientConfig } from "@/services/auth";

export default function useRenameQuery(query, onChange) {
  const updateQuery = useUpdateQuery(query, onChange);

  return useCallback(
    name => {
      recordEvent("edit_name", "query", query.id);
      const changes = { name };
      const options = {};

      if (query.is_draft && clientConfig.autoPublishNamedQueries && name !== "新的查询") {
        changes.is_draft = false;
        options.successMessage = "查询已保存并发布";
      }

      updateQuery(changes, options);
    },
    [query.id, query.is_draft, updateQuery]
  );
}
