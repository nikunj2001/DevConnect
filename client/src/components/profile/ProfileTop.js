import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../img/avatar.jpg';
// import profile from '../../reducers/profile';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    profilePic,
    user: { name },
  },
}) => {
  console.log(profilePic);
  // console.log(profile);

  return (
    <div className='profile-top bg-light p-2'>
      <img
        className='round-img my-1'
        src={profilePic === undefined ? Avatar : profilePic.profilePicUrl}
      />
      <h1 className='large'>{name}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i style={{ color: 'black' }} className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i style={{ color: 'black' }} className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i style={{ color: 'black' }} className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedlin && (
          <a href={social.linkedlin} target='_blank' rel='noopener noreferrer'>
            <i style={{ color: 'black' }} className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i style={{ color: 'black' }} className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i
              style={{ color: 'black' }}
              className='fab fa-instagram fa-2x'
            ></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
