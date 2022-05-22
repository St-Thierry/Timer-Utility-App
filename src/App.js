
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class TimersDashboard extends React.Component {

  state = {
        timers: [
          {
            title: 'Practice Squat',
            project: 'Gym Chores',
            id: "ereet",
            elapsed: 5456099,
            runningSince: Date.now(),
          },
          {
            title: 'Bake Squash',
            project: 'Kithen Chores',
            id: "erree",
            elapsed:  1273998,
            runningSince: null,
          }
        ]
      };

  render(){
    return(
        <div className = 'ui three column centered grid'>
          <div className = 'column'>
            <EditableTimerList 
              timers = {this.state.timers}
            />
            <ToggleableTimerForm
              isOpen={true}
            />
          </div>
        </div>
    );
  }
}

class EditableTimerList extends Component {
  render() {
      const timers = this.props.timers.map((timer) => (
      <EditableTimer
          key = {timer.id}
          id = {timer.id}
          title= {timer.title}
          project= {timer.project}
          elapsed= {timer.elapsed}
          runningSince= {timer.runningSince}
          editFormOpen={false}
      />
      ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component {

  state = {
    editFormOpen: false,
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id = {this.props.id}
          title={this.props.title}
          project={this.props.project}
        />
      );
    } else {
      return (
        <Timer
          id = {this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      );
    }
  }
}

class TimerForm extends React.Component {

  state = {
    title: this.props.title || '',
    project: this.props.project || '',
  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value})
  }


  handleProjectChange = (e) => {
    this.setState({ project: e.target.value})
  }

  render() {
    const submitText = this.props.title ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label> Title </label>
              <input 
                type='text' 
                value = {this.state.title} 
                onChange = {this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label> Title </label>
              <input 
                type='text' 
                value = {this.props.project} 
                onChange = {this.handleProjectChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button'>
               {submitText}
              </button>
              <button className='ui basic red button'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class ToggleableTimerForm extends React.Component {

  handleFormOpen = () => {
    this.setState({isOpen: true});
  }

  state = {
    isOpen: false,
  };


  constructor(props) {
    super(props);

    this.handleFormOpen = this.handleFormOpen.bind(this);
  }

  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      return (
        <div className = 'ui basic content center aligned segment'>
          <button className = 'ui basic button icon' onClick = {this.handleFormOpen} >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {
  render() {

    return (
      <div className = 'ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {this.props.elapsed}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
}

export default TimersDashboard;

ReactDOM.render(
  <TimersDashboard />,

  document.getElementById('content')
);