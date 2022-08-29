import React, {useState, Fragment} from 'react';

import UserInput from './components/UserInput/UserInput';
import UserList from './components/UserList/UserList';
import Wrapper from './components/Helpers/Wrapper';
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
    <Fragment>
      <section>
      <UserInput 
        onAddUser={addUserHandler}
      />
      </section>
      
      <section>
        {content}
      </section>
    </Fragment>
  );
}

export default App;
