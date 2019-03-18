import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default [
	{
		input: 'scripts/main.js',
		output: {
			file: 'build/rollup-bundle.js',
			format: 'umd'
		},
		plugins: [
			resolve(), 
            commonjs(),
            babel()
		]
	}
];