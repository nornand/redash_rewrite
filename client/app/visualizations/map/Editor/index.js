import createTabbedEditor from "@/components/visualizations/editor/createTabbedEditor";

import GeneralSettings from "./GeneralSettings";
import GroupsSettings from "./GroupsSettings";
import FormatSettings from "./FormatSettings";
import StyleSettings from "./StyleSettings";

export default createTabbedEditor([
  { key: "General", title: "基本信息", component: GeneralSettings },
  { key: "Groups", title: "组", component: GroupsSettings },
  { key: "Format", title: "格式", component: FormatSettings },
  { key: "Style", title: "样式", component: StyleSettings },
]);
