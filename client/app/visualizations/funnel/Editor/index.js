import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";

import GeneralSettings from "./GeneralSettings";
import AppearanceSettings from "./AppearanceSettings";

export default createTabbedEditor([
  { key: "General", title: "基本信息", component: GeneralSettings },
  { key: "Appearance", title: "展现", component: AppearanceSettings },
]);
