import React from 'react';

require('./home.component.scss');

var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}

export default class Home extends React.Component {
  constructor() {
    super();
  }
  render () {
    return (
      <div>
        HOME
      </div>
    );
  }
}
