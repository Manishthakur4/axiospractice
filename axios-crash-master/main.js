// Axios global
axios.defaults.headers.common['X-auth-token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
  // console.log('GET Request');
  // axios({
  //   method:'get',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   params:{
  //     _limit:10,
  //   }
  // })
  //   .then(res => showOutput(res))
  //   .then(err => console.error(err));

  axios
    .get('https://jsonplaceholder.typicode.com/todos')
    .then(res => showOutput(res))
    .then(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  // console.log('POST Request');
  axios
    .post('https://jsonplaceholder.typicode.com/todos', {
      title: 'New Todo',
      completed: false,
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  // console.log('PUT/PATCH Request');
  const todoId = 1;

  axios
    .put(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      title: 'Updated Todo',
      completed: true,
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));

  axios
    .patch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      completed: true,
    })
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// DELETE REQUEST
function removeTodo() {
  // console.log('DELETE Request');
  const todoId = 1;

  axios
    .delete(`https://jsonplaceholder.typicode.com/todos/${todoId}`)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  // console.log('Simultaneous Request');
  axios
    .all([
      axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
      axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5'),
    ])
    .then(axios.spread((todos, posts) => {
      showOutput(todos);
      showOutput(posts);
    }))
    .catch(err => console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
  // console.log('Custom Headers');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
    },
  };

  axios
    .get('https://jsonplaceholder.typicode.com/todos', config)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // console.log('Transform Response');
  const options = {
    transformRequest: (data, headers) => {
      return data;
    },
    transformResponse: (data) => {
      return JSON.parse(data);
    },
  };

  axios
    .get('https://jsonplaceholder.typicode.com/todos', options)
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}

// ERROR HANDLING
function errorHandling() {
  // console.log('Error Handling');
  axios
    .get('https://jsonplaceholder.typicode.com/todoss')
    .then(res => showOutput(res))
    .catch(err => {
      if (err.response) {
        console.error(`Status: ${err.response.status}`);
        console.error(`Data: ${JSON.stringify(err.response.data)}`);
      } else if (err.request) {
        console.error(`No response received`);
      } else {
        console.error(`Error: ${err.message}`);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  // console.log('Cancel Token');
  const source = axios.CancelToken.source();

  axios
    .get('https://jsonplaceholder.typicode.com/todos', {
      cancelToken: source.token,
    })
    .then(res => showOutput(res))
    .catch(err => {
      if (axios.isCancel(err)) {
        console.error('Request canceled:', err.message);
      } else {
        console.error(`Error: ${err.message}`);
      }
    });

  setTimeout(() => {
    source.cancel('Request canceled by user');
  }, 2000);
}

// INTERCEPTING REQUESTS & RESPONSES

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  });

  axiosInstance.get('/comments').then(res => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
