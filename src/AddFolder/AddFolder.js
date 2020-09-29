import React from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import '../index.css';


class AddFolder extends React.Component {
  
  constructor(props) {
    super(props);
    this.state ={
      folder:'',
      content:''
    }
  }





  static contextType = ApiContext
  

  handleClickAddFolder = (name) => {
    let newItem = JSON.stringify({
      folder: name,
    })
    let error;

    if(name.length >= 3 && typeof name === typeof ''){
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: newItem
    }).then(res => {
      if (!res.ok){
        error = { code: res.status };
      }
      return res.json();
    })
    .then(folder => {
      if (error) {
        error.message = folder.message;
        return Promise.reject(error);
      }
      this.context.addFolder(folder)
      this.props.history.push(`/`)
    })
    .catch(error => {
      console.error({error});
    });
  } else {
    alert('please use more than 3 characters for name')
  }
    
  }
  getValue = (val) => {
    this.setState({
      folder:val
    })
  }



  render() {
    //console.log(this.handleClickAddFolder('hi'))
    return (
      <div>

        <form>
          <label
            htmlFor='new-folder'
          >New Folder Name:</label>
          <input
            id='new-Folder'
            onChange={(e) => this.getValue(e.target.value)}
          >

          </input>
          <button
            className='Add Folder'
            type='button'
            onClick={(e) => this.handleClickAddFolder(`${this.state.folder}`)}
          >
            Add New Folder!
      </button>
        </form>

      </div>
    )
  }


}




export default AddFolder
