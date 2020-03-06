import { map } from "lodash";
import React, { useMemo } from "react";
import { Select } from "@/components/visualizations/editor";
import { clientConfig } from "@/services/auth";

export default function ChartTypeSelect(props) {
  const chartTypes = useMemo(() => {
    const result = [
      { type: "line", name: "折线图", icon: "line-chart" },
      { type: "column", name: "柱状图", icon: "bar-chart" },
      { type: "area", name: "面积图", icon: "area-chart" },
      { type: "pie", name: "饼图", icon: "pie-chart" },
      { type: "scatter", name: "散点图", icon: "circle-o" },
      { type: "bubble", name: "气泡图", icon: "circle-o" },
      { type: "heatmap", name: "热力图", icon: "th" },
      { type: "box", name: "箱型图", icon: "square-o" },
    ];

    if (clientConfig.allowCustomJSVisualizations) {
      result.push({ type: "custom", name: "Custom", icon: "code" });
    }

    return result;
  }, []);

  return (
    <Select {...props}>
      {map(chartTypes, ({ type, name, icon }) => (
        <Select.Option key={type} value={type} data-test={`Chart.ChartType.${type}`}>
          <i className={`m-r-5 fa fa-${icon}`} />
          {name}
        </Select.Option>
      ))}
    </Select>
  );
}
