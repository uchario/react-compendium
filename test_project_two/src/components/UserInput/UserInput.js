import React, {useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import styles from './UserInput.module.css';

const UserInput = (props) => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const submitFormHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-empty values)'
            });
            return;
        }

        if (+enteredAge < 1) {
            setError({
                title: 'Invalid Age',
                message: 'Please enter a valid age (> 0)'
            });
            return;
        }

        const userDetails = {
            name: enteredName, age: enteredAge, id: Math.random().toString()
        };
        props.onAddUser(userDetails);

        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    
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
                        <label 
                            htmlFor='username'
                        >
                            Username
                        </label>
                        <input 
                            type="text" 
                            id='username' 
                            ref={nameInputRef}
                        >
                        </input>
                    </div>
                    <div>
                        <label 
                            htmlFor='age'
                        >
                            Age (Years)
                        </label>
                        <input 
                            type="number" 
                            id='age'
                            ref={ageInputRef}
                        >
                        </input>
                    </div>
                    <Button 
                        type="submit"
                    >
                        Add User
                    </Button>
                </form>
            </Card>
        </div>
    );
}

export default UserInput;