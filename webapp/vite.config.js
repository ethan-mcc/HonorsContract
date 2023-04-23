import { sveltekit } from '@sveltejs/kit/vite';
import svg from '@poppanator/sveltekit-svg';
import inject from "@rollup/plugin-inject";
import NodeGlobalsPolyfillPlugin from "@esbuild-plugins/node-globals-polyfill";
import NodeModulesPolyfillPlugin from "@esbuild-plugins/node-modules-polyfill";

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		sveltekit()
	],
	ssr: {
		noExternal: ['three', 'os', 'util', 'http', 'https', 'zlib'],
	},
	test: {
		include: ['src/**/*.{about,spec}.{js,ts}']
	},
	build: {
		target: 'es2020',
		rollupOptions: {
			// Polyfill Buffer for production build
			plugins: [
				inject({
					modules: { Buffer: ['buffer', 'Buffer'] }
				})
			]
		}
	},
	optimizeDeps: {
		esbuildOptions: {
			// Node.js global to browser globalThis
			define: {
				global: 'globalThis'
			},
			// Enable esbuild polyfill plugins
			plugins: [NodeGlobalsPolyfillPlugin, NodeModulesPolyfillPlugin]
		}
	}
};

export default config;
