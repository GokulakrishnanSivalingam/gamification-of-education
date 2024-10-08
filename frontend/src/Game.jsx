import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Game.css';
import Navbar from './Navbar';

function Game() {

  const videoData = [
    { id: 1, title: 'Conservationist',
       videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726207814/Conservationist_fvg3jp.mp4', 
       question: 'How will you approach this situation?', 
       options: ['Approach the villagers directly.', 'Involve law enforcement immediately.', 'Launch a community awareness campaign.', 'Set up surveillance in the poaching areas.'], correct: 'Launch a community awareness campaign.',
       question: 'How should Dr. Raj approach the situation with the local villagers regarding the poaching activities?', 
       options: ['Directly confront the villagers', 'Work with community leaders to address the issue.', 'Report the poaching to authorities.', 'Offer incentives to the villagers to share information.'], correct: 'Work with community leaders to address the issue.' },
    { id: 2, title: 'AI Researcher',
       videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726207270/AI_Researcher_tkhjt8.mp4',
       question: 'What decision will you make in this scenario?', 
       options: ['Release the algorithm.', 'Delay the launch to fix the bias.', 'Release the algorithm with a disclaimer about its limitations.', 'Seek more funding or partnerships to address the bias quickly.'], correct: 'Delay the launch to fix the bias.'},
    { id: 3, 
      title: 'Aerospace Engineer', 
      videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726206812/Aerospace_Engineer_sya9oa.mp4',
       question: 'What would you do in such a scenario?', 
       options: ['Fix the Fault Immediately.', 'Proceed with the launch.', 'Request further testing.', 'Inform the authorities.'], correct: 'Fix the Fault Immediately.',
       question: 'How should Samantha manage the discovery of the minor hydraulic system fault just before the aircraft launch?', 
       options: ['Report the fault immediately and suggest postponing the launch.', 'Proceed with the launch.', 'Request further testing to determine the real risk.', 'Inform the authorities.'], correct: 'Inform the authorities.'},
    { id: 4, 
      title: 'Bank_Manager',
      videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726207554/Bank_Manager_zhuwdo.mp4',
      question: 'How should James respond to the potential financial abuse of his elderly customer by her son?', 
      options: [' File a report with Adult Protective Services for suspected abuse.',
        'Have a private discussion with the customer to better understand the situation.', 
        'Monitor the account closely.', 
        'Confront the son directly and warn him about the consequences.'], 
      correct: ' File a report with Adult Protective Services for suspected abuse.' },
      { id: 5, 
        title: 'High School teacher',
        videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726240952/High_School_Teacher_ytigib.mp4', 
        question: 'How should Ms. Johnson address Sam situation considering both his academic performance and personal challenges?', 
        options: ['Report Sam for cheating .',
           'Allow Sam to retake the test without reporting the incident.', 
          ' Offer Sam extra help and support, without reporting the incident.', 
          'Ignore the cheating and let Sam face the consequences in the final exam.'], 
        correct: ' Offer Sam extra help and support, without reporting the incident.' },
        { id: 6, 
          title: 'Entertainment',
          videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726240971/Entertainment_q3xeun.mp4', 
          question: 'How should Meera address the producer demand to add a controversial scene that contradicts the film message?', 
          options: ['Agree to include the scene to ensure the film marketability.',
             'Refuse to add the scene, prioritizing the film integrity.', 
            'Suggest a compromise by modifying the scene to fit the film’s tone.', 
            'Seek advice from trusted colleagues and industry peers before deciding.'], 
          correct: 'Refuse to add the scene, prioritizing the film integrity.'},
          { id: 7, 
            title: 'Fire Safety',
            videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726240963/FireSafety_ky9qxn.mp4', 
            question: 'How should Fire Chief Robert allocate his team resources during the rescue operation in the unstable building?', 
            options: ['Split the team to cover more ground and maximize rescue chances.',
              'Focus on the most accessible victims to ensure a safe rescue.', 
              'Request immediate additional backup before making any moves.', 
              'Prioritize the safety of the team by evacuating the building.'], 
            correct: 'Focus on the most accessible victims to ensure a safe rescue.' },
            { id: 8, 
              title: 'Air Traffic Controller',
              videoUrl: 'https://res.cloudinary.com/dnb5k6kpt/video/upload/v1726207492/Air_Traffic_Controller_w971sg.mp4', 
              question: 'How should Javier prioritize the landing of the two planes during the severe storm?', 
              options: ['Allow the larger commercial plane to land first due to its size and passenger count.',
                'Prioritize the smaller plane since it is low on fuel and in immediate danger.', 
                'Divert one of the planes to a nearby airport despite the risks.', 
                'Communicate with both pilots to assess the situation and make a joint decision.'], 
              correct: 'Prioritize the smaller plane since it is low on fuel and in immediate danger.' }
  ];

  const { id } = useParams(); 
  const video = videoData.find(video => video.id === parseInt(id)); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
  
    setSelectedOption(null);
    setFeedback('');
  }, [id]);

  if (!video) {
    return <div>Video not found!</div>;
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === video.correct) {
      setFeedback('Correct!');
      setScore(prevScore => prevScore + 1);
    } else {
      setFeedback('Wrong answer!');
    }
  };

  const getOptionClass = (option) => {
    if (!selectedOption) return '';
    return option === video.correct ? 'correct' : 'wrong';
  };

  return (
    <div>
      <Navbar/>
      <div className="title"><h1>{video.title}</h1></div>
   <div className="score">  <h2>Score: {score}</h2></div> 
      <div className="video-container">
     
        <video
          key={video.id}
          controls
          autoPlay
          style={{ width: '100%', maxWidth: '70%', height: '100%', maxHeight: '350px', margin: '10px', borderRadius: '10px', background: '' }}
          className="video-player"
        >
          <source src={video.videoUrl} type="video/mp4" />
        </video>
      </div>
      <h2>{video.question}</h2>
      <div className="g-container">
        {}
        
        <div className="option">
          {video.options.map((option, index) => (
            <p
              key={index}
              onClick={() => handleOptionClick(option)}
              className={selectedOption === option ? getOptionClass(option) : ''}
            >
              {option}
            </p>
          ))}
        </div>

      </div>
    <center>  <div className="g1">
          {}
          {video.id < videoData.length && (
            <Link to={`/video/${video.id + 1}`}>
              <button>Next Video</button>
            </Link>
          )}
        </div></center>
      {selectedOption && <div className="feedback">{feedback}</div>}
      
    </div>
  );
}

export default Game;
