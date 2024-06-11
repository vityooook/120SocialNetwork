import React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';

interface User {
    first_name: string;
    id: number;
    language: string;
    profile_photo: string;
    second_name: string;
    telegram_id: string;
    username: string;
    wallet: string;
    time_registration: string;
}

interface UserProfileProps {
    user: User | null;
    error: string | null;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, error }) => {
    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>First Name:</strong> {user.first_name}</p>
            <p><strong>Second Name:</strong> {user.second_name}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Telegram ID:</strong> {user.telegram_id}</p>
            <p><strong>Language:</strong> {user.language}</p>
            <p><strong>Wallet:</strong> {user.wallet}</p>
            <p><strong>Profile Photo:</strong> {user.profile_photo}</p>
            <p><strong>Time Registration:</strong> {new Date(user.time_registration).toLocaleString()}</p>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.params as { id: string };
    try {
        const response = await axios.get(`http://95.163.231.244:3000/api/user/get/${id}`);
        return {
            props: {
                user: response.data,
                error: null
            }
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                user: null,
                error: 'Error fetching user data'
            }
        };
    }
};

export default UserProfile;
