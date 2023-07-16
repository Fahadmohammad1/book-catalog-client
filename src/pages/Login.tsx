import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/user/userApi";
import Loading from "../shared/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function Login() {
	const [errorMessage, setErrorMessage] = useState('')
	type CustomError = FetchBaseQueryError & {
	  data: {
		success : boolean,
		message : string,
		errorMessages : []
	  }
	}

	const [loginUser, {isLoading, isError, isSuccess, error, data}] = useLoginUserMutation()
	console.log(data);
	useEffect(() => {
		if (isError && error) {
		  const customError = error as CustomError;
		  if (customError.data) {
			setErrorMessage(customError.data.message);
		  }
		}
	  }, [isError, error]);

	  useEffect(() => {
		if (isSuccess && data) {

			const availableUser = localStorage.getItem('user')
			if(availableUser){
				localStorage.removeItem('user')
			}
		  
			localStorage.setItem('user', JSON.stringify(data.data));
		}
	  }, [isSuccess]);

	  if(isSuccess){
		Swal.fire({
		  title: 'Successfull',
		  text: data.message,
		  icon: 'success',
		  showConfirmButton: false,
		  timer: 1000
		})
	  }
	
	  if(isError && error){
		Swal.fire({
		  title: 'Failed!',
		  text: errorMessage,
		  icon: 'error',
		  confirmButtonText: 'Try Again'
		})
	  }

	
	const {
		register,
		handleSubmit,
		reset,
	  } = useForm();

	  const onSubmit = (userInfo : Record<string, string>) => {
    
		const options = {
		  email : userInfo.email,
		  password : userInfo.password
		}
		loginUser(options)
		
		reset()
	  }
	  
	  if(isLoading){
		return <Loading/>
	}
  return (
    <section>
     <div
	className="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden">
	
</div>
<div
	className="relative   min-h-screen  sm:flex sm:flex-row  justify-center bg-transparent rounded-3xl shadow-xl">
	<div className="flex-col flex  self-center lg:px-14 sm:max-w-4xl xl:max-w-md  z-10">
		<div className="self-start hidden lg:flex flex-col  text-gray-300">
			
			<h1 className="my-3 font-semibold text-4xl">Welcome back</h1>
			<p className="pr-3 text-sm opacity-75">Lorem ipsum is placeholder text commonly used in the graphic, print,
				and publishing industries for previewing layouts and visual mockups</p>
		</div>
	</div>
	<div className="flex justify-center self-center  z-10">
		<div className="p-12 bg-white mx-auto rounded-3xl w-96 ">
			<div className="mb-7">
				<h3 className="font-semibold text-2xl text-gray-800">Login</h3>
				<p className="text-gray-400">Don't have account? <Link to="/signup"
						className="text-sm text-purple-700 hover:text-purple-700">Sign Up</Link></p>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}  className="space-y-6">
              
				<div className="">
					<input className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="email" placeholder="Email" {...register("email", {})}/>
              </div>

				<div className="">
					<input className=" w-full text-sm  px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-purple-400" type="password" placeholder="Password" {...register("password", {})}/>
              </div>

				<div className="">
					<input className="w-full flex justify-center bg-purple-800  hover:bg-purple-700 text-gray-100 p-3  rounded-lg tracking-wide font-semibold  cursor-pointer transition ease-in duration-500" type="submit" placeholder="Sign Up"/>
              </div>
	
						</form>
					</div>
				</div>
				
			</div>
    </section>
  )
}
