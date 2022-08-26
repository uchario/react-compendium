import React, {useState} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import styles from './UserInput.module.css';

const UserInput = (props) => {
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState();

    const changeNameHandler = (event) => {
        setUsername(event.target.value);
    };

    const changeAgeHandler = (event) => {
        setAge(event.target.value);
    };

    const submitFormHandler = (event) => {
        event.preventDefault();
        if (username.trim().length === 0 || age.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values)'
            });
            return;
        }

        if (+age < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0)'
            });
            return;
        }

        const userDetails = {
            name: username, age: age, id: Math.random().toString()
        };
        props.onAddUser(userDetails);
    
        setUsername('');
        setAge(''); 
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <div>
            {error && (
                <ErrorModal
                    title={error.title}
                    message={error.message}
                    onConfirm={errorHandler}
                />
            )}
            <Card className={styles.input}>
                <form onSubmit={submitFormHandler}>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type="text" id='username' value={username} onChange={changeNameHandler}></input>
                    </div>
                    <div>
                        <label htmlFor='age'>Age (Years)</label>
                        <input type="number" id='age' value={age} onChange={changeAgeHandler}></input>
                    </div>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </div>
    );
}

export default UserInput;