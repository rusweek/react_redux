const compose = (...funcs) =>(comp) => {
    return funcs.reduce((wrapped, f)=>f(wrapped),comp)
};

export default compose;