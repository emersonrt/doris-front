interface EmocoesDorisImg {
    pathImg: string;
    descricao: string;
}

export class EmocoesDoris {

    static readonly ATENCAO = new EmocoesDoris('ATENCAO', { pathImg: 'doris_atencao.png', descricao: 'Dóris atenta' });
    static readonly DUVIDA = new EmocoesDoris('DUVIDA', { pathImg: 'doris_duvida.png', descricao: 'Dóris com dúvidas' });
    static readonly FELIZ = new EmocoesDoris('FELIZ', { pathImg: 'doris_feliz.png', descricao: 'Dóris feliz' });
    static readonly INDIGNACAO = new EmocoesDoris('INDIGNACAO', { pathImg: 'doris_indignacao.png', descricao: 'Dóris indignada' });
    static readonly PADRAO = new EmocoesDoris('PADRAO', { pathImg: 'doris_padrao.png', descricao: 'Dóris' });
    static readonly TRISTEZA = new EmocoesDoris('TRISTEZA', { pathImg: 'doris_tristeza.png', descricao: 'Dóris triste' });

    private constructor(private readonly key: string, public readonly value: EmocoesDorisImg) {
    }

    toString() {
        return this.key;
    }

}