const bcrypt = require ('bcrypt');

const hashslingingPassword = () => 
    {

        return new Promise((resolve, reject)=>{bcrypt.genSalt()

            bcrypt.genSalt(12,(err,salt) => {if (err){reject(err)

            }
          bcrypt.hash(password, salt, (err,hash) => {
if (err){reject(err)

}
resolve(hash)

          })
        })
        })
    }

    const comparePassword = (password, hashed) => { return bcrypt.compare, hashed}

  module.exports = {hashslingingPassword,
comparePassword

    }