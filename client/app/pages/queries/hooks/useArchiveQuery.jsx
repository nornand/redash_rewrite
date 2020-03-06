import { extend, isFunction } from "lodash";
import React, { useCallback, useRef } from "react";
import Modal from "antd/lib/modal";
import { Query } from "@/services/query";
import notification from "@/services/notification";

function confirmArchive() {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      title: "将查询归档",
      content: (
        <React.Fragment>
          <div className="m-b-5">你确定要将这个查询归档吗?</div>
          <div>所有使用这个查询的仪表盘和提醒都将被删除。</div>
        </React.Fragment>
      ),
      okText: "归档",
      okType: "danger",
      onOk: () => {
        resolve();
      },
      cancelText: "取消",
      onCancel: () => {
        reject();
      },
      maskClosable: true,
      autoFocusButton: null,
    });
  });
}

function doArchiveQuery(query) {
  return Query.delete({ id: query.id })
    .then(() => {
      return extend(query.clone(), { is_archived: true, schedule: null });
    })
    .catch(error => {
      notification.error("Query could not be archived.");
      return Promise.reject(error);
    });
}

export default function useArchiveQuery(query, onChange) {
  const onChangeRef = useRef();
  onChangeRef.current = isFunction(onChange) ? onChange : () => {};

  return useCallback(() => {
    confirmArchive()
      .then(() => doArchiveQuery(query))
      .then(updatedQuery => {
        onChangeRef.current(updatedQuery);
      });
  }, [query]);
}
