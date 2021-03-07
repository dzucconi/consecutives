import { take } from "ramda";
import { configure } from "queryparams";
import { FrameInterval } from "frame-interval";
import { get, Response } from "./lib/get";
import { NBSP, generate } from "./lib/generate";
import { trim } from "./lib/trim";
import { DEFAULTS } from "./lib/defaults";

const { params } = configure(DEFAULTS);

const wrap = (x: string) => `<span>${x}</span>`;

const insert = (xs: string[], separator: string) =>
  xs.join(`<i>${separator}</i>`);

document.body.style.backgroundColor = params.background_color;
document.body.style.color = params.color;
document.body.style.fontFamily = params.font_family;
document.body.style.fontSize = params.font_size;
document.body.style.textAlign = params.text_align;

const init = (res: Response | string) => {
  let text: string;

  if (typeof res === "string") {
    text = res;
  } else {
    text = res.entity.body;
  }

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
  .then(init)
  .catch((err) => {
    console.error(err);
    init(params.id);
  });
