import { last, filter } from "ramda";

const isOverflowing = () => document.body.offsetHeight > window.innerHeight;

const isSpan = (node: Element) => node.tagName === "SPAN";

function trim(node: Element, done: (n: number) => void) {
  for (var i = 0; i < node.childNodes.length; i++) {
    // @ts-ignore
    if (node.childNodes[0].offsetTop === node.childNodes[i].offsetTop) {
      // @ts-ignore
      node.removeChild(last(node.childNodes));
    } else break;
  }

  if (isOverflowing()) {
    trim(node, done);
  } else {
    if (done) {
      // @ts-ignore
      done(filter(isSpan, node.childNodes).length);
    }
  }
}

export default trim;
