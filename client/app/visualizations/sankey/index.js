import Renderer from "./Renderer";
import Editor from "./Editor";

export default {
  type: "SANKEY",
  name: "桑基图",
  getOptions: options => ({ ...options }),
  Renderer,
  Editor,

  defaultRows: 7,
};
