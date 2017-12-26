import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as actions from '../../actions';
import ProjectDetailForm from '../../components/ProjectDetailForm';
import bindAll from 'lodash/bindAll'

// import './style.css';

class Projects extends React.Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  constructor(props){
    super(props);

    bindAll(this,['handleSubmitSelectedProject','handleCloseSelectedProject','handleNewProject','handleRemoveSelectedProject'])
  }

  componentDidMount(){
    this.props.getAllProjects();
  }

  handleClickProject(code){
    console.log('handleClickProject:',code);
    this.props.getProjectByCode(code);
  }

  handleSubmitSelectedProject(selectedProject){
    this.props.saveAndReload(selectedProject);
  }

  handleCloseSelectedProject(){
    this.props.setSelectedProject({});
  }
  handleNewProject(){
    this.props.setSelectedProject({code:'', name:'', isNew:true});
  }
  handleRemoveSelectedProject(){
    console.log(this.props.selectedProject);
    this.props.removeAndReload(this.props.selectedProject.code);
  }

  renderSelectedProject(selectedProject){

    if(selectedProject.isFetchingLoad) {
      return (
        <h3>loading...</h3>
      )
    }
    if(selectedProject.isFetchingPost) {
      return (
        <h3>posting...</h3>
      )
    }
    if(selectedProject && (selectedProject.code || selectedProject.isNew)) {
      return (
        <ProjectDetailForm
          project={selectedProject}
          onSubmit={this.handleSubmitSelectedProject}
          onClose={this.handleCloseSelectedProject}
          onDelete={this.handleRemoveSelectedProject}
        />
      )
    }else{
      return <h3>Click on a project name to view details.</h3>
    }
  }

  render() {

    const { projects, selectedProject } = this.props;
    return (
      <div>
        <div>
          {projects.isFetching ?
            <h3>loading...</h3>
            :
            projects.all.map((p)=>{return (<div style={{cursor:'pointer'}} key={p._id}><h1 onClick={()=>{this.handleClickProject(p.code)}}>{p.name}</h1></div>)})}
          {}
          <button onClick={this.handleNewProject}>New Project</button>
        </div>
        <hr />
        <div>
          {this.renderSelectedProject(selectedProject)}
        </div>
      </div>
    );
  }
}

function mapStateToProps({projects, selectedProject}) {
  return {projects, selectedProject}
}
function mapDispatchToProps(dispatch){
  return bindActionCreators(actions ,dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
