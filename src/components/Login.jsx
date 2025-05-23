import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { signIn, signUp } from '../services/authService';
import { createClient } from '../services/clientService';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
});

const registerSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Too short!').required('Required'),
  full_name: Yup.string().required('Required'),
  phone: Yup.string().matches(/^[0-9+()-\s]*$/, 'Invalid phone number'),
  address: Yup.string(),
  city: Yup.string(),
  zip_code: Yup.string().matches(/^[0-9-]*$/, 'Invalid ZIP code'),
});

export default function Login({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn({
          email: values.email,
          password: values.password,
        });
        
        if (error) throw error;
        
        toast.success('Successfully signed in!');
        onClose();
        resetForm();
      } else {
        const { data, error } = await signUp({
          email: values.email,
          password: values.password,
          fullName: values.full_name,
        });
        
        if (error) throw error;
        
        // Create client profile
        const clientData = {
          auth_id: data.user.id,
          email: values.email,
          full_name: values.full_name,
          phone: values.phone,
          address: values.address,
          city: values.city,
          zip_code: values.zip_code
        };
        
        const { error: clientError } = await createClient(clientData);
        if (clientError) throw clientError;
        
        toast.success('Successfully registered! Please check your email to verify your account.');
        onClose();
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 pr-4 pt-4">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                      {isLogin ? 'Sign in to your account' : 'Create a new account'}
                    </Dialog.Title>
                    <div className="mt-6 w-full">
                      <Formik
                        initialValues={{
                          email: '',
                          password: '',
                          full_name: '',
                          phone: '',
                          address: '',
                          city: '',
                          zip_code: ''
                        }}
                        validationSchema={isLogin ? loginSchema : registerSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ errors, touched }) => (
                          <Form className="space-y-4">
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                              </label>
                              <Field
                                type="email"
                                name="email"
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                  errors.email && touched.email ? 'border-red-500' : ''
                                }`}
                              />
                              {errors.email && touched.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                              )}
                            </div>

                            <div>
                              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                              </label>
                              <Field
                                type="password"
                                name="password"
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                  errors.password && touched.password ? 'border-red-500' : ''
                                }`}
                              />
                              {errors.password && touched.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                              )}
                            </div>

                            {!isLogin && (
                              <>
                                <div>
                                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                  </label>
                                  <Field
                                    type="text"
                                    name="full_name"
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                      errors.full_name && touched.full_name ? 'border-red-500' : ''
                                    }`}
                                  />
                                  {errors.full_name && touched.full_name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.full_name}</p>
                                  )}
                                </div>

                                <div>
                                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone Number
                                  </label>
                                  <Field
                                    type="tel"
                                    name="phone"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                  {errors.phone && touched.phone && (
                                    <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                                  )}
                                </div>

                                <div>
                                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                    Address
                                  </label>
                                  <Field
                                    type="text"
                                    name="address"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                      City
                                    </label>
                                    <Field
                                      type="text"
                                      name="city"
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                  </div>

                                  <div>
                                    <label htmlFor="zip_code" className="block text-sm font-medium text-gray-700">
                                      ZIP Code
                                    </label>
                                    <Field
                                      type="text"
                                      name="zip_code"
                                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    {errors.zip_code && touched.zip_code && (
                                      <p className="mt-1 text-sm text-red-600">{errors.zip_code}</p>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                              <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Create account'}
                              </button>
                              <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={() => setIsLogin(!isLogin)}
                              >
                                {isLogin ? 'Create an account' : 'Back to sign in'}
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
