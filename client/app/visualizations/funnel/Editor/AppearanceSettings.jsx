import React from "react";
import { useDebouncedCallback } from "use-debounce";
import { Section, Input, InputNumber, ContextHelp } from "@/components/visualizations/editor";
import { EditorPropTypes } from "@/visualizations/prop-types";

export default function AppearanceSettings({ options, onOptionsChange }) {
  const [onOptionsChangeDebounced] = useDebouncedCallback(onOptionsChange, 200);

  return (
    <React.Fragment>
      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              数值格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          className="w-100"
          data-test="Funnel.NumberFormat"
          defaultValue={options.numberFormat}
          onChange={event => onOptionsChangeDebounced({ numberFormat: event.target.value })}
        />
      </Section>

      <Section>
        <Input
          layout="horizontal"
          label={
            <React.Fragment>
              百分比格式
              <ContextHelp.NumberFormatSpecs />
            </React.Fragment>
          }
          className="w-100"
          data-test="Funnel.PercentFormat"
          defaultValue={options.percentFormat}
          onChange={event => onOptionsChangeDebounced({ percentFormat: event.target.value })}
        />
      </Section>

      <Section>
        <InputNumber
          layout="horizontal"
          label="个数限制"
          className="w-100"
          data-test="Funnel.ItemsLimit"
          min={2}
          defaultValue={options.itemsLimit}
          onChange={itemsLimit => onOptionsChangeDebounced({ itemsLimit })}
        />
      </Section>

      <Section>
        <InputNumber
          layout="horizontal"
          label="最小百分比值"
          className="w-100"
          data-test="Funnel.PercentRangeMin"
          min={0}
          defaultValue={options.percentValuesRange.min}
          onChange={min => onOptionsChangeDebounced({ percentValuesRange: { min } })}
        />
      </Section>

      <Section>
        <InputNumber
          layout="horizontal"
          label="最大百分比值"
          className="w-100"
          data-test="Funnel.PercentRangeMax"
          min={0}
          defaultValue={options.percentValuesRange.max}
          onChange={max => onOptionsChangeDebounced({ percentValuesRange: { max } })}
        />
      </Section>
    </React.Fragment>
  );
}

AppearanceSettings.propTypes = EditorPropTypes;
