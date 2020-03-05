import Renderer from "./Renderer";
import Editor from "./Editor";

export default {
  type: "SUNBURST_SEQUENCE",
  name: "旭日图",
  getOptions: options => ({ ...options }),
  Renderer,
  Editor,

  defaultRows: 7,
};
