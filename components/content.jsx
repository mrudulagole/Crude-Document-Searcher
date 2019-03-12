//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Content extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   *  name:Name of document to be displayed.
   */
  constructor(props) {
    super(props);
    this.state = { name : ""}
    //@TODO
  }

  //@TODO
  async componentDidMount(){
  
    if(this.props.name){
      const n = this.props.name;
      let content = await this.props.app.ws.getContent(this.props.name);
      this.setState({name:n, content: content.content })
      }
  }

  async componentDidUpdate(prevProps){
    if(prevProps.name !== this.props.name){
      if(this.state){
        const n = this.props.name;
        let content = await this.props.app.ws.getContent(this.props.name);
        this.setState({name:n, content: content.content })
      } 
    }
  }

  render() {
    //@TODO
      return(

        <section>
          <h1>{this.state?this.state.name:""}</h1><pre>{this.state?this.state.content:""}</pre>
        </section>
      );
  }
}
module.exports = Content;