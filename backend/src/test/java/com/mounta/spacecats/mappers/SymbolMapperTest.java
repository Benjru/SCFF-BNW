package com.mounta.spacecats.mappers;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import com.mounta.spacecats.models.planets.Symbol;

public class SymbolMapperTest {

    private SymbolMapper mapper = Mappers.getMapper(SymbolMapper.class);

    @Test
    void testMapping(){
        final var paw = mapper.toSymbol("PAW");
        assertThat(paw).isEqualTo(Symbol.PAW_SYMBOL);

        final var tail = mapper.toSymbol("TAIL");
        assertThat(tail).isEqualTo(Symbol.TAIL_SYMBOL);

        final var ears = mapper.toSymbol("EARS");
        assertThat(ears).isEqualTo(Symbol.EARS_SYMBOL);
        
        final var whiskers = mapper.toSymbol("WHISKERS");
        assertThat(whiskers).isEqualTo(Symbol.WHISKERS_SYMBOL);
    }
}
