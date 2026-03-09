```python
import hashlib
import os

def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = salt + pwdhash
    return pwdhash.hex()

def verify_password(stored_password, provided_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt, 100000)
    return pwdhash.hex() == stored_password

# Example usage:
password = "mysecretpassword"
hashed_password = hash_password(password)
print(hashed_password)

is_valid = verify_password(hashed_password, password)
print(is_valid)
```

```java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.nio.charset.StandardCharsets;

public class PasswordHasher {
    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[32];
        random.nextBytes(salt);
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
        byte[] saltedHash = new byte[salt.length + hash.length];
        System.arraycopy(salt, 0, saltedHash, 0, salt.length);
        System.arraycopy(hash, 0, saltedHash, salt.length, hash.length);
        return bytesToHex(saltedHash);
    }

    public static boolean verifyPassword(String storedPassword, String providedPassword) throws NoSuchAlgorithmException {
        byte[] salt = hexToBytes(storedPassword.substring(0, 64));
        byte[] storedHash = hexToBytes(storedPassword.substring(64));
        MessageDigest md = MessageDigest.getInstance("SHA-512");
        byte[] hash = md.digest(providedPassword.getBytes(StandardCharsets.UTF_8));
        byte[] saltedHash = new byte[salt.length + hash.length];
        System.arraycopy(salt, 0, saltedHash, 0, salt.length);
        System.arraycopy(hash, 0, saltedHash, salt.length, hash.length);
        return bytesToHex(saltedHash).equals(bytesToHex(storedHash));
    }

    private static String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    private static byte[] hexToBytes(String hex) {
        int len = hex.length();
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            data[i / 2] = (byte) Integer.parseInt(hex.substring(i, i + 2), 16);
        }
        return data;
    }

    public static void main(String[] args) throws NoSuchAlgorithmException {
        String password = "mysecretpassword";
        String hashedPassword = hashPassword(password);
        System.out.println(hashedPassword);

        boolean isValid = verifyPassword(hashedPassword, password);
        System.out.println(isValid);
    }
}
```