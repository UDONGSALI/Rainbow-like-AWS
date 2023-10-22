package RainbowLike.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {
    // 엔티티랑 DTO를 왔다갔다 변환해줌
    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
}
