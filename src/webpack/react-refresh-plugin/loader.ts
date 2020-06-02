import { loader } from 'webpack';
import { ReactRefreshModule } from './ReactRefreshModule';

let refreshModuleRuntime = ReactRefreshModule.toString();
// trim 'function ReactRefreshModule() {' and '}'
refreshModuleRuntime = refreshModuleRuntime.slice(
  refreshModuleRuntime.indexOf('{') + 1,
  refreshModuleRuntime.lastIndexOf('}')
);

const ReactRefreshLoader: loader.Loader = function ReactRefreshLoader(
  source,
  inputSourceMap
) {
  this.callback(null, `${source}\n\n${refreshModuleRuntime}`, inputSourceMap);
};

export default ReactRefreshLoader;
