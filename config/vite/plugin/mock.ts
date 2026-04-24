/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild, // 演示模板默认保留生产 mock，便于直接打包展示
    // 开发环境无需关心
    // injectCode 只受prodEnabled影响
    // https://github.com/anncwb/vite-plugin-mock/issues/9
    // 下面这段代码会被注入 main.ts
    injectCode: `
       import { setupProdMockServer } from '../mock/_createProdMockServer';
 
       setupProdMockServer();
       `,
  });
}
