class Mapper {
    DtoToIdiom(dto: IdiomDto): Idiom {
        return new Idiom(dto.idiomId, dto.word, dto.sentence, dto.translation);
    }
}
