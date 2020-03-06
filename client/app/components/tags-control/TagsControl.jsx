import { map, trim } from "lodash";
import React from "react";
import PropTypes from "prop-types";
import Tooltip from "antd/lib/tooltip";
import EditTagsDialog from "./EditTagsDialog";

export class TagsControl extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string),
    canEdit: PropTypes.bool,
    getAvailableTags: PropTypes.func,
    onEdit: PropTypes.func,
    className: PropTypes.string,
    tagsExtra: PropTypes.node,
    children: PropTypes.node,
  };

  static defaultProps = {
    tags: [],
    canEdit: false,
    getAvailableTags: () => Promise.resolve([]),
    onEdit: () => {},
    className: "",
    tagsExtra: null,
    children: null,
  };

  editTags = (tags, getAvailableTags) => {
    EditTagsDialog.showModal({ tags, getAvailableTags })
      .result.then(this.props.onEdit)
      .catch(() => {}); // ignore dismiss
  };

  renderEditButton() {
    const tags = map(this.props.tags, trim);
    return (
      <a
        className="label label-tag hidden-xs"
        role="none"
        onClick={() => this.editTags(tags, this.props.getAvailableTags)}>
        {tags.length === 0 && (
          <React.Fragment>
            <i className="zmdi zmdi-plus m-r-5" />
            添加标签
          </React.Fragment>
        )}
        {tags.length > 0 && <i className="zmdi zmdi-edit" />}
      </a>
    );
  }

  render() {
    return (
      <div className={"tags-control " + this.props.className}>
        {this.props.children}
        {map(this.props.tags, tag => (
          <span className="label label-tag" key={tag} title={tag}>
            {tag}
          </span>
        ))}
        {this.props.canEdit && this.renderEditButton()}
        {this.props.tagsExtra}
      </div>
    );
  }
}

function modelTagsControl({ archivedTooltip }) {
  // See comment for `propTypes`/`defaultProps`
  // eslint-disable-next-line react/prop-types
  function ModelTagsControl({ isDraft, isArchived, ...props }) {
    return (
      <TagsControl {...props}>
        {!isArchived && isDraft && <span className="label label-tag-unpublished">未发布</span>}
        {isArchived && (
          <Tooltip placement="right" title={archivedTooltip}>
            <span className="label label-tag-archived">归档</span>
          </Tooltip>
        )}
      </TagsControl>
    );
  }

  ModelTagsControl.propTypes = {
    isDraft: PropTypes.bool,
    isArchived: PropTypes.bool,
  };

  ModelTagsControl.defaultProps = {
    isDraft: false,
    isArchived: false,
  };

  return ModelTagsControl;
}

export const QueryTagsControl = modelTagsControl({
  archivedTooltip: "这个查询已归档,将无法在仪表盘中使用，而且不会被搜索到。",
});

export const DashboardTagsControl = modelTagsControl({
  archivedTooltip: "这个仪表盘已归档，将不会在仪表盘列表中展现，而且无法被搜索到。",
});
