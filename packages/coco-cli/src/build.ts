/**
 * 构建.coco文件夹
 */
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import Paths from './paths';
import { scan } from './scanner';
import * as process from 'node:process';

export default function build(projectPath: string) {
  const appTsFile = 'application.ts';
  const appFilePath = path.join(process.cwd(), projectPath, `src/${appTsFile}`);
  if (!fs.existsSync(appFilePath)) {
    throw new Error(`${projectPath}下没有${appTsFile}文件，忘记添加了？`);
  }
  clean(projectPath);
  const cwd = path.join(projectPath);
  const paths = new Paths(cwd);
  // 1. 扫描所有ioc组件
  const iocComponents = scan(paths);
  // 2. 生成.coco文件
  const importStatements = iocComponents.map(({ className, filePath }) => {
    const relative = path.relative(
      path.join(projectPath, 'src/.coco'),
      filePath
    );
    return `export { default as ${className} } from '${relative}';`;
  });
  fse.ensureDirSync(paths.dotCocoFolder);
  fs.writeFileSync(
    path.join(paths.dotCocoFolder, 'index.ts'),
    appendExport(importStatements),
    { encoding: 'utf-8' }
  );
}

function appendExport(importStatements: string[]) {
  const pre = ``;

  const append = `
import { ApplicationContext } from "coco-mvc";
export { ApplicationContext };
  `;
  return pre.concat(importStatements.join('\n')).concat(append);
}

export function clean(projectPath: string) {
  const cocoFolder = path.join(projectPath, 'src/.coco');
  if (fs.existsSync(cocoFolder)) {
    fs.rmSync(cocoFolder, { recursive: true });
  }
}
