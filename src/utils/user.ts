
export const getUser = (): PartialUser => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : { id: "", name: ""};
};

export const setUser = (payload: PartialUser) => {
    localStorage.setItem("user", JSON.stringify(payload));
};
