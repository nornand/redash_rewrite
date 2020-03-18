import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "antd/lib/checkbox";
import Modal from "antd/lib/modal";
import Form from "antd/lib/form";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import Divider from "antd/lib/divider";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import QuerySelector from "@/components/QuerySelector";
import { Query } from "@/services/query";


const SchemaItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
});


function EditQueryVisualDialog(props) {
  return (
    <Modal
      title="可视化查询设置"
      width={600}
      footer={[
        <Button key="cancel" onClick={props.dialog.dismiss}>
          取消
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="paramForm"
          data-test="SaveParameterSettings">
          增加
        </Button>
      ]}>
    </Modal>
  );
}

EditQueryVisualDialog.propTypes = {
  schema: PropTypes.arrayOf(SchemaItemType),
  dialog: DialogPropType.isRequired,
};

EditQueryVisualDialog.defaultProps = {
  schema: [],
};

export default wrapDialog(EditQueryVisualDialog);
