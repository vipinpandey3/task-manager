import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Tasks from './Pages/Tasks';
import CreateTask from './Pages/CreateTask'
import CreateUser from './Pages/CreateUser';
import Users from './Pages/Users'
import Layout from './Components/Layout/Layout';
import { TaskContextProvider } from './context/task-context';
import AssignedTask from './Pages/AssignedTask';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {/* <RedirectPropsz to="/login" /> */}
          <Login />
        </Route>
        <Route path="/tasks" exact>
          <Tasks />
        </Route>
        <Route path="/createTask">
          <CreateTask />
        </Route>
        <Route path="/users">
            <Users />
        </Route>
        <Route path="/createUser">
          <CreateUser />
        </Route>
        <Route path="/assigned-task">
          <AssignedTask />
        </Route>
        <Route path="*">
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
