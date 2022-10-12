import { Property } from '../../../App';
import './styles.scss';


const PropertyBlock = ({image, address, cost, description}: Property): JSX.Element => {

    return (
        <div className='sd-property-block'>
        <img src={image} className='sd-property-block-image'/>
        <div className='sd-property-block-content'> 
            <div className='sd-property-content-line sd-property-block-content-address'>
                {address}
            </div>
            <div className='sd-property-content-line sd-property-block-content-cost'>
                {cost}
            </div>
            <div  className='sd-property-content-line sd-property-block-content-description'>
                {description}
            </div>
        </div>
    </div>
    )
};
  
export default PropertyBlock;