import React from 'react';

import UserItem from '../UserItem/UserItem';
import Card from '../UI/Card';

import styles from './UserList.module.css';

const UserList = (props) => {
    return (
        <Card className={styles.users}>
            <ul>
                {props.users.map((users) => (
                        <UserItem
                            key={users.id}
                            id={users.id}
                            name={users.name}
                            age={users.age}
                        />
                ))}
            </ul>
        </Card>
    );
}

export default UserList;