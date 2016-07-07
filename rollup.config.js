import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  plugins: [
    nodeResolve({
      jsnext: true,
      main: true
    }),

    commonjs(),

    babel({
      exclude: 'node_modules/**',
    }),
  ],
  dest: 'build/index.js',
};
