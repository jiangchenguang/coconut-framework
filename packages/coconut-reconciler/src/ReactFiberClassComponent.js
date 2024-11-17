import {createUpdate, enqueueUpdate, initializeUpdateQueue, processUpdateQueue} from "./ReactFiberClassUpdateQueue";
import {get, NAME} from "shared";
import {flushSyncCallbacks} from "./ReactFiberSyncTaskQueue";
import {getFields, getBean} from "coco-ioc-container";
import {Reactive} from "coco-mvc-decorator/reactive";

const classComponentUpdater = {
  enqueueSetState(inst, field, payload, callback) {
    const fiber = inst._reactInternals; // const fiber = getInstance(inst)

    const update = createUpdate(field);
    update.payload = payload;
    const root = enqueueUpdate(fiber, update);
    if (root !== null) {
      const scheduleUpdateOnFiber = get(NAME.scheduleUpdateOnFiber);
      if (scheduleUpdateOnFiber) {
        scheduleUpdateOnFiber(root, fiber);
      }
    }
    // todo 这里先用同步刷新，后面再添加调度器
    flushSyncCallbacks();
  }
}

function adoptClassInstance(workInProgress, instance) {
  instance.updater = classComponentUpdater;
  workInProgress.stateNode = instance;
  instance._reactInternals = workInProgress; // setInstance(instance, workInProgress);
}

function constructClassInstance(workInProgress, ctor, props) {
  const instance = getBean(ctor);
  const fields = getFields(ctor, Reactive);
  workInProgress.memoizedState = fields.reduce((prev, field) => {
    prev[field] = instance[field];
    return prev;
  }, {})
  adoptClassInstance(workInProgress, instance);

  return instance;
}

function mountClassInstance(
  workInProgress,
  ctor,
  newProps
) {
  const instance = workInProgress.stateNode;
  instance.props = newProps;

  initializeUpdateQueue(workInProgress)
}

function updateClassInstance(
  current,
  workInProgress,
  ctor,
  newProps
) {
  const instance = workInProgress.stateNode;
  const oldState = workInProgress.memoizedState;
  let newState = oldState
  processUpdateQueue(workInProgress, newProps, instance);
  newState = workInProgress.memoizedState;

  for (const field of getFields(ctor, Reactive)) {
    instance[field] = newState[field]
  }

  return true;
}

export {
  classComponentUpdater,
  constructClassInstance,
  mountClassInstance,
  updateClassInstance
}