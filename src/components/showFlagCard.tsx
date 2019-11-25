import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default class ShowFlagCard extends React.Component<any,any> {
  constructor(props:any) {
    super(props);

    this.deleteCard = this.deleteCard.bind(this)

    this.state = { countryData: [],search:"", loading:"true" };
  }

  componentDidMount() {
    axios.get('https://flag-card.herokuapp.com/country/')
      .then(response => {
        this.setState({ countryData: response.data, loading:"false" })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onSearch = (e) => {
    this.setState({ search: e.target.value })
  }

  deleteCard(id:any) {
    axios.delete('https://flag-card.herokuapp.com/country/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      countryData: this.state.countryData.filter(el => el._id !== id)
    })
  }

  render() {

    return (
      this.state.loading==="true" ? 
      <Loader
      type="Puff"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
   />
      :
      <div>
        <div className="row mb-3">
          <div className="col-3 offset-5">
          <input type="text" placeholder="Search" onChange={this.onSearch} />
          </div>
        </div>
        
        <div className="row">

          {this.state.countryData.map((currentValue:any, i:any) => {
            const {search} = this.state;
            if (search !== '' && currentValue.countryname.toLowerCase().indexOf(search) === -1) {
              return null;
            }

            return (
              <div className="col-md-4" key={i}>
                <div className="card mb-3" key={i}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={`https://www.countryflags.io/${currentValue.countrycode.toLowerCase()}/shiny/64.png`} className="card-img" alt="co" />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{currentValue.countryname}</h5>
                        <p className="card-text">{currentValue.description}</p>
                        <p className="card-text"><small className="text-muted">{new Date(currentValue.date).toLocaleDateString()}</small></p>
                        <a className="card-link"><Link to={"/edit/" + currentValue._id}>Edit</Link></a><a href="#" className="card-link" onClick={() => { this.deleteCard(currentValue._id) }}>Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}