import React, {useState} from 'react';

import UserInput from './components/UserInput/UserInput';
import UserList from './components/UserList/UserList';

const USER_DETAILS = [];

function App() {
  const [userDetails, setUserDetails] = useState(USER_DETAILS);

  const addUserHandler = (user) => {
    setUserDetails((prevDetails) => {
      const updateUserDetails = [...prevDetails];
      updateUserDetails.unshift(user)
      return updateUserDetails;
    });
  };

  let content = (
    <p>No user entry...</p>
  );

  if (userDetails.length > 0) {
    content = (
      <UserList
        users={userDetails}
      />
    );
  };

  return (
    <div>
      <section>
      <UserInput 
        onAddUser={addUserHandler}
      />
      </section>
      
      <section>
        {content}
      </section>
    </div>
  );
}

export default App;
