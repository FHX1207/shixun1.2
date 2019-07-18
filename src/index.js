import dva from 'dva';
import './index.css';
import 'antd/dist/antd.css';
import {message} from 'antd';
import createLoading from 'dva-loading';
// import {createLogger} from 'redux-logger';

// 1. Initialize

const app = dva(createLoading());

// 2. Plugins
app.use({
    // onActions:createLogger(),
    onError:(e)=>{
        message.error(e.message);
    }
})

// 3. Model
 app.model(require('./models/login').default);
 app.model(require('./models/exam').default);
 app.model(require('./models/addText').default);
 app.model(require('./models/addExam').default);
 app.model(require('./models/paper').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');





