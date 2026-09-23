package nl.wandelmaatje.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(title = "WandelMaatje API", version = "1.0", description = "API for managing walks between volunteers and elderly people"))
public class OpenApiConfig {
}
