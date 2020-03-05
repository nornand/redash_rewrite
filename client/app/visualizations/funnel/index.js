import getOptions from "./getOptions";
import Renderer from "./Renderer";
import Editor from "./Editor";

export default {
  type: "FUNNEL",
  name: "漏斗图",
  getOptions,
  Renderer,
  Editor,

  defaultRows: 10,
};
