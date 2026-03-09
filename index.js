```python
import os
import hashlib

class User:
    def __init__(self, username, password):
        self.username = username
        self.password = self._hash_password(password)

    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def authenticate(self, provided_password):
        return self.password == self._hash_password(provided_password)

def create_user(username, password):
    return User(username, password)

def main():
    user = create_user('test_user', 'test_password')
    if user.authenticate('test_password'):
        print('Authentication successful')
    else:
        print('Authentication failed')

if __name__ == "__main__":
    main()
```

```java
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = hashPassword(password);
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            return bytesToHex(hashBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder hexString = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

    public boolean authenticate(String providedPassword) {
        return password.equals(hashPassword(providedPassword));
    }

    public static User createUser(String username, String password) {
        return new User(username, password);
    }

    public static void main(String[] args) {
        User user = createUser("test_user", "test_password");
        if (user.authenticate("test_password")) {
            System.out.println("Authentication successful");
        } else {
            System.out.println("Authentication failed");
        }
    }
}
```