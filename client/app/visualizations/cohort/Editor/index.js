import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";

import ColumnsSettings from "./ColumnsSettings";
import OptionsSettings from "./OptionsSettings";

export default createTabbedEditor([
  { key: "Columns", title: "列", component: ColumnsSettings },
  { key: "Options", title: "选项", component: OptionsSettings },
]);
