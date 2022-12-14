const signupHandler = async(event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!username || !password) {
        alert('username and password must be provided before signing up')
    }

    if (username && password){
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });
        if (response.ok) {
            console.log('Success')
            document.location.replace('/dashboard');
        } 
        if (response.status === 409) {
            alert('Username is already in use.');
        }
    }
}

document.querySelector('#sign-up-submit').addEventListener('click', signupHandler);