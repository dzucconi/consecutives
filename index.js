import R from 'ramda';

import get from './lib/get';
import qs from './lib/qs';
import defaults from './lib/defaults';
import decode from './lib/decode';
import generate from './lib/generate';
import coerce from './lib/coerce';
import trim from './lib/trim';
import draw from './lib/draw';

const options = R.mergeAll([{},
  defaults,
  qs.parse(location.search)
]);

const wrap = x =>
  `<span>${x}</span>`;

const insert = (xs, separator) =>
  xs.join(`<i>${separator}</i>`);

document.body.style.backgroundColor = options.background_color;
document.body.style.color = options.color;
document.body.style.fontFamily = options.font_family;
document.body.style.fontSize = options.font_size;
document.body.style.textAlign = options.text_align;

get(options.id)
  .then(body => {
    let text = body;

    if (!coerce.boolean(options.break)) {
      text = text.replace(/ /g, decode('&nbsp;'));
    }

    const stage = document.getElementById('stage');
    const frames = generate(text, coerce.integer(options.width)).map(wrap);
    const separator = coerce.string(options.separator);

    stage.innerHTML = insert(frames, separator);

    const run = limit => draw(options.fps, () =>
      stage.innerHTML = insert(R.take(limit, generate.step(frames)), separator)
    );

    trim(stage, limit => run(limit)());
  });
