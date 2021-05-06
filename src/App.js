import React, {useState, Fragment} from 'react'
import './App.css'

const AppifyForm = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState(false);
  const [option, setOption] = useState('1');
  const [resData, setResData] = useState([]);
  const handleSubmit = (event) => {
      const payload = {
          firstName: name,
          gender: type,
          option
      }
      localStorage.setItem('data', JSON.stringify(payload))
      event.preventDefault();
  }
  const handleChange = ({target}) => {
      const {value} = target
      setName(value);
      if(value.length > 2) {
          fetch(`https://www.datamuse.com/api/sp:${value}&max=10`)
              .then(response => response.json())
              .then(data => setResData(data))
      }
  }
  const handleType = ({target}) => {
      setType(target.value)
  }
  const handleSelect = ({target}) => {
      setOption(target.value)
  }
  return (
      <Fragment>
          <form onSubmit={handleSubmit}>
              <label className='form-title'>Appify Form</label>
              <label className='label_text' style={{display: 'flex', margin: '0 5px'}}>
                  Name{" "}
                  <input type="text" value={name} onChange={handleChange} />
              </label>
              <label className='label_text'>
                  <input
                      type="radio"
                      name="Male"
                      value="M"
                      checked={type === "M"}
                      onChange={handleType}
                  />{" "}
                  Male
              </label>
              <label className='label_text'>
                  <input
                      type="radio"
                      name="Female"
                      value="F"
                      checked={type === "F"}
                      onChange={handleType}
                  />{" "}
                  Female
              </label>
              <select className='select_text' onChange={handleSelect}>
                  <option key='1' value="1">Option 1</option>
                  <option key='2' value="2">Option 2</option>
              </select>
              <button className='submit-button' type="submit">Submit</button>
          </form>
          <div className='list-records'>
              {resData && resData.length > 0 && resData.map(({word}) => <div className='records'>{word}</div>)}
          </div>
      </Fragment>

  );
}
export default AppifyForm
