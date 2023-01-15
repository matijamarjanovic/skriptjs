
function init() {
    const joi = require('joi');

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').value
        };
        document.getElementById('password').value = '';

        const validation = joi.object({
            name: joi.string().alphanum().min(3).max(25).trim(true).required(),
            email: joi.string().email().trim(true).required(),
            password: joi.string().min(4).max(5).trim(true).required(),
            admin: joi.boolean().required()
        .default([]),
           is_active: joi.boolean().default(true),
        });


        const {err} = validation.validate(data);

        if (err) {
            alert('Invalid data entered');
        }else {
            fetch('http://localhost:9090/register',{
                method: 'post',
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
                }).catch(err => alert(err.message));
        }



    });
}