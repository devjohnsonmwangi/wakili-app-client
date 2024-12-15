import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../../../features/users/usersAPI';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import Footer from '../../landingPage/Footer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaUserCircle, FaLock, FaShieldAlt, FaRegFileAlt } from 'react-icons/fa';

type UserFormData = {
    full_name: string;
    email: string;
    phone_number: string;
    address: string;
    profile_picture?: string;
    password?: string;
};

const schema = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phone_number: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters'),
});

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.user);
    const user_id = user.user?.user_id?? 0;

    const { data: userData, isLoading, error, refetch } = usersAPI.useGetUserByIdQuery(user_id, {
        pollingInterval: 6000,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true
    });

    const [updateUser] = usersAPI.useUpdateUserMutation();
    const [isEditMode, setIsEditMode] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [image, setImage] = useState<File | null>(null);
    const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
    const [agreeToPrivacy, setAgreeToPrivacy] = useState(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserFormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (userData) {
            reset({
                full_name: userData.full_name,
                email: userData.email,
                phone_number: userData.phone_number,
                address: userData.address,
                profile_picture: userData.profile_picture,
            });
        }
    }, [userData, reset]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmit: SubmitHandler<UserFormData> = async (formData) => {
        try {
            setIsUpdating(true);
            let imageUrl = formData.profile_picture || '';
            if (image) {
                const formData = new FormData();
                formData.append('file', image);
                formData.append('upload_preset', 'upload');

                const response = await axios.post('https://api.cloudinary.com/v1_1/dl3ovuqjn/image/upload', formData);

                if (response.status === 200) {
                    imageUrl = response.data.secure_url;
                } else {
                    throw new Error('Failed to upload image');
                }
            }

            await updateUser({ user_id: user_id, ...formData, profile_picture: imageUrl }).unwrap();
            setIsEditMode(false);
            refetch();
            toast.success('User updated successfully');
        } catch (err) {
            console.error('Error updating user', err);
            toast.error('Error updating user');
        } finally {
            setIsUpdating(false);
        }
    };

    const onSubmitPassword: SubmitHandler<UserFormData> = async (formData) => {
        if (!agreeToPrivacy) {
            toast.error('You must agree to the privacy policy');
            return;
        }

        try {
            setIsUpdating(true);
            await updateUser({
                user_id: user_id,
                password: formData.password,
                full_name: userData?.full_name,
                email: userData?.email,
                phone_number: userData?.phone_number,
                address: userData?.address,
            }).unwrap();

            toast.success('Password updated successfully');
            setIsChangePasswordMode(false);
        } catch (err) {
            console.error('Error updating user', err);
            toast.error('Error updating user');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading user data.</div>;
    if (!userData) return <div>No user data available.</div>;

    return (
        <>
            <Toaster />
            <div className="card shadow-xl mx-auto p-6 text-green-500 rounded-md bg-slate-100 min-h-screen">
                <div className="flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="btn bg-blue-500 text-white hover:bg-blue-600 w-24 py-2 rounded-md">
                        🔙 Back
                    </button>
                </div>

                <div className="border-b-2 border-slate-600 pb-4 mt-8">
                    <div className="flex justify-center">
                        <img
                            src={userData.profile_picture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}
                            className="rounded-full h-32 w-32 object-cover border-4 border-white"
                            alt="User Avatar"
                        />
                    </div>
                    <div className="flex flex-col justify-center mt-4 text-center">
                        <h1 className="text-3xl font-bold text-indigo-600">{userData.full_name} <FaUserCircle className="inline text-xl" /></h1>
                        <p className="text-lg text-gray-700"><FaEnvelope className="inline mr-2" />{userData.email}</p>
                        <p className="text-lg text-gray-700"><FaPhoneAlt className="inline mr-2" />{userData.phone_number}</p>
                        <p className="text-lg text-gray-700"><FaMapMarkerAlt className="inline mr-2" />{userData.address}</p>
                    </div>
                </div>

                <div className="flex justify-between mt-6 gap-6">
                    <button
                        onClick={() => setIsEditMode(true)}
                        className="btn bg-green-500 text-white hover:bg-green-600 w-1/4 px-4 py-2 rounded-md">
                        ✏️ Update Profile
                    </button>
                    <button
                        onClick={() => setIsChangePasswordMode(!isChangePasswordMode)}
                        className="btn bg-yellow-500 text-white hover:bg-yellow-600 w-1/4 px-4 py-2 rounded-md">
                        {isChangePasswordMode ? 'Cancel Password' : 'Change Password'}
                    </button>
                </div>

                {isEditMode && (
                    <div className="card w-3/5 mx-auto shadow-2xl mt-8 p-6 bg-white rounded-lg floating-card">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                    {...register("full_name")}
                                />
                                <p className="text-red-500">{errors.full_name?.message}</p>
                            </div>
                            <div className="form-control">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="input input-bordered w-full"
                                    {...register("email")}
                                />
                                <p className="text-red-500">{errors.email?.message}</p>
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full"
                                    {...register("phone_number")}
                                />
                                <p className="text-red-500">{errors.phone_number?.message}</p>
                            </div>
                            <div className="form-control">
                                <input
                                    type="text"
                                    placeholder="Address"
                                    className="input input-bordered w-full"
                                    {...register("address")}
                                />
                                <p className="text-red-500">{errors.address?.message}</p>
                            </div>
                            <div className="form-control">
                                <input
                                    title="Profile Picture"
                                    type="file"
                                    className="file-input file-input-bordered w-full"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    onClick={() => setIsEditMode(false)}
                                    className="btn bg-red-500 text-white hover:bg-red-600 w-1/4 px-4 py-2 rounded-md">
                                    ❌ Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-blue-500 text-white hover:bg-blue-600 w-1/4 px-4 py-2 rounded-md">
                                    {isUpdating ? 'Updating...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {isChangePasswordMode && (
                    <div className="card w-3/5 mx-auto shadow-2xl mt-8 p-6 bg-white rounded-lg floating-card">
                        <h2 className="text-2xl font-bold text-center text-indigo-600">Change Password <FaLock className="inline text-xl" /></h2>
                        <div className="text-center mb-4 mt-2">
                            <FaShieldAlt className="inline text-lg text-gray-700" />
                            <p className="text-sm text-gray-600">Your privacy is important to us. Make sure your password is strong and unique.</p>
                            <FaRegFileAlt className="inline text-lg text-gray-700 mt-2" />
                            <p className="text-sm text-gray-600">We will never share your password with anyone.</p>
                        </div>
                        <form onSubmit={handleSubmit(onSubmitPassword)}>
                            <div className="form-control">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    className="input input-bordered w-full"
                                    {...register("password")}
                                />
                                <p className="text-red-500">{errors.password?.message}</p>
                            </div>
                            <div className="form-control mt-4">
                                <input
                                    title='I agree to the privacy policy'
                                    type="checkbox"
                                    checked={agreeToPrivacy}
                                    onChange={() => setAgreeToPrivacy(!agreeToPrivacy)}
                                    className="checkbox checkbox-primary"
                                />
                                <label className="ml-2 text-gray-700">I agree to the privacy policy</label>
                            </div>
                            <div className="flex justify-between mt-6">
                                <button
                                    onClick={() => setIsChangePasswordMode(false)}
                                    className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md">
                                    ❌ Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md">
                                    {isUpdating ? 'Updating...' : '🔐 Save Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

export default Profile;
