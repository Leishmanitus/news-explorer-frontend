import './NewsCard.css';
import tempCard from '../../../../assets/temp-card.png';
import bookMark from '../../../../assets/bookmark.svg';

function NewsCard() {
    return (
        <div className='card'>
            <img className='card__img' src={tempCard} alt='Not found' />
            <div className='card__bookmark-group'>
                <span className='card__bookmark-img' />
            </div>
            <div className='card__info'>
                <p className='card__date'>November 4, 2024</p>
                <h3 className='card__title'>Everyone Needs a Special 'Sit Spot' in Nature</h3>
                <p className='card__description'>
                    Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" 
                    in the woods has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults 
                    and children to find while out in the woods on a hike. 
                </p>
                <p className='card__source'>TREEHUGGER</p>
            </div>
        </div>
    )
}

export default NewsCard;
