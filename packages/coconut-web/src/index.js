export * from './ReactDomComponent.js'
export * from './ReactDomHostConfig.js'
import {flushSync, updateContainer, createContainer} from 'coconut-reconciler';

function legacyCreateRootFromDOMContainer(container, children) {
  const root = createContainer(container)
  container._reactRootContainer = root;
  flushSync(() => {
    updateContainer(children, root, null, null);
  })
  return root;
}

function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  callback,
) {
  const maybeRoot = container._reactRootContainer;
  let root;
  if (!maybeRoot) {
    root = legacyCreateRootFromDOMContainer(container, children);
  } else {
    root = maybeRoot;
    flushSync(() => {
      updateContainer(children, root, parentComponent, callback);
    })
  }
}

export function render(element, container) {
  return legacyRenderSubtreeIntoContainer(null, element, container, null);
}
