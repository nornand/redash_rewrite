import { map } from "lodash";
import React, { useMemo } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Select, Input, Checkbox } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function GeneralSettings({ options, data, onOptionsChange }) {
  const columnNames = useMemo(() => map(data.columns, c => c.name), [data]);

  const [onOptionsChangeDebounced] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      <Section>
        <Select
          layout="horizontal"
          label="阶梯列"
          className="w-100"
          data-test="Funnel.StepColumn"
          placeholder="选择列..."
          defaultValue={options.stepCol.colName || undefined}
          onChange={colName => onOptionsChange({ stepCol: { colName: colName || null } })}>
          {map(columnNames, col => (
            <Select.Option key={col} data-test={`Funnel.StepColumn.${col}`}>
              {col}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Input
          layout="horizontal"
          label="阶梯列名称"
          className="w-100"
          data-test="Funnel.StepColumnTitle"
          defaultValue="阶梯列名称"
          onChange={event => onOptionsChangeDebounced({ stepCol: { displayAs: event.target.value } })}
        />
      </Section>

      <Section>
        <Select
          layout="horizontal"
          label="值列"
          className="w-100"
          data-test="Funnel.ValueColumn"
          placeholder="选择列..."
          defaultValue={options.valueCol.colName || undefined}
          onChange={colName => onOptionsChange({ valueCol: { colName: colName || null } })}>
          {map(columnNames, col => (
            <Select.Option key={col} data-test={`Funnel.ValueColumn.${col}`}>
              {col}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Input
          layout="horizontal"
          label="值列标题"
          className="w-100"
          data-test="Funnel.ValueColumnTitle"
          defaultValue="值列标题"
          onChange={event => onOptionsChangeDebounced({ valueCol: { displayAs: event.target.value } })}
        />
      </Section>

      <Section>
        <Checkbox
          data-test="Funnel.CustomSort"
          checked={!options.autoSort}
          onChange={event => onOptionsChange({ autoSort: !event.target.checked })}>
          自定义排序
        </Checkbox>
      </Section>

      {!options.autoSort && (
        <React.Fragment>
          <Section>
            <Select
              layout="horizontal"
              label="排序列"
              className="w-100"
              data-test="Funnel.SortColumn"
              allowClear
              placeholder="选择列..."
              defaultValue={options.sortKeyCol.colName || undefined}
              onChange={colName => onOptionsChange({ sortKeyCol: { colName: colName || null } })}>
              {map(columnNames, col => (
                <Select.Option key={col} data-test={`Funnel.SortColumn.${col}`}>
                  {col}
                </Select.Option>
              ))}
            </Select>
          </Section>

          <Section>
            <Select
              layout="horizontal"
              label="排序顺序"
              className="w-100"
              data-test="Funnel.SortDirection"
              disabled={!options.sortKeyCol.colName}
              defaultValue={options.sortKeyCol.reverse ? "desc" : "asc"}
              onChange={order => onOptionsChange({ sortKeyCol: { reverse: order === "desc" } })}>
              <Select.Option value="asc" data-test="Funnel.SortDirection.Ascending">
                升序
              </Select.Option>
              <Select.Option value="desc" data-test="Funnel.SortDirection.Descending">
                降序
              </Select.Option>
            </Select>
          </Section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

GeneralSettings.propTypes = EditorPropTypes;
