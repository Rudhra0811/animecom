const mockUsers = [
    { id: 1, username: 'user1', password: 'password1' },
    { id: 2, username: 'user2', password: 'password2' },
];

export const login = (username, password) => {
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username }));
        return { id: user.id, username: user.username };
    }
    throw new Error('Invalid username or password');
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};

export const register = (username, password) => {
    if (mockUsers.some(u => u.username === username)) {
        throw new Error('Username already exists');
    }
    const newUser = { id: mockUsers.length + 1, username, password };
    mockUsers.push(newUser);
    return login(username, password);
};