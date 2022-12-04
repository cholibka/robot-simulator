import './components.css';
import janek from '../images/janek.png'
function Canvas() {
    return (
    <div className={'left-div'}>
        <img id="image" src={janek} style={{height: "150px",  display: "block", margin: "30% auto auto"}} alt="robot janek" />
    </div>
    );
}

export default Canvas;
