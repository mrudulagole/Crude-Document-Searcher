//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Add extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
    //@TODO
  }

  //@TODO add code

  //Note that a you can get information on the file being uploaded by
  //hooking the change event on <input type="file">.  It will have
  //event.target.files[0] set to an object containing information
  //corresponding to the uploaded file.  You can get the contents
  //of the file by calling the provided readFile() function passing
  //this object as the argument.

  //handler for uploading the selected document
  async handleUpload(event){
    event.preventDefault();
    event.stopPropagation();
    const target = event.target.files[0];
    const name = target.name.replace('.txt','')
    
    //Calling the web-service through the wrapper function
    await this.props.app.ws.addContent(name, await readFile(target));
    this.props.app.setContentName(name)
  }

  render() {
    //@TODO
    return (
       <form onSubmit={this.handleUpload}>
        <label className="label"> Choose File:  
          <input className="control" type="file" onChange={this.handleUpload} />
        </label>
      </form>
    );
  }
}

module.exports = Add;

/** Return contents of file (of type File) read from user's computer.
 *  The file argument is a file object corresponding to a <input
 *  type="file"/>
 */
async function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>  resolve(reader.result);
    reader.readAsText(file);
  });
}
