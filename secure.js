/**
 * To get started, first install the JSON Web Token (JWT) library.
 * Create an API endpoint and make sure to access it after a user signs in or signs up.
 * On the client-side, install Axios and use it to make a POST request to send user information to the API.
 * Generate a JWT token with jwt.sign, specifying the user, a secret, and an expiration time (e.g., { expiresIn: '4h' }).
 * Send this token to the client and store it in cookies (recommended), or you can also store it on the local server or in memory/database.
 * To store the token in cookies, you need to consider some conditions. If the server and client are running on different ports, you should configure CORS on the server (e.g., origin: ['serverURL'], credentials: true), and on the client-side, use 'withCredentials' in Axios.
 * Send the cookies to the server when a user try to access a route which is you want to secure.
  
 * To receive cookies in an API, you must use the 'cookieParser' middleware and call it inside 'app.use()'.
 * To secure specific APIs, you should use 'withCredentials' with those Axios requests.
 * Now, create a middleware to check if the token exists or not.
 * If it exists, verify it using jwt.verify(token, secret, (err, decoded)). If there's an error, handle it; otherwise, assign the decoded token data to 'req.user'.
 * Inside the API, check if the requested user matches the token user. If not, return a 403 (forbidden) status.
 
 

 
 */

res.clearCookie('token', {maxAge: 0}).send({success: true});
// --------------------
res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                }).send({ message: true });
// -------------------------

  const verifyToken = async (req, res, next) => {
            const token = req.cookies.token;
            console.log(token)
            if (!token) {
                return res.status(401).send({ message: 'unauthorize user' })
            }
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    return res.status(402).send({ message: 'unauthorize' })
                }
                req.user = decoded;
                next();
            })
        }
