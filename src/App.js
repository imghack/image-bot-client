import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            logs: []
        };
    }

  componentDidMount() {
    const me = this;

      //eslint-disable-next-line
      var socket = io.connect('http://' + document.domain + ':' + '8080');
      socket.on('connect', () => {
          socket.emit('my event', {data: 'I\'m connected!'});
          console.log('connected');

          socket.on('message', (data) => {
              // console.log(data)
              // this.state.logs.push(data);

              this.setState({
                  logs: [...this.state.logs, data.users]
              })
              // var li = document.createElement('li');
              // li.innerText = JSON.stringify(data);
              // document.getElementById('log').appendChild(li)
          })
      });

    fetch("http://0.0.0.0:8080/api/images")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
       const { error, isLoaded, items, logs } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
            {logs.map(log => (
                <li>
                    {log}
                </li>
            ))}

          {items.map(item => (
              <li>
                  <img src={item.url.toString()}></img>
                  {JSON.stringify(item)}
              </li>
          ))}
        </ul>
      );
    }
  }
}

export default App;
