import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";

import GeneralSettings from "./GeneralSettings";
import FormatSettings from "./FormatSettings";

export default createTabbedEditor([
  { key: "General", title: "常用配置", component: GeneralSettings },
  { key: "Format", title: "格式", component: FormatSettings },
]);
