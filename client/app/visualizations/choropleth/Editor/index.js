import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";

import GeneralSettings from "./GeneralSettings";
import ColorsSettings from "./ColorsSettings";
import FormatSettings from "./FormatSettings";
import BoundsSettings from "./BoundsSettings";

export default createTabbedEditor([
  { key: "General", title: "常用配置", component: GeneralSettings },
  { key: "Colors", title: "颜色", component: ColorsSettings },
  { key: "Format", title: "格式", component: FormatSettings },
  { key: "Bounds", title: "地图范围", component: BoundsSettings },
]);
