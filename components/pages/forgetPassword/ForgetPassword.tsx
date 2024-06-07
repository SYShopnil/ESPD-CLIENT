import ErrorMessage from "@/components/common/ErrorMessage";
import PrimaryButton from "@/components/common/PrimaryButton";
import {post} from "@/services/api/api";
import {API_RESET_PASS_REQUEST_OTP, API_RESET_PASS_VERIFY_OTP} from "@/services/api/endpoints";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRouter} from "next/router";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {object, string} from "yup";
import {PAGE_RESET_PASS_VERIFY_OTP} from "@/config/constants";

export default function ForgetPasswordForm() {
  const router = useRouter();

  const [error, setError] = useState('');
  const [title, setTitle] = useState('Forgot Password');
  const [step, setStep] = useState('request'); //request, verify, reset

  let loginSchema = object({
    email: string().email().required("Email is required"),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const recoveryEmailMutation = useMutation(
    async (data) => await post(API_RESET_PASS_REQUEST_OTP, data),
    {
      onSuccess: (res) => {
        router.push(PAGE_RESET_PASS_VERIFY_OTP);
      },
      onError: (err) => {
        if (err && err?.response?.status === 401) {
          setError('Invalid credentials');
        }
        if (err && err?.response?.status === 406) {
          setError(err?.response?.data?.message);
        }
        if (err && err?.response?.status === 404) {
          setError(err?.response?.data?.message);
        }
      },
    }
  );

  const onFormSubmit = (data: any) => {
    setError('');
    window.localStorage.setItem('reset_pass_email', data.email);
    recoveryEmailMutation.mutate(data);
  };

  return (
    <>
      <div className="logInWrapperSet">
        <div className="formWrap">
          <h1 className="logInTitle">Forgot Password</h1>
          {error !== '' &&
            <div className={'alert alert-danger'}>
              {error}
            </div>
          }
          <form noValidate>
            <div>
              <div className="emailBox">
                <p>Enter your email & we will send a code to your email.</p>
                <input
                    className={errors.email && errors.email?.message ? 'has-error' : ''}
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                />
                <div>

                  {errors.email && errors.email?.message && (
                      <ErrorMessage
                          text={errors.email?.message}
                      />
                  )}

                </div>
              </div>
            </div>

            <div className="signInButtonBox">
              <PrimaryButton
                  type={'submit'}
                  text={'Continue'}
                  loading={recoveryEmailMutation.isLoading}
                  onClick={handleSubmit(onFormSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
