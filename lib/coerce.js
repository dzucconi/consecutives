export default {
  string: x => {
    if (x === undefined) return "";
    if (x === null) return "";
    return String(x);
  },

  integer: x => parseInt(x, 10),

  boolean: x => {
    if (x === "false") return false;
    if (x === "true") return true;
    return !!x;
  }
};
