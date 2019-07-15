import React from 'react';
import { Router, Route, Switch} from 'dva/router';
import IndexPage from './pages/IndexPage';
import LoginPage from "./pages/login/IndexPage";
import ExamPage from "./pages/index/exam/examPage"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/exam" component={ExamPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
