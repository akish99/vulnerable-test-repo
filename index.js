```python
import os
import hashlib

def hash_password(password):
    salt = os.urandom(32)
    hashed_password = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    return salt + hashed_password

def verify_password(stored_password, provided_password):
    stored_salt = stored_password[:32]
    stored_hash = stored_password[32:]
    new_hash = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), stored_salt, 100000)
    return new_hash == stored_hash

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
        byte[] salt = new byte[32];
        new SecureRandom().nextBytes(salt);
        byte[] hashedPassword = pbkdf2(password, salt, 100000);
        System.out.println(byteArrayToHex(salt) + byteArrayToHex(hashedPassword));

        boolean isValid = verifyPassword(hashedPassword, salt, password);
        System.out.println(isValid);
    }

    public static byte[] pbkdf2(String password, byte[] salt, int iterations) throws NoSuchAlgorithmException, InvalidKeySpecException {
        SecretKeyFactory f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
        KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterations, 256);
        return f.generateSecret(spec).getEncoded();
    }

    public static boolean verifyPassword(byte[] storedHash, byte[] salt, String providedPassword) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] newHash = pbkdf2(providedPassword, salt, 100000);
        return byteArrayEquals(newHash, storedHash);
    }

    public static String byteArrayToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    public static boolean byteArrayEquals(byte[] a, byte[] b) {
        if (a.length != b.length) return false;
        for (int i = 0; i < a.length; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
}
```