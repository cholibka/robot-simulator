import './components.css';
import marty from '../images/marty.png'
function Canvas() {
    return (
    <div className={'left-div'}>
        <img id="image" src={marty} style={{height: "80px",  display: "block", margin: "30% auto auto"}} alt="robot marty" />
    </div>
    );
}

export default Canvas;
