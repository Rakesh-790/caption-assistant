package com.captionassistant.backend.security.jwt;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import com.captionassistant.backend.model.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Value("${jwt.secret_key}")
    private String JWT_SECRET;

    private SecretKey getKey() {
        byte[] keyBytes = Base64.getDecoder().decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateAccessToken(UserEntity user, String role) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(user.getEmail())
                .claim("role", role)
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(15, ChronoUnit.MINUTES)))
                .signWith(getKey(), Jwts.SIG.HS256)
                .compact();
    }

    public String generateRefreshToken(UserEntity user) {
        Instant now = Instant.now();

        return Jwts.builder()
                .subject(user.getEmail())
                .issuedAt(Date.from(now))
                .expiration(Date.from(now.plus(7, ChronoUnit.DAYS)))
                .signWith(getKey(), Jwts.SIG.HS256)
                .compact();
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String getUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public String getUserRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean validateToken(String token, String username) {
        Claims claims = extractClaims(token);
        return claims.getSubject().equals(username)
                && claims.getExpiration().after(new Date());
    }
}