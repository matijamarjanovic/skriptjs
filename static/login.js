function init() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        document.getElementById('password').value = '';

        const validation = joi.object({
            email: joi.string().email().trim(true).required(),
            password: joi.string().min(4).max(5).trim(true).required()
        .default([]),
           is_active: joi.boolean().default(true),
        });

        const {err} = validation.validate(data);


        if (err) {
            alert('Invalid data entered');
        }else {
            fetch('http://localhost:9090/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(data)
            }).then (res => res.json())
                .then ( el => {
                    if (el.message !== null)
                        alert(el.message);
                    else{
                        document.cookie = `token=${el.token};SameSite=Lax`;
                        window.location.href = 'index.html';
                    }
                })
        }


    });
}