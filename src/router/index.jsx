import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import routerConfig from '@/config/router.config';

const RouteWithSubRoutes = (route) => {
  if (route.render) {
    return (
      <Route
        key={route.path}
        path={route.path}
        exact={route.exact}
        render={route.render}
      />
    );
  }
  return (
    <Route
      key={route.path}
      path={route.path}
      exact={route.exact}
      render={() => {
        const childrenRoutes = (
          <Switch>
            {route.routes && route.routes.map(k => <RouteWithSubRoutes key={k.path} {...k} />)}
          </Switch>
        );
        if (route.redirect) {
          // 跳转
          return <Redirect to={route.redirect} />;
        }
        if (route.component) {
          // 路由有layout组件
          return (
            <route.component authority={route.authority || []}>
              {childrenRoutes}
            </route.component>
          );
        }
        // 路由没有layout组件
        return childrenRoutes;
      }}
    />
  );
};

const createRoutes = (config = []) => config.map(v => RouteWithSubRoutes(v));

function AppRouter() {
  return (
    <Router>
      <Switch>
        {createRoutes(routerConfig)}
      </Switch>
    </Router>
  );
}

export default AppRouter;
