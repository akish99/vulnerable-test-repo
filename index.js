```python
import os
import hashlib

def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = salt + pwdhash
    return pwdhash

def verify_password(stored_password, provided_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt, 100000)
    return pwdhash == stored_password

# Example usage:
password = "mysecretpassword"
hashed_password = hash_password(password)
print(hashed_password)

is_valid = verify_password(hashed_password, password)
print(is_valid)
```

```java
import java.security.SecureRandom;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;

public class Main {
    public static void main(String[] args) throws NoSuchAlgorithmException, InvalidKeySpecException {
        String password = "mysecretpassword";
        byte[] salt = generateSalt();
        byte[] hashedPassword = hashPassword(password, salt);
        System.out.println(hashedPassword);

        boolean isValid = verifyPassword(hashedPassword, password, salt);
        System.out.println(isValid);
    }

    private static byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private static byte[] hashPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 100000, 512);
        return factory.generateSecret(spec).getEncoded();
    }

    private static boolean verifyPassword(byte[] hashedPassword, String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, 100000, 512);
        byte[] newHash = factory.generateSecret(spec).getEncoded();
        return java.util.Arrays.equals(hashedPassword, newHash);
    }
}
```