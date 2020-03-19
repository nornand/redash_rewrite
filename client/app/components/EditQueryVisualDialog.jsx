// import { map } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import { wrap as wrapDialog, DialogPropType } from "@/components/DialogWrapper";


const SchemaItemType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
});

function FilterColumns(props) {
  const operator = [
    { opr: '=', name: '等于' },
    { opr: '>', name: '大于' }
  ];
  // const columns=['lucy','lily'];
  return (
    <div className="m-b-10">
      <Select style={{ width: 100 }}>
        {props.columns.map((item) =>
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        )}
      </Select>
      <Select className="m-l-5" style={{ width: 70 }}>
        {operator.map((item) =>
          <Select.Option key={item.opr} value={item.opr}>
            {item.name}
          </Select.Option>
        )}
      </Select>
      <Input className="m-l-5" placeholder='test' style={{ width: '30%' }}></Input>
      <Button
        className="m-l-5"
        shape="circle"
        type="dashed"
        size="small"
        onClick={props.filterChange(props.index, '')}>
        <span className="fa fa-trash-o" />
      </Button>
    </div>
  )
}

function EditQueryVisualDialog({ dialog, schema }) {
  const [currentTableIndex, setCurrentTableIndex] = useState(0);
  const [filterArray, setFilterArray] = useState([]);
  function addFilterArray() {
    if ((filterArray.length === 0) || (filterArray[filterArray.length - 1] !== ''))
      setFilterArray(filterArray.concat(''));
  }

  function editFilterArray(index, value) {
    if (value === '')
      setFilterArray(filterArray.slice(0, index).concat(filterArray.slice(index + 1)))
    else {
      filterArray[index] = value;
      // setFilterArray(filterArray);
    }
  }

  return (
    <Modal {...dialog.props} width={600} footer={<Button onClick={dialog.dismiss}>关闭</Button>}>
      <div className="query-api-key-dialog-wrapper">
        <h5>选择数据集</h5>
        <div className="m-b-10">
          <Select
            className="w-100"
            defaultValue={0}
            onChange={setCurrentTableIndex}
          >
            {schema.map((item, index) => (
              <Select.Option key={index} value={index}>
                {item.name}
              </Select.Option>
            ))}
          </Select>
        </div>
        <h5>选择字段</h5>
        <div className="m-b-10">
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            defaultValue={schema[currentTableIndex].columns}
            key={schema[currentTableIndex].columns}
          >
            {schema[currentTableIndex].columns.map(item =>
              <Select.Option key={item}>
                {item}
              </Select.Option>
            )}
          </Select>
        </div>
        <h5>过滤项</h5>
        {filterArray.map((item,index) =>
            <FilterColumns
              key={index}
              index={index}
              columns={schema[currentTableIndex].columns}
              filterChange={editFilterArray()}>
            </FilterColumns>
        )}
        <Button className="m-b-10" type="dashed" size="small" onClick={addFilterArray}>
          <span className="fa fa-plus" />增加过滤项
        </Button>
      </div>
    </Modal>
  );
}

EditQueryVisualDialog.propTypes = {
  dialog: DialogPropType.isRequired,
  schema: PropTypes.arrayOf(SchemaItemType),
};

export default wrapDialog(EditQueryVisualDialog);
