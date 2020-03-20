// import { map } from "lodash";
import React, { useState } from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal";
import Button from "antd/lib/button";
import Select from "antd/lib/select";
import Input from "antd/lib/input";
import Tag from "antd/lib/tag";
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
  const filterSql = {
    key: '',
    opr: '',
    value: ''
  };
  function setFilterSql(type, value) {
    filterSql[type] = value;
    props.filterChange(props.index, (filterSql.key + filterSql.opr + filterSql.value));
  }

  return (
    <div className="m-b-10">
      <Select
        style={{ width: 100 }}
        onChange={value => setFilterSql('key', value)}>
        {props.columns.map((item) =>
          <Select.Option key={item} value={item}>
            {item}
          </Select.Option>
        )}
      </Select>
      <Select
        className="m-l-5"
        style={{ width: 70 }}
        onChange={value => setFilterSql('opr', value)}>
        {operator.map((item) =>
          <Select.Option key={item.opr} value={item.opr}>
            {item.name}
          </Select.Option>
        )}
      </Select>
      <Input
        className="m-l-5"
        placeholder='请输入'
        style={{ width: '30%' }}
        onChange={e => setFilterSql('value', e.target.value)}></Input>
      <Button
        className="m-l-5"
        shape="circle"
        type="dashed"
        size="small"
        onClick={() => props.filterChange(props.index, '')}>
        <span className="fa fa-trash-o" />
      </Button>
    </div>
  )
}

function EditQueryVisualDialog({ dialog, schema }) {
  const [currentColumns, setCurrentColumns] = useState(schema[0].columns);
  const [filterArray, setFilterArray] = useState([]);
  const [sortArray, setSortArray] = useState([]);
  const [addSort, setAddSort] = useState(false);
  function addFilter() {
    if ((filterArray.length === 0) || (filterArray[filterArray.length - 1] !== ''))
      setFilterArray(filterArray.concat(''));
  }

  function editFilter(index, value) {
    if (value === '')
      setFilterArray(filterArray.slice(0, index).concat(filterArray.slice(index + 1)))
    else {
      filterArray[index] = value;
      setFilterArray(filterArray);
    }
  }

  function editSort(index, type){
    if(type==='sort'){
      sortArray[index].sort = sortArray[index].sort==='A'? 'D':'A';
    }
    setSortArray(sortArray);
  }

  return (
    <Modal {...dialog.props} width={600} footer={<Button onClick={dialog.dismiss}>关闭</Button>}>
      <div className="query-api-key-dialog-wrapper">
        <h5>选择数据集</h5>
        <div className="m-b-10">
          <Select
            className="w-100"
            defaultValue={0}
            onChange={setCurrentColumns}
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
            defaultValue={currentColumns}
            key={currentColumns}
          >
            {currentColumns.map(item =>
              <Select.Option key={item}>
                {item}
              </Select.Option>
            )}
          </Select>
        </div>
        <h5>过滤项</h5>
        {filterArray.map((item, index) =>
          <FilterColumns
            key={index}
            index={index}
            columns={currentColumns}
            filterChange={editFilter}>
          </FilterColumns>
        )}
        <Button className="m-b-10" type="dashed" size="small" onClick={addFilter}>
          <span className="fa fa-plus" /> 增加过滤项
        </Button>
        {filterArray.map((item, index) =>
          <Tag
            key={index}>
            {item}
          </Tag>
        )}
        <h5>排序</h5>
        {sortArray.map((item, index) =>
          <Tag
            closable
            // color='green'
            key={index}
            checked={item.sort==='D'}
            onChange={checked=> editSort(index,'sort')}
            >
            {item.sort === 'A' ? <span className="fa fa-arrow-up" /> : <span className="fa fa-arrow-down" />}
            {' '} {item.value}
          </Tag>
        )}
        <Tag 
          className="m-b-10" 
          visible={!addSort}
          onClick={() => setAddSort(true)}
          style={{ borderStyle: "dashed" }}
        >
          <span className="fa fa-plus" />
          增加排序项
        </Tag>
        {addSort === true &&
          <Select className="m-l-10"
            visible
            style={{ width: 100 }}
            size="small"
            placeholder="选择列"
            onChange={value => {
              setSortArray(sortArray.concat({ value: value, sort: 'A' }));
              setAddSort(false);
            }}
          >
            {currentColumns.map((item) =>
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            )}
          </Select>
        }
        <Tag >change</Tag>
      </div>
    </Modal>
  );
}

EditQueryVisualDialog.propTypes = {
  dialog: DialogPropType.isRequired,
  schema: PropTypes.arrayOf(SchemaItemType),
};

export default wrapDialog(EditQueryVisualDialog);
