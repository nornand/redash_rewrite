import React from "react";
import BigMessage from "@/components/BigMessage";

// Default "list empty" message for list pages
export default function EmptyState(props) {
  return (
    <div className="text-center">
      <BigMessage icon="fa-search" message="对不起,我们什么也没查到。" {...props} />
    </div>
  );
}
