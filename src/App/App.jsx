import React, { Component } from 'react'
import Card, { CardContent, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';

export class App extends Component {
  constructor() {
    super() 

    this.state = {
      todos: vault.get('todos') || [],
      todoName: null,
      todoDesc: null,
    }
  }

  handleNimiChange(e) {
    this.setState({ todoName: e.target.value })
  }

  handleDescChange(e) {
    this.setState({ todoDesc: e.target.value })
  }

  handleNewTodo() {
    const { todoName, todoDesc } = this.state
    const todos = this.state.todos

    if(todoName.length > 50) return swal('Error 🔥🚓🚒', 'Ei liikaa kirjaimia', 'error')
    if(!todoName) return swal('Error 🔥🚓🚒', 'Keksi nimi', 'error')
    if(!todoDesc) {
      let todoDesc = ''
    }
    
    let newTodoName = todoName + ' 🚀'
    if(todoName.toLowerCase().includes('koodaa')) {
      newTodoName = newTodoName + ' 🎉'
      todos.push({ nimi: newTodoName, desc: todoDesc, valmis: false })
    } else if(todoName.toLowerCase().includes('bug')) {
      newTodoName= newTodoName + ' 🐛'
      todos.push({ nimi: newTodoName, desc: todoDesc, valmis: false })
    } else if(todoName.toLowerCase().includes('error')) {
      newTodoName = newTodoName + ' 🚨'
      todos.push({ nimi: newTodoName, desc: todoDesc, valmis: false })
    } else {
      todos.push({ nimi: newTodoName, desc: todoDesc, valmis: false })
    }

    this.setState({
      todos: todos
    })
    vault.set('todos', this.state.todos)
  }

  removeTodo(nimi) {
    const todos = this.state.todos
    todos.forEach((todo, index) => {
      if(todo.nimi == nimi) {
        todos.splice(index, 1);
        this.setState({
          todos
        })
        vault.set('todos', this.state.todos)
        }
    })
  }

  valmisTodo(nimi) {
    const todos = this.state.todos

    todos.forEach((todo, index) => {
      if(todo.nimi == nimi) {
        todos[index].valmis = true
        this.setState({
          todos
        })
        vault.set('todos', this.state.todos)
      }
    })
  }

  removeValmisTodo(nimi) {
    const todos = this.state.todos

    todos.forEach((todo, index) => {
      if(todo.nimi == nimi) {
        todos[index].valmis = false
        this.setState({
          todos
        })
        vault.set('todos', this.state.todos)
      }
    })
  }

  render() {
    let { todos } = this.state

    let todoList = todos.map(todo => {
      if(todo.valmis) {
        return (
          <ExpansionPanel style={{marginRight: "10px", marginLeft: "10px", backgroundColor: '#2ecc71'}} key={todo.desc}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{todo.nimi}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {todo.desc}
              </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={() => this.removeValmisTodo(todo.nimi)}>
                Ei Valmis
              </Button>
              <Button onClick={() => this.removeTodo(todo.nimi)}>
                Poista
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        )
      } else {
        return (
          <ExpansionPanel style={{marginRight: "10px", marginLeft: "10px"}} key={todo.desc}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{todo.nimi}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                {todo.desc}
              </Typography>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={() => this.valmisTodo(todo.nimi)}>
                Valmis
              </Button>
              <Button onClick={() => this.removeTodo(todo.nimi)}>
                Poista
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        )
      }
    })
    return (
      <div>
        <Card style={{margin: "10px"}} >
          <CardContent>
            <TextField
              id="name"
              label="Todo Nimi"
              margin="normal"
              onChange={this.handleNimiChange.bind(this)}
            />

            <TextField
              id="name"
              label="Todo Desc"
              margin="normal"
              style={{marginLeft: "10px"}}
              onChange={this.handleDescChange.bind(this)}
            />
            <Button variant='raised' style={{marginLeft: "10px"}} onClick={this.handleNewTodo.bind(this)}>Luo Uusi</Button>
          </CardContent>
        </Card>

        {todoList}

      </div>
    )
  }
}