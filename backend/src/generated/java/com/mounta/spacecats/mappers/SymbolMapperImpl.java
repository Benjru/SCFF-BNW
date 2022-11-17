package com.mounta.spacecats.mappers;

import com.mounta.spacecats.models.planets.Symbol;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-11-17T14:58:23-0400",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-7.5.1.jar, environment: Java 17.0.5 (Oracle Corporation)"
)
@Component
public class SymbolMapperImpl implements SymbolMapper {

    @Override
    public Symbol toSymbol(String symbol) {
        if ( symbol == null ) {
            return null;
        }

        Symbol symbol1;

        switch ( symbol ) {
            case "PAW": symbol1 = Symbol.PAW_SYMBOL;
            break;
            case "TAIL": symbol1 = Symbol.TAIL_SYMBOL;
            break;
            case "WHISKERS": symbol1 = Symbol.WHISKERS_SYMBOL;
            break;
            case "EARS": symbol1 = Symbol.EARS_SYMBOL;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + symbol );
        }

        return symbol1;
    }

    @Override
    public String fromSymbol(Symbol symbol) {
        if ( symbol == null ) {
            return null;
        }

        String string;

        switch ( symbol ) {
            case PAW_SYMBOL: string = "PAW";
            break;
            case TAIL_SYMBOL: string = "TAIL";
            break;
            case WHISKERS_SYMBOL: string = "WHISKERS";
            break;
            case EARS_SYMBOL: string = "EARS";
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + symbol );
        }

        return string;
    }
}
