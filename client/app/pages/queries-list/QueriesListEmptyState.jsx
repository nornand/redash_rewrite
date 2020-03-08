import React from "react";
import PropTypes from "prop-types";
import BigMessage from "@/components/BigMessage";
import NoTaggedObjectsFound from "@/components/NoTaggedObjectsFound";
import EmptyState from "@/components/empty-state/EmptyState";

export default function QueriesListEmptyState({ page, searchTerm, selectedTags }) {
  if (searchTerm !== "") {
    return <BigMessage message="对不起,我们什么也没查到。" icon="fa-search" />;
  }
  if (selectedTags.length > 0) {
    return <NoTaggedObjectsFound objectType="queries" tags={selectedTags} />;
  }
  switch (page) {
    case "favorites":
      return <BigMessage message="收藏的查询将在这里展示。" icon="fa-star" />;
    case "archive":
      return <BigMessage message="已归档的查询将在这里展示。" icon="fa-archive" />;
    case "my":
      return (
        <div className="tiled bg-white p-15">
          <a href="queries/new" className="btn btn-primary btn-sm">
            创建你的第一个查询
          </a>{" "}
          。需要帮忙? 查看{" "}
          <a href="https://redash.io/help/user-guide/querying/writing-queries">帮助文档</a>。
        </div>
      );
    default:
      return (
        <EmptyState
          icon="fa fa-code"
          illustration="query"
          description="从你的数据集中获取数据。"
          helpLink="https://help.redash.io/category/21-querying"
        />
      );
  }
}

QueriesListEmptyState.propTypes = {
  page: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  selectedTags: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
};
