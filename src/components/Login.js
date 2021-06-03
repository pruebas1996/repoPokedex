import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import { useAuth } from '../provider/AuthProvider';


function Login() {
    const auth = useAuth()
    const { register, handleSubmit } = useForm();
    const history = useHistory();
    const onSubmit = (values) => {
        auth.signIn(values.name, () => {
            history.push('/pokedex')
        });
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} >
            <div>
                <label htmlFor="name" >User Name</label>
                <input type="text" id="name" placeholder="User Name" {...register('name')} ></input>
            </div>
            <div>
                <button>Logn In</button>
            </div>
        </form>
    )
}

export default Login
