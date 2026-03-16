import * as esbuild from 'esbuild';
import { rimraf } from 'rimraf';
import stylePlugin from 'esbuild-style-plugin';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import { cpSync, existsSync } from 'fs';

const args = process.argv.slice(2);
const isProd = args[0] === '--production';

await rimraf('dist');

/**
 * @type {esbuild.BuildOptions}
 */
const esbuildOpts = {
  color: true,
  entryPoints: ['src/main.tsx', 'index.html'],
  outdir: 'dist',
  entryNames: '[name]',
  write: true,
  bundle: true,
  format: 'iife',
  sourcemap: isProd ? false : 'linked',
  minify: isProd,
  treeShaking: true,
  jsx: 'automatic',
  loader: {
    '.html': 'copy',
    '.png': 'file',
  },
  plugins: [
    stylePlugin({
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    }),
  ],
};

if (isProd) {
  await esbuild.build(esbuildOpts);
  // Copy public/ static files (robots.txt, sitemap.xml) to dist/
  if (existsSync('public')) {
    cpSync('public', 'dist', { recursive: true });
  }
} else {
  const ctx = await esbuild.context(esbuildOpts);
  await ctx.watch();
  const { hosts, port } = await ctx.serve();
  console.log(`Running on:`);
  hosts.forEach((host) => {
    console.log(`http://${host}:${port}`);
  });
}
