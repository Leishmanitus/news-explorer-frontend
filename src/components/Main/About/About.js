import './About.css';
import authorPic from '../../../images/author.jpg';

function About() {
    return (
        <div className='about'>
            <img className='about__img' src={authorPic} alt='Caucasian man with a patriotic cap' />
            <div className='about__info'>
                <h2 className='about__title'>About the author</h2>
                <p className='about__description'>
                    &nbsp;&nbsp;Hi, welcome to my site! My name is Tyler Leishman and I'm a full stack web developer. I've been studying 
                    software engineering at the TripleTen coding bootcamp. I've learned to utilize powerful technologies like React.js, 
                    Express.js, MongoDB, Node.js, and Git.
                    <br /><br />
                    &nbsp;&nbsp;With the skills I've obtained, I can create a fully functioning website or web app. Then I can deploy it to cloud services, 
                    like google cloud, and let the customer traffic flow! 
                </p>
            </div>
        </div>
    )
}

export default About;
