import { take } from "ramda";
import { coerce, configure } from "queryparams";
import { FrameInterval } from "frame-interval";
import { get, Response } from "./lib/get";
import { NBSP, generate } from "./lib/generate";
import { trim } from "./lib/trim";
import { Defaults, DEFAULTS } from "./lib/defaults";

const { params, query } = configure(DEFAULTS);

const wrap = (x: string) => `<span>${x}</span>`;

const insert = (xs: string[], separator: string) =>
  xs.join(`<i>${separator}</i>`);

const init = (res: Response | string) => {
  let text: string;
  let metadata: Partial<Defaults> = {};

  if (typeof res === "string") {
    text = res;
    metadata = params;
  } else {
    text = res.entity.body;
    metadata = {
      ...DEFAULTS,
      ...coerce(res.metadata, DEFAULTS),
      ...coerce(query),
    };
  }

  document.body.style.backgroundColor = metadata.background_color;
  document.body.style.color = metadata.color;
  document.body.style.fontFamily = metadata.font_family;
  document.body.style.fontSize = metadata.font_size;
  document.body.style.textAlign = metadata.text_align;

  if (!metadata.break) {
    text = text.replace(/ /g, NBSP);
  }

  const stage = document.getElementById("stage");
  const frames = generate(text, metadata.width).map(wrap);
  const separator = metadata.separator;

  stage.innerHTML = insert(frames, separator);

  const run = (limit: number) => {
    const fi = new FrameInterval(metadata.fps, () => {
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
