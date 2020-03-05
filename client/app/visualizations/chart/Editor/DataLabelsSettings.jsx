import { includes } from "lodash";
import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, Checkbox, ContextHelp } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function DataLabelsSettings({ options, onOptionsChange }) {
  const isShowDataLabelsAvailable = includes(
    ["line", "area", "column", "scatter", "pie", "heatmap"],
    options.globalSeriesType
  );

  const [debouncedOnOptionsChange] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      {isShowDataLabelsAvailable && (
        <Section>
          <Checkbox
            data-test="Chart.DataLabels.ShowDataLabels"
            defaultChecked={options.showDataLabels}
            onChange={event => onOptionsChange({ showDataLabels: event.target.checked })}>
            展示数据标签
          </Checkbox>
        </Section>
      )}

      <Section>
        <Input
          label={
            <React.Fragment>
              数值格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.NumberFormat"
          defaultValue={options.numberFormat}
          onChange={e => debouncedOnOptionsChange({ numberFormat: e.target.value })}
        />
      </Section>

      <Section>
        <Input
          label={
            <React.Fragment>
              百分比数值格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.PercentFormat"
          defaultValue={options.percentFormat}
          onChange={e => debouncedOnOptionsChange({ percentFormat: e.target.value })}
        />
      </Section>

      <Section>
        <Input
          label={
            <React.Fragment>
              日期/时间格式
              <ContextHelp.DateTimeFormatSpecs />
            </React.Fragment>
          }
          data-test="Chart.DataLabels.DateTimeFormat"
          defaultValue={options.dateTimeFormat}
          onChange={e => debouncedOnOptionsChange({ dateTimeFormat: e.target.value })}
        />
      </Section>

      <Section>
        <Input
          label={
            <React.Fragment>
              标签内容
              <ContextHelp placement="topRight" arrowPointAtCenter>
                <div className="p-b-5">使用以下标识符定制数据标签:</div>
                <div>
                  <code>{"{{ @@name }}"}</code> 系列名称;
                </div>
                <div>
                  <code>{"{{ @@x }}"}</code> x轴值;
                </div>
                <div>
                  <code>{"{{ @@y }}"}</code> y轴值;
                </div>
                <div>
                  <code>{"{{ @@yPercent }}"}</code> y轴百分比;
                </div>
                <div>
                  <code>{"{{ @@yError }}"}</code> y轴偏差;
                </div>
                <div>
                  <code>{"{{ @@size }}"}</code> 气泡大小;
                </div>
                <div className="p-t-5">
                  同时,可以使用
                  <code className="text-nowrap">{"{{ 列名 }}"}</code> 展示对应列的值。
                </div>
              </ContextHelp>
            </React.Fragment>
          }
          data-test="Chart.DataLabels.TextFormat"
          placeholder="(auto)"
          defaultValue={options.textFormat}
          onChange={e => debouncedOnOptionsChange({ textFormat: e.target.value })}
        />
      </Section>
    </React.Fragment>
  );
}

DataLabelsSettings.propTypes = EditorPropTypes;
