type LoginResponse = {
    user: {
        username: string;
        name: string;
    };
    refresh: string;
    token: string;
};
