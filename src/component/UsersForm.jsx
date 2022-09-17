import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";


const UsersForm = ({ getUser, userSelected, timer }) => {
    const { register, handleSubmit, reset } = useForm()
    const [isVisible, setIsVisible] = useState('password')
    const [isVisibleIcon, setIsVisibleIcon] = useState('visibility')
    


    useEffect(() => {
        if (userSelected) {
            reset(userSelected)
        }
    }, [userSelected])

    const showPass = () => {
        if (isVisible === 'password') {
            setIsVisible('text')
            setIsVisibleIcon('visibility_off')
        } else {
            setIsVisible('password')
            setIsVisibleIcon('visibility')
        }
    }

    const submit = newUser => {
        if (newUser.password === newUser.confirmation) {
            if (newUser.password.length >= 8) {
                if (userSelected) {
                    timer('El usuario a sido actualizado')
                    delete newUser.confirmation
                    axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, newUser)
                        .then(() => getUser())
                } else {
                    delete newUser.confirmation
                    timer('El usuario a sido creado con exito')
                    axios.post(`https://users-crud1.herokuapp.com/users/`, newUser)
                        .then(() => getUser())
                        .catch(error => console.log(error.response))
                }
                clear()
            } else {
                timer('La contraseña debe ser de almenos 8 dígitos')
            }
        } else {
            timer('Las contraseñas no coinsiden')
        }
    }


    const clear = () => {
        reset({
            first_name: '',
            last_name: '',
            email: '',
            birthday: '',
            password: '',
            confirmation: ''
        })
    }

    

    return (
            <div className="form-container">
                <form onSubmit={handleSubmit(submit)} className="form-main">
                    <h1 className="title">User Data</h1>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input placeholder="Fisrt Name" type="text" {...register('first_name', {required: true})} />
                        <span className="material-symbols-outlined icon-show">badge</span>
                    </div>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input placeholder="Last Name" type="text" {...register('last_name', {required: true})} />
                        <span className="material-symbols-outlined icon-show">badge</span>
                    </div>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input placeholder="Email" type="email" {...register('email', {required: true})} />
                        <span className="material-symbols-outlined icon-show">alternate_email</span>
                    </div>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input type="date" {...register('birthday', {required: true})} />
                    </div>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input placeholder="Password" type={isVisible} {...register('password', {required: true})} />
                        <span className="material-symbols-outlined icon-show" onClick={() => showPass()}>{isVisibleIcon}</span>
                    </div>
                    <div className="input-container">
                        <span className="require">*</span>
                        <input placeholder="Confirm Password" type={isVisible} {...register('confirmation', {required: true})} />
                        <span className="material-symbols-outlined icon-show" onClick={() => showPass()}>{isVisibleIcon}</span>
                    </div>
                    <button>{userSelected ? 'Update' : 'Create User'}</button>
                </form>
            </div>
    );
};

export default UsersForm;