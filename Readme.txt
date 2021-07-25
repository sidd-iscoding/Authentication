objectives:
    create a React application using a token-based authentication system
    create a mock API that will return a user token
    build a login page that will fetch the token, and 
    check for authentication without rerouting a user. 

Steps:
    1. Go to google developer console.
    2. register the application which will result into generation of  a client ID and optionally a secret.
    3. The client_id is a public identifier for apps and not guessable by third parties. It is  32-character hex
     string. It must also be unique across all clients that the authorization server handles.
    4. The client_secret is a secret known only to the application and the authorization server. It must be
     sufficiently random to not be guessable, which means you should avoid using common UUID libraries which 
     often take into account the timestamp or MAC address of the server generating it. A great way to generate
      a secure secret is to use a cryptographically-secure library to generate a 256-bit value and converting it
       to a hexadecimal representation.

       https://www.oauth.com/oauth2-servers/client-registration/client-id-secret/