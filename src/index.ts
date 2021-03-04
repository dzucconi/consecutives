import { take } from "ramda";
import { configure } from "queryparams";
import { FrameInterval } from "frame-interval";

import { get } from "./lib/get";
import generate, { NBSP } from "./lib/generate";
import trim from "./lib/trim";

const { params } = configure({
  // Configuration
  id: "debug",
  fps: 30,
  width: 25,
  separator: "",
  break: true,
  // Style
  background_color: "black",
  color: "white",
  font_family: "sans-serif",
  font_size: "20px",
  text_align: "left",
});

const wrap = (x: string) => `<span>${x}</span>`;

const insert = (xs: string[], separator: string) =>
  xs.join(`<i>${separator}</i>`);

document.body.style.backgroundColor = params.background_color;
document.body.style.color = params.color;
document.body.style.fontFamily = params.font_family;
document.body.style.fontSize = params.font_size;
document.body.style.textAlign = params.text_align;

const runner = (body: string) => {
  let text = body;

  if (!params.break) {
    text = text.replace(/ /g, NBSP);
  }

  const stage = document.getElementById("stage");
  const frames = generate(text, params.width).map(wrap);
  const separator = params.separator;

  stage.innerHTML = insert(frames, separator);

  const run = (limit: number) => {
    const fi = new FrameInterval(params.fps, () => {
      stage.innerHTML = insert(take(limit, generate.step(frames)), separator);
    });

    fi.start();
  };

  trim(stage, (limit) => {
    run(limit);
  });
};

get(params.id)
  .then(runner)
  .catch((err) => {
    console.error(err);
    runner(params.id);
  });
