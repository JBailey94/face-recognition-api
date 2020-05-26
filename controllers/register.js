const handleRegister = (request, res, db, bcrypt) => {
    // you must always return a response, otherwise the sender will hang up waiting for a response
    const { name, email, password } = request.body;
    const hash = bcrypt.hashSync(password, 2);

    if (!email || !password || !name) {
        return res.status(400).json('Incorrect form submission.')
    }

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({  
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })     
        .catch(error => res.status(400).json(error));
}

export default handleRegister;