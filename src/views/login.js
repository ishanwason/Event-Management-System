import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Input, Form, Label, Button, Alert } from 'reactstrap'
import { useHistory, Link } from 'react-router-dom';
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { logIn, signUp } from '../action/login'
import { Loader } from './loader';
import { setError } from '../action';
import { REMOVE_ERROR } from '../action/types';
import { Regex } from '../constant/string';
import { signupEndPoint } from '../utils/api/apiPath';

const Login = (props) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginDetails, setLoginDetails] = useState({ emailId: '', password: '' })
    const [signUpDetails, setSignUpDetails] = useState({ fullName: '', emailId: '', password: '' })
    const [submit, setSubmit] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [alertMessage, setAlertMessage] = useState('')
    // const history = useHistory();

    const login = useSelector(state => state.login)
    const dispatch = useDispatch();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('user'))
        if (token) {
            props.history.push('/event/view')
        }
    }, [])

    useEffect(() => {
        if (login.error)
            setAlertMessage(login.error)
    }, [login.error])
    useEffect(() => {
        if (Object.values(login.data).length > 0)
            props.history.push('/event/view')
    }, [login.data])
    const removeError = () => {
        setTimeout(() => {
            setAlertMessage('')
            dispatch(setError(REMOVE_ERROR))
        }, 3000)
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        isLogin ? setLoginDetails({ ...loginDetails, [name]: value }) : setSignUpDetails({ ...signUpDetails, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        isLogin ? dispatch(logIn(loginDetails)) : dispatch(signUp(signUpDetails))
        e.target.reset();
    }
    return (
        <div className='d-flex flex-column full-page align-items-center justify-content-center'>
            {login.isFetching && <Loader />}
            {alertMessage && <Alert className=' w-50' color='danger'  >{alertMessage}</Alert>}
            {alertMessage && removeError()}
            {isLogin && <Card className='d-flex w-50'>
                <CardHeader className="d-flex bg-dark text-white align-items-center">
                    <span className="material-icons text-white mr-1">stars</span>
                    <strong>Login</strong>
                </CardHeader>
                <CardBody>
                    <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                        <Label>
                            <strong>Email Id</strong>
                            <Input type="email"
                                // pattern={Regex.EMAIL}
                                name="emailId"
                                maxLength={50}
                                placeholder="Enter your Email Id"
                                required
                                invalid={submit && !loginDetails.emailId}
                                onChange={handleChange}
                            />
                        </Label>
                        <Label>
                            <strong>Password</strong>
                            <Input type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                                maxLength={20}
                                invalid={submit && loginDetails.password === ''}
                                onChange={handleChange} />
                        </Label>
                        <Label className='d-flex font-italic ml-4'>
                            <Input type="checkbox" onChange={e => setShowPassword(e.target.checked)} />
                            <b style={{ fontWeight: '350', fontSize: '14px' }}>Show Password </b>
                        </Label>
                        <Label className='d-flex w-100 justify-content-center mt-2'>
                            <Button className='bg-primary'>Login</Button>
                        </Label>
                        <Label className='d-flex w-100 justify-content-center'>
                            New User ? <Link className='ml-2' onClick={() => { setShowPassword(false); setIsLogin(false) }} to='#'>Register Here</Link>
                        </Label>
                    </Form>
                </CardBody>
            </Card>}
            {!isLogin && <Card className='d-flex w-50'>
                <CardHeader className="d-flex bg-dark text-white align-items-center">
                    <span className="material-icons text-white mr-1">stars</span>
                    <strong>Login</strong>
                </CardHeader>
                <CardBody >
                    <Form className='d-flex flex-column' onSubmit={handleSubmit}>
                        <Label>
                            <strong>Name</strong>
                            <Input type="text"
                                name="fullName"
                                // invalid={signUpDetails.fullName !== '' && !signUpDetails.fullName.includes(' ')}
                                // pattern={Regex.NAME}
                                minLength={3}
                                maxLength={20}
                                placeholder="Enter you Full Name"
                                // pattern={/^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,6}$/}
                                onChange={handleChange}
                                required
                                invalid={submit && !signUpDetails.fullName}
                            />
                        </Label>
                        <Label>
                            <strong>Email Id</strong>
                            <Input type="email"
                                name="emailId"
                                placeholder="Enter your Email Id"
                                required
                                maxLength={50}
                                pattern={Regex.EMAIL}
                                invalid={submit && !signUpDetails.emailId}
                                onChange={handleChange} />
                        </Label>
                        <Label>
                            <strong>Password</strong>
                            <Input type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                minLength={6}
                                maxLength={20}
                                required
                                invalid={submit && signUpDetails.password === ''}
                                onChange={handleChange} />
                        </Label>
                        <Label className='d-flex font-italic ml-4'>
                            <Input type="checkbox" onChange={e => setShowPassword(e.target.checked)} />
                            <b style={{ fontWeight: '350', fontSize: '14px' }}>Show Password </b>
                        </Label>
                        <Label className='d-flex w-100 justify-content-center mt-2'>
                            <Button className='bg-primary'>Sign Up</Button>
                        </Label>
                        <Label className='d-flex w-100 justify-content-center'>
                            Existing User ? <Link className='ml-2' onClick={() => { setShowPassword(false); setIsLogin(true) }} to='#'>Login Here</Link>
                        </Label>
                    </Form>
                </CardBody>
            </Card>}
        </div>
    )
}

export default Login;