package com.mounta.spacecats.mappers;

import org.mapstruct.EnumMapping;
import org.mapstruct.InheritInverseConfiguration;
import org.mapstruct.Mapper;

import com.mounta.spacecats.models.planets.Symbol;

@Mapper
public interface SymbolMapper {
    
    @EnumMapping(nameTransformationStrategy = "stripSuffix", configuration = "_SYMBOL")
    Symbol toSymbol(String symbol);

    @InheritInverseConfiguration
    String fromSymbol(Symbol symbol);
}
