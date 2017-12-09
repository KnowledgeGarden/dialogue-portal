import makeReducer from 'universal/redux/makeReducer';
import {resolvePromiseMap} from 'universal/utils/promises';
import AppContainer from 'universal/modules/app/containers/App/AppContainer';
import {setAppBar} from 'universal/modules/app/ducks/app';

// see https://github.com/reactjs/react-router/blob/master/docs/API.md
export default function (store) {
  const {dispatch} = store;
  const title = () => dispatch(setAppBar({title: 'Guilds', route: '/guilds/post', permission: 'ADMINISTRATOR'}));
  return {
    path: 'guilds',
    component: AppContainer,
    onEnter: title,
    onChange: title,
    getIndexRoute: async (location, cb) => {
      const promiseMap = setGuildImports();
      const importMap = await resolvePromiseMap(promiseMap);
      const {component, optimistic, ...asyncReducers} = getGuildImports(importMap);
      const newReducer = makeReducer(asyncReducers, optimistic);
      store.replaceReducer(newReducer);
      cb(null, {component});
    },
    childRoutes: [
      require('./post')(store)
    ]
  };
}

//TODO consider WeakMap to avoid memory leaks
function setGuildImports() {
  return new Map([
    ['component', System.import('universal/modules/guild/containers/GuildContainer')],
    ['optimistic', System.import('redux-optimistic-ui')],
    ['posts', System.import('universal/modules/guild/ducks/posts')],
    ['socket', System.import('redux-socket-cluster')]
  ]);
}

function getGuildImports(importMap) {
  return {
    component: importMap.get('component'),
    optimistic: importMap.get('optimistic').optimistic,
    posts: importMap.get('posts').reducer,
    socket: importMap.get('socket').socketClusterReducer
  };
}
