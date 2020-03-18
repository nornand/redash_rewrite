import { map } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";
import CodeBlock from "@/components/CodeBlock";


const SchemaItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
});

function EditQueryVisualDialog({ dialog, schema }) {
  // const [schema, setSchema] = useState(props.schema);

  return (
    <Modal {...dialog.props} width={600} footer={<Button>关闭</Button>}>
      <div className="query-api-key-dialog-wrapper">
        <h5>API密钥</h5>
        {/* <div className="m-b-20">
          <Input.Group compact>
            <Input readOnly/>
              <Button>
                重新生成
              </Button>
          </Input.Group>
        </div> */}

        <div className="m-b-10">
          <Select
          label="选择数据集"
          className="w-100"
          allowClear
          showSearch
          placeholder="选择数据集...">
          {map(schema, item => (
            <Select.Option key={item.name} value={item.name}>
              {item.name}
            </Select.Option>
          ))}
          </Select> 
        </div>
        

        <h5>API调用举例</h5>
        <div className="m-b-10">
          <label>CSV格式:</label>
          <CodeBlock copyable>csvUrl</CodeBlock>
        </div>
        <div>
          <label>JSON格式:</label>
          <CodeBlock copyable>jsonUrl</CodeBlock>
        </div>
      </div>
    </Modal>
  );
}

EditQueryVisualDialog.propTypes = {
  dialog: DialogPropType.isRequired,
  schema: PropTypes.arrayOf(SchemaItemType),
};

export default wrapDialog(EditQueryVisualDialog);
