
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../services/Api-service';
import { mainAPI, membersAPILink } from '../../constants/api-constants';
import { setMembersData } from '../../store/membersSlice';
import { handleImageError } from '../../utils/common-utils';
import './Members.css';

const Members = ({ onClose }) => {
    const dispatch = useDispatch();
    const members = useSelector((state) => state.members.membersData);
    const darkMode = useSelector((state) => state.theme.darkMode);

    useEffect(() => {
        const fetchDataFromApi = async () => {
          try {
            const data = await fetchData(membersAPILink);
            dispatch(setMembersData(data));

          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchDataFromApi();
      }, [dispatch]);

  return (
    <div className='members-modal-backdrop' onClick={onClose}>
        <div className={`members-modal-content ${darkMode ? 'dark' : ''} `} onClick={(e) => e.stopPropagation()}>
            <ul className='members-list'>
                {members?.map((member) => {
                    return(
                        <li key={member.id}>
                            <img className='member-image' src={mainAPI + '/' + member.photo} alt={member.name} onError={(e) => handleImageError(e, true)}/>
                            <p className='member-name'>{member.name}</p>
                            <p className='member-location'>{member.address.city}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    </div>
  );
};

export default Members;