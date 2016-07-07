import R from 'ramda';
import decode from './decode';

const NBSP = decode('&nbsp;');

const generate = (text, width) => {
  if (text.length < width) {
    console.error(`Max 'width' is ${text.length}`);
    width = text.length;
    console.log(`Set 'width' to: ${text.length}`);
  }

  const padding = R.times((() => NBSP), width - 1).join('');
  const x = `${padding}${text}${padding}`;
  const xs = R.aperture(width, R.split('', x)).map(R.join(''));

  return xs;
};

generate.step = xs => {
  xs.push(xs.shift());
  return xs;
};

export default generate;
