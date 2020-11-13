import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppBar, Button, List, ListItem, Paper, TextField, Toolbar, Typography, ListItemText, Checkbox, Tooltip } from '@material-ui/core';

class TodoList extends Component {
  render() {
    const todoEntries = this.props.entries;
    const createTask = item => {
      return (
        <Tooltip title={"Created at " + item.date}>
          <ListItem key={item.key}>
            <Checkbox checked={item.selected} onChange={e => this.props.editor({ kind: "toggleSelect", key: item.key })} />
            <ListItemText>{item.text}</ListItemText>
          </ListItem>
        </Tooltip>
      );
    };
    const listItems = todoEntries.map(createTask);
    return <List>{listItems}</List>;
  }
}

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      counter: 0,
      hole: props.hole,
      entries: props.entries,
    };
    this.editor = (cmd) => {
      console.log(this.state);
      if (cmd.kind === "setHole") {
        const { text } = cmd;
        this.setState({
          hole: text,
        });
        return;
      } else if (cmd.kind === "new") {
        this.setState({
          counter: this.state.counter + 1,
          entries: [...this.state.entries, {
            key: this.state.counter,
            text: this.state.hole,
            date: (new Date()).toLocaleString(),
            selected: false
          }]
        })
        return;
      } else if (cmd.kind === "toggleSelect") {
        const { key } = cmd;
        this.setState({
          entries: this.state.entries.map((e) => {
            if (e.key === key) {
              return Object.assign(e, { selected: !e.selected });
            } else {
              return e;
            }
          })
        })
        return;
      } else if (cmd.kind === "removeSelected") {
        this.setState({
          entries: this.state.entries.filter((e) => {
            return !e.selected;
          })
        });
        return;
      } else {
        return;
      }
    };
  }
  render() {
    return (
      <Paper>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6">
              Todo
            </Typography>
          </Toolbar>
        </AppBar>
        <TextField id="new-content" onChange={(e) => this.editor({ kind: "setHole", text: e.target.value })} />
        <Button variant="contained" color="primary" onClick={(e) => this.editor({ kind: "new" })}>Add</Button>
        <Button variant="contained" color="primary" onClick={(e) => this.editor({ kind: "removeSelected" })}>Delete Selected</Button>
        <TodoList entries={this.state.entries} editor={this.editor} />
      </Paper>
    );
  }
}

// ========================================

ReactDOM.render(
  <App hole="" entries={[]} />,
  document.getElementById('root')
);
