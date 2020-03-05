import { map } from "lodash";
import React from "react";
import { Section, Select } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

const CohortTimeIntervals = {
  daily: "日",
  weekly: "周",
  monthly: "月",
};

const CohortModes = {
  diagonal: "用零填充间断",
  simple: "按原样显示",
};

export default function OptionsSettings({ options, onOptionsChange }) {
  return (
    <React.Fragment>
      <Section>
        <Select
          label="时间间隔"
          data-test="Cohort.TimeInterval"
          className="w-100"
          value={options.timeInterval}
          onChange={timeInterval => onOptionsChange({ timeInterval })}>
          {map(CohortTimeIntervals, (name, value) => (
            <Select.Option key={value} data-test={"Cohort.TimeInterval." + value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Select
          label="模式"
          data-test="Cohort.Mode"
          className="w-100"
          value={options.mode}
          onChange={mode => onOptionsChange({ mode })}>
          {map(CohortModes, (name, value) => (
            <Select.Option key={value} data-test={"Cohort.Mode." + value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Section>
    </React.Fragment>
  );
}

OptionsSettings.propTypes = EditorPropTypes;
