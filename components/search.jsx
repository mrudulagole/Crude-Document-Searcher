//-*- mode: rjsx-mode;

'use strict';

const React = require('react');

class Search extends React.Component {

  /** called with properties:
   *  app: An instance of the overall app.  Note that props.app.ws
   *       will return an instance of the web services wrapper and
   *       props.app.setContentName(name) will set name of document
   *       in content tab to name and switch to content tab.
   */
  constructor(props) {
    super(props);
    //@TODO
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.doContent = this.doContent.bind(this);
    this.state = { values : "",hasResults : "blank"}; 
    this.state.searchResults=[];
    this.state.searchWord="";
    this.state.resultArray=[];
    this.state.test = ["TEST","TEST1","TEST2"];

  }

  //@TODO

  //must have an onChange event for controlled components so that
  //value in state always reflects current user input.
  onChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value || '';
    const values = Object.assign({}, this.state.values, { [name]: value });
    this.setState({values: values});
  }

  //handler function to handle the input from the form(submitted using "Enter" key)
  async handleSubmit(event){  
    event.preventDefault();
    //event.stopPropagation();
    const target = event.target;
    this.state.searchWord = this.state.values.q;
    const s = new RegExp('^\\s*$');

    //if the search word is an empty string or all white-spaces, return
    if(!this.state.searchWord || s.test(this.state.searchWord)){
      this.setState({hasResults:"blank", searchResults:[]})
      return;
    }
    try {      
      //Call the web-service wrapper fns to get the results
      const r = await this.props.app.ws.searchDocs(this.state.values.q, 0);
      this.state.searchResults = r;
      const hr = (this.state.searchResults.results.length===0)?"false":"true";
      this.setState({hasResults: hr})
    }
    catch(err){
      this.setState({hasResults: "false"})
      const msg = (err.message) ? err.message : 'web service error';
    }
  }

  //handler function for onBlur (clicked out of the search-box)
  async onBlur(event){
    const target = event.target;
    this.state.searchWord = target.value;
    const s = new RegExp('^\\s*$');
    if(!target.value || s.test(target.value)){
      this.setState({hasResults:"blank", searchResults:[]})
      return;
    }
    try {
      this.state.searchResults = await this.props.app.ws.searchDocs(target.value, 0);
      const hr = (this.state.searchResults.results.length===0)?"false":"true";
      this.setState({hasResults: hr})
    }
    catch(err){
      this.setState({hasResults: "false"})
      const msg = (err.message) ? err.message : 'web service error';
    }
  }

  //function sets-up the content tab to the document clicked on
  doContent(event){
    event.preventDefault();
    this.props.app.setContentName(event.target.getAttribute('href'));
  }

  //auxiliary function to parse the results(for rendering the result headings and lines properly)
  generateResults(){
    let resultArray = this.state.searchResults.results;
    const sw = this.state.searchWord;

    resultArray = resultArray.map(e=> ({name: e.name, line: Array.from(e.lines[0].split(" "))}));

    this.state.resultArray = resultArray.map((ele)=><React.Fragment><a className="result-name" href={ele.name}
      onClick={this.doContent}>{ele.name}</a><br />
      <p>
        {ele.line.map(e=>e.toLocaleLowerCase('en-US').includes(sw)?(<span className="search-term">
        {e + " "}</span>):(<React.Fragment>{e + " "}</React.Fragment>))} 
      </p>
    </React.Fragment>);
  
  }

  //auxiliary function to generate the error message to be displayed
  getErrorMsg(){
    return ("No results for "+this.state.searchWord);
  }
    render() {
    //@TODO
    return (
    <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <label>
          <span className="label">Search Terms:</span>
          <span className="control">
            <input id="q" name ="q" onBlur={this.onBlur} onChange={this.onChange} /><br />
          </span>
        </label>
      </form>
      
      <div>{this.state.hasResults==="true" ? this.generateResults() : ""}</div>
      
      <div>{(this.state.hasResults==="true")?
        this.state.resultArray.map((ele,i) => (<div className="result" key={i}>
           {ele} 
        </div>)):
        ""}
      </div>


      <span className="error">{(this.state.hasResults === "false")?this.getErrorMsg():""}</span>
    </React.Fragment>
    );
  }
}

module.exports = Search;