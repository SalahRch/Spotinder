package com.spotinder.backend.config;

import com.spotinder.backend.auth.handler.OAuth2AuthenticationFailureHandler;
import com.spotinder.backend.auth.handler.OAuth2SuccessHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
public class SecurityConfig {

    private final OAuth2SuccessHandler oAuth2SuccessHandler;
    private final OAuth2AuthenticationFailureHandler failureHandler;

    public SecurityConfig(OAuth2SuccessHandler oAuth2SuccessHandler, OAuth2AuthenticationFailureHandler failureHandler) {
        this.oAuth2SuccessHandler = oAuth2SuccessHandler;
        this.failureHandler = failureHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf.disable())

                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/",
                                "/error",
                                "/oauth2/**",
                                "/login/oauth2/**",
                                "/api/v1/access-requests",
                                "/api/v1/access-requests/count"
                        )
                        .permitAll()
                        .anyRequest().authenticated()
                )

                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )
                )

                .oauth2Login(oauth -> oauth
                        .successHandler(oAuth2SuccessHandler)
                        .failureHandler(failureHandler)
                )
                .logout(logout -> logout
                .logoutUrl("/logout")
                .invalidateHttpSession(true)
                .clearAuthentication(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler(
                        (request, response, authentication) ->
                                response.setStatus(
                                        HttpStatus.NO_CONTENT.value()
                                )
                )
        );

        return http.build();
    }
}