export default {
  files: ['./packages/**/*.test.ts', './apps/**/*.test.ts'],
  extensions: {
    ts: 'module'
  },
  nodeArguments: ['--loader=tsx', '--no-warnings']
}
