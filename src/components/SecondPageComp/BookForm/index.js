import './style.css';
import Body from '../Body';

const BookForm = (props) => {

      return (
      <>
      <div id='book'>
            <div className='input-group-sm mb-1 d-flex'>
                <p className='textBook'>Weight (KG)</p>
                <input type='text' name="weight" onChange={props.func} value={props.weight} class='form-control inputDVD' aria-label='size' aria-describedby='inputGroup-sizing-sm'/>
                <div className="serror">{props.statW}</div>
            </div>
            <h6 className='textDescription'>Please provide ther weight only in kilograms</h6>
         </div>
      </>
      
    );
  };

export default BookForm;