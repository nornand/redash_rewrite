import React from "react";
import { useDebouncedCallback } from "use-debounce";
import * as Grid from "antd/lib/grid";
import {
  Section,
  Select,
  Input,
  Checkbox,
  TextArea,
  TextAlignmentSelect,
  ContextHelp,
} from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

function TemplateFormatHint({ mapType }) {
  // eslint-disable-line react/prop-types
  return (
    <ContextHelp placement="topLeft" arrowPointAtCenter>
      <div className="p-b-5">
        All query result columns can be referenced using <code>{"{{ column_name }}"}</code> syntax.
      </div>
      <div className="p-b-5">Use special names to access additional properties:</div>
      <div>
        <code>{"{{ @@value }}"}</code> formatted value;
      </div>
      {mapType === "countries" && (
        <React.Fragment>
          <div>
            <code>{"{{ @@name }}"}</code> short country name;
          </div>
          <div>
            <code>{"{{ @@name_long }}"}</code> full country name;
          </div>
          <div>
            <code>{"{{ @@abbrev }}"}</code> abbreviated country name;
          </div>
          <div>
            <code>{"{{ @@iso_a2 }}"}</code> two-letter ISO country code;
          </div>
          <div>
            <code>{"{{ @@iso_a3 }}"}</code> three-letter ISO country code;
          </div>
          <div>
            <code>{"{{ @@iso_n3 }}"}</code> three-digit ISO country code.
          </div>
        </React.Fragment>
      )}
      {mapType === "subdiv_japan" && (
        <React.Fragment>
          <div>
            <code>{"{{ @@name }}"}</code> Prefecture name in English;
          </div>
          <div>
            <code>{"{{ @@name_local }}"}</code> Prefecture name in Kanji;
          </div>
          <div>
            <code>{"{{ @@iso_3166_2 }}"}</code> five-letter ISO subdivision code (JP-xx);
          </div>
        </React.Fragment>
      )}
    </ContextHelp>
  );
}

export default function GeneralSettings({ options, onOptionsChange }) {
  const [onOptionsChangeDebounced] = useDebouncedCallback(onOptionsChange, 200);

  const templateFormatHint = <TemplateFormatHint mapType={options.mapType} />;

  return (
    <div className="choropleth-visualization-editor-format-settings">
      <Section>
        <Grid.Row gutter={15}>
          <Grid.Col span={12}>
            <Input
              label={
                <React.Fragment>
                  数值格式
                  <ContextHelp.NumberFormatSpecs />
                </React.Fragment>
              }
              className="w-100"
              data-test="Choropleth.Editor.ValueFormat"
              defaultValue={options.valueFormat}
              onChange={event => onOptionsChangeDebounced({ valueFormat: event.target.value })}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Input
              label="数值占位符"
              className="w-100"
              data-test="Choropleth.Editor.ValuePlaceholder"
              defaultValue={options.noValuePlaceholder}
              onChange={event => onOptionsChangeDebounced({ noValuePlaceholder: event.target.value })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.LegendVisibility"
          checked={options.legend.visible}
          onChange={event => onOptionsChange({ legend: { visible: event.target.checked } })}>
          显示图例
        </Checkbox>
      </Section>

      <Section>
        <Grid.Row gutter={15}>
          <Grid.Col span={12}>
            <Select
              label="图例位置"
              className="w-100"
              data-test="Choropleth.Editor.LegendPosition"
              disabled={!options.legend.visible}
              defaultValue={options.legend.position}
              onChange={position => onOptionsChange({ legend: { position } })}>
              <Select.Option value="top-left" data-test="Choropleth.Editor.LegendPosition.TopLeft">
                上/左
              </Select.Option>
              <Select.Option value="top-right" data-test="Choropleth.Editor.LegendPosition.TopRight">
                上/右
              </Select.Option>
              <Select.Option value="bottom-left" data-test="Choropleth.Editor.LegendPosition.BottomLeft">
                下/左
              </Select.Option>
              <Select.Option value="bottom-right" data-test="Choropleth.Editor.LegendPosition.BottomRight">
                下/右
              </Select.Option>
            </Select>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextAlignmentSelect
              data-test="Choropleth.Editor.LegendTextAlignment"
              label="图例对齐方式"
              disabled={!options.legend.visible}
              defaultValue={options.legend.alignText}
              onChange={event => onOptionsChange({ legend: { alignText: event.target.value } })}
            />
          </Grid.Col>
        </Grid.Row>
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.TooltipEnabled"
          checked={options.tooltip.enabled}
          onChange={event => onOptionsChange({ tooltip: { enabled: event.target.checked } })}>
          显示提示
        </Checkbox>
      </Section>

      <Section>
        <Input
          label={<React.Fragment>提示模板 {templateFormatHint}</React.Fragment>}
          className="w-100"
          data-test="Choropleth.Editor.TooltipTemplate"
          disabled={!options.tooltip.enabled}
          defaultValue={options.tooltip.template}
          onChange={event => onOptionsChangeDebounced({ tooltip: { template: event.target.value } })}
        />
      </Section>

      <Section>
        <Checkbox
          data-test="Choropleth.Editor.PopupEnabled"
          checked={options.popup.enabled}
          onChange={event => onOptionsChange({ popup: { enabled: event.target.checked } })}>
          显示弹出窗
        </Checkbox>
      </Section>

      <Section>
        <TextArea
          label={<React.Fragment>弹出窗模板 {templateFormatHint}</React.Fragment>}
          className="w-100"
          data-test="Choropleth.Editor.PopupTemplate"
          disabled={!options.popup.enabled}
          rows={4}
          defaultValue={options.popup.template}
          onChange={event => onOptionsChangeDebounced({ popup: { template: event.target.value } })}
        />
      </Section>
    </div>
  );
}

GeneralSettings.propTypes = EditorPropTypes;
