# -*- coding: utf-8 -*-
"""Conteúdo do trabalho sobre teste de paternidade. Tipos de bloco:
   h1 = seção primária (nova página, negrito)
   h2 = seção secundária
   p  = parágrafo comum (recuo 1,25 cm, justificado)
   p0 = parágrafo sem recuo de primeira linha
   cit= citação longa (recuo 4 cm, Arial 10, espaço simples)

   Limite: 15 folhas no total.
"""

AUTOR = "JOÃO QUADROS"
TITULO = "TESTE DE PATERNIDADE"
SUBTITULO = "da herança mendeliana à análise de DNA"
PROFESSORA = "Profa. Cristina"
DISCIPLINA = "Biologia"
INSTITUICAO = "COLÉGIO CONDE DOMINGOS"
CIDADE = "SÃO PAULO"
ANO = "2026"

NATUREZA = ("Trabalho apresentado à disciplina de Biologia como requisito parcial "
            "para avaliação, sob orientação da Profa. Cristina.")

RESUMO = (
    "O teste de paternidade é a aplicação prática de um dos conceitos centrais da Biologia: a herança "
    "genética. Este trabalho analisa os fundamentos biológicos do exame, seus métodos e seus limites. A "
    "pesquisa foi desenvolvida por meio de revisão bibliográfica, com base em artigos científicos que "
    "fundaram a área, na legislação brasileira e em dados oficiais do Conselho Nacional de Justiça. Os "
    "resultados mostram que a lógica do exame deriva diretamente das leis de Mendel: como cada indivíduo "
    "recebe um alelo de cada genitor, todo alelo do filho que não veio da mãe deve necessariamente estar "
    "presente no pai biológico. Os primeiros testes, baseados nos grupos sanguíneos descobertos por "
    "Landsteiner, só permitiam excluir; a análise de marcadores STR do DNA passou a permitir também incluir, "
    "com probabilidade superior a 99,99%. Discutem-se ainda as modalidades do exame, incluindo o teste "
    "pré-natal não invasivo viabilizado pela descoberta do DNA fetal livre no plasma materno em 1997, e as "
    "limitações impostas por mutações, gêmeos monozigóticos e parentes próximos. Conclui-se que o exame "
    "responde com precisão a uma pergunta biológica, mas não define sozinho a paternidade em sentido "
    "jurídico e afetivo."
)

PALAVRAS_CHAVE = ("Teste de paternidade. Herança genética. DNA. Marcadores STR. Filiação.")

CORPO = [

# ============================ 1 INTRODUÇÃO ============================
("h1", "1 INTRODUÇÃO"),
("p", "A pergunta sobre quem é o pai de uma criança é provavelmente tão antiga quanto a vida em sociedade, e "
      "durante quase toda a história humana ela não teve resposta confiável. Recorria-se à semelhança "
      "física, ao testemunho de terceiros ou a presunções legais baseadas no casamento — todos critérios "
      "frágeis, que produziram incontáveis injustiças em ambas as direções. Foi apenas no século XX que a "
      "Biologia passou a oferecer uma resposta objetiva, primeiro de forma parcial, com os grupos "
      "sanguíneos, e depois de forma praticamente conclusiva, com a análise do DNA."),
("p", "O que torna esse tema particularmente interessante para o estudo da Biologia é que o exame de "
      "paternidade não depende de nenhum conceito exótico ou avançado: ele é aplicação direta das leis de "
      "Mendel, do comportamento dos cromossomos na meiose e da estrutura da molécula de DNA — conteúdos "
      "estudados no ensino médio. Um laudo de paternidade, por trás da aparência técnica, nada mais é do "
      "que a verificação sistemática de uma regra simples: cada pessoa recebe metade de seu material "
      "genético da mãe e metade do pai."),
("p", "Daí o problema que orienta esta pesquisa: quais são os fundamentos biológicos do teste de "
      "paternidade, como se interpreta seu resultado e quais são seus limites reais? A última parte da "
      "pergunta é essencial, porque se difundiu a ideia de que o exame produz certeza absoluta — o que, como "
      "se verá, não é exato nem quando o resultado é positivo, nem quanto ao que ele efetivamente define."),
("p", "O objetivo geral é analisar o teste de paternidade como aplicação dos conceitos de herança genética, "
      "explicando sua lógica, seus métodos, sua estatística e suas limitações, além de situar seu uso no "
      "Brasil. O trabalho caracteriza-se como pesquisa bibliográfica, baseada em artigos científicos "
      "originais, na legislação brasileira sobre investigação de paternidade e em dados oficiais do Conselho "
      "Nacional de Justiça e do registro civil."),

# ================ 2 A BASE GENÉTICA DA FILIAÇÃO ================
("h1", "2 A BASE GENÉTICA DA FILIAÇÃO"),

("h2", "2.1 Herança mendeliana e a lógica da exclusão"),
("p", "A célula humana somática possui 46 cromossomos, organizados em 23 pares de homólogos, cada par "
      "reunindo um cromossomo de origem materna e outro de origem paterna. Para cada posição do genoma — "
      "cada locus —, o indivíduo possui portanto duas cópias, uma de cada genitor, que podem ser iguais ou "
      "diferentes; quando diferentes, chamam-se alelos distintos."),
("p", "Na formação dos gametas, a meiose reduz esse número pela metade: cada espermatozoide e cada óvulo "
      "carregam 23 cromossomos, ou seja, um único alelo de cada locus. É o princípio da segregação, "
      "enunciado por Gregor Mendel no século XIX, antes mesmo que se soubesse o que eram cromossomos ou DNA. "
      "Da fecundação resulta um zigoto que recompõe os 23 pares, metade de cada genitor."),
("p", "Dessa mecânica decorre a regra que sustenta todo teste de paternidade. Se um dos dois alelos do filho "
      "em determinado locus está presente na mãe, o outro veio obrigatoriamente do pai biológico — é o "
      "alelo obrigatório paterno. Verificar a paternidade consiste em conferir se o homem investigado o "
      "possui; se não, ele não pode ser o pai. Note-se a assimetria: a ausência exclui com certeza, mas a "
      "presença não prova nada isoladamente, pois muitos outros homens também a possuem."),

("h2", "2.2 Os primeiros testes: os grupos sanguíneos"),
("p", "A primeira aplicação prática dessa lógica veio da imuno-hematologia. Em 1900, Karl Landsteiner "
      "descreveu o sistema ABO, descoberta que lhe valeu o Nobel de Medicina em 1930. O sistema é "
      "determinado por três alelos: IA e IB, codominantes entre si, e i, recessivo."),
("p", "O raciocínio aplicado à paternidade é direto: se a mãe é do tipo O, de genótipo necessariamente ii, e "
      "o filho é do tipo B, o alelo IB veio obrigatoriamente do pai, que precisa ser B ou AB; um homem do "
      "tipo O ou A está excluído. Sistemas descobertos depois, como o Rh e sobretudo o HLA, ampliaram esse "
      "poder de discriminação."),
("p", "O limite, porém, era estrutural: poucos alelos, e milhões de pessoas com a mesma combinação. Serviam "
      "para excluir um suposto pai, nunca para afirmar que ele era o pai — a compatibilidade significava "
      "apenas que a paternidade não fora descartada. Só os marcadores de DNA tornaram a inclusão possível."),

# ================== 3 O EXAME DE DNA ==================
("h1", "3 O EXAME DE DNA"),
("p", "A virada ocorreu em 1984, quando o geneticista britânico Alec Jeffreys, na Universidade de Leicester, "
      "identificou regiões do DNA humano tão variáveis entre indivíduos que permitiam individualizá-los. O "
      "achado foi publicado na revista Nature no ano seguinte e aplicado quase imediatamente a um caso de "
      "imigração e a investigações de paternidade, antes mesmo de se tornar célebre na área criminal."),

("h2", "3.1 Os marcadores STR"),
("p", "Os marcadores utilizados hoje são os STR, sigla de Short Tandem Repeats, ou repetições curtas em "
      "sequência: trechos de DNA de dois a seis pares de bases que se repetem lado a lado um número variável "
      "de vezes. Se a sequência TCTA se repete onze vezes em determinado locus de uma pessoa e catorze vezes "
      "no de outra, ambas possuem alelos diferentes naquele ponto, identificados justamente pelo número de "
      "repetições. Um perfil genético é, assim, uma tabela de pares de números."),
("p", "Dois aspectos merecem destaque. O primeiro é que esses marcadores se localizam em regiões não "
      "codificantes do genoma, isto é, regiões que não produzem proteínas e não determinam características "
      "do indivíduo. O perfil genético, portanto, não revela cor dos olhos, altura ou predisposição a "
      "doenças: funciona como um código numérico, o que protege a privacidade de quem faz o exame. O segundo "
      "é a quantidade: enquanto o sistema ABO oferece três alelos, cada locus STR pode ter mais de vinte "
      "variantes na população, e os exames de paternidade analisam tipicamente entre quinze e vinte e quatro "
      "loci simultaneamente. É essa multiplicação de possibilidades que torna a identificação viável."),

("h2", "3.2 Da coleta ao perfil genético"),
("p", "Como todas as células nucleadas de um indivíduo contêm o mesmo DNA, a coleta não precisa ser "
      "invasiva. O método mais comum é a raspagem da mucosa oral com uma haste estéril — o chamado swab "
      "bucal —, que recolhe células epiteliais de forma indolor; também se utiliza sangue. Quando o exame "
      "tem finalidade judicial, a coleta é feita com identificação documental e registro formal, para "
      "garantir a rastreabilidade das amostras."),
("p", "No laboratório, o DNA é extraído e amplificado pela reação em cadeia da polimerase, a PCR, técnica "
      "concebida por Kary Mullis em 1983 e que lhe rendeu o Nobel de Química em 1993. A PCR reproduz em tubo "
      "de ensaio a replicação do DNA, duplicando o número de cópias a cada ciclo, de modo que trinta ciclos "
      "geram cerca de um bilhão de cópias a partir de pouquíssimo material. Os fragmentos amplificados são "
      "então separados por eletroforese capilar: como o DNA tem carga negativa devido aos grupos fosfato, "
      "ele migra em um campo elétrico, e os fragmentos menores avançam mais rápido. O equipamento registra a "
      "passagem de cada fragmento e produz um gráfico, o eletroferograma, no qual cada pico corresponde a um "
      "alelo."),

("h2", "3.3 Exclusão e inclusão: como se lê o resultado"),
("p", "Com os três perfis em mãos — mãe, filho e suposto pai —, a análise é feita locus a locus. Identificam-se "
      "os dois alelos do filho, verifica-se qual deles é compatível com a mãe e conclui-se que o outro é o "
      "alelo obrigatório paterno. Se o homem investigado o possui, há compatibilidade naquele locus; se não "
      "possui, há uma incompatibilidade."),
("p", "Aqui entra um cuidado importante, e que costuma surpreender. Uma única incompatibilidade não exclui a "
      "paternidade, porque os STR sofrem mutações com frequência relativamente alta — da ordem de um a três "
      "eventos a cada mil transmissões, por locus. Uma mutação pode alterar o número de repetições no gameta "
      "e criar no filho um alelo que o pai não possui. Por isso, os laboratórios adotam por convenção que a "
      "exclusão só é declarada quando há pelo menos três loci incompatíveis, número praticamente impossível "
      "de ser produzido por mutações simultâneas."),
("p", "A assimetria mencionada na seção 2.1 permanece válida: a exclusão é categórica, e o laudo registra "
      "probabilidade de paternidade igual a zero; a inclusão, por sua vez, é sempre probabilística, e é "
      "preciso calcular quão forte ela é."),

("h2", "3.4 O índice de paternidade e a probabilidade"),
("p", "Esse cálculo é feito pelo índice de paternidade. Para cada locus, divide-se a probabilidade de o "
      "homem investigado transmitir o alelo obrigatório paterno pela probabilidade de um homem qualquer da "
      "população transmitir esse mesmo alelo. O segundo termo depende diretamente da frequência do alelo na "
      "população, razão pela qual os laboratórios brasileiros precisam trabalhar com bancos de frequências "
      "construídos a partir da própria população do país — uma exigência técnica reforçada pela intensa "
      "miscigenação brasileira, que torna inadequado importar frequências de outras populações."),
("p", "Os índices de todos os loci são multiplicados entre si, resultando no índice de paternidade "
      "acumulado. Quanto mais raro for o conjunto de alelos compartilhado, maior o índice. Ele é então "
      "convertido em probabilidade de paternidade, e a convenção adotada no Brasil e internacionalmente "
      "exige índice acumulado de pelo menos dez mil e probabilidade igual ou superior a 99,99% para que a "
      "paternidade seja considerada praticamente comprovada. Note-se que o resultado nunca é 100%: por mais "
      "alto que seja o índice, permanece a possibilidade teórica, ainda que ínfima, de outro homem "
      "apresentar o mesmo conjunto de alelos."),

# ============== 4 MODALIDADES E LIMITES DO EXAME ==============
("h1", "4 MODALIDADES E LIMITES DO EXAME"),

("h2", "4.1 Trio, duo e exame em parentes"),
("p", "O formato ideal é o trio, com amostras da mãe, do filho e do suposto pai, porque a participação da "
      "mãe permite identificar com segurança qual alelo é materno e, por eliminação, qual é o paterno. "
      "Quando a mãe não participa, realiza-se o exame em duo, apenas entre o suposto pai e o filho. Nesse "
      "caso não se sabe de antemão qual dos alelos do filho é paterno, o que reduz o poder de discriminação; "
      "compensa-se analisando um número maior de loci e aplicando critérios estatísticos mais rigorosos."),
("p", "Situação distinta ocorre quando o suposto pai já morreu ou não é localizado. A herança genética "
      "permite contornar o problema, porque parentes consanguíneos compartilham parte previsível do material "
      "genético: avós, irmãos e tios podem ser examinados, e recursos como o DNA mitocondrial, de herança "
      "materna, e os marcadores do cromossomo Y, de herança paterna, permitem investigar linhagens inteiras. "
      "Em casos judiciais, admite-se ainda a exumação para coleta de material do falecido."),

("h2", "4.2 O teste pré-natal não invasivo"),
("p", "Durante muito tempo, realizar o exame antes do nascimento exigia procedimentos invasivos, como a "
      "amniocentese ou a biópsia de vilo corial, que envolvem risco para a gestação. A alternativa surgiu de "
      "uma descoberta publicada em 1997 pelo pesquisador Dennis Lo e colaboradores, na revista The Lancet: "
      "existe DNA fetal livre circulando no plasma sanguíneo da gestante. Lo chegou a essa conclusão por um "
      "raciocínio elegante — detectou, no sangue de grávidas de fetos masculinos, sequências do cromossomo "
      "Y, que uma mulher não poderia possuir."),
("p", "A aplicação é direta: uma simples coleta de sangue da gestante, a partir de aproximadamente oito ou "
      "nove semanas de gestação, somada a uma amostra do suposto pai, permite realizar o exame sem qualquer "
      "risco para o feto. A mesma descoberta deu origem aos testes pré-natais não invasivos hoje usados para "
      "rastrear alterações cromossômicas, como a trissomia do cromossomo 21."),

("h2", "4.3 Mutações, gêmeos e parentes próximos"),
("p", "Além das mutações já discutidas, três situações limitam o exame. A primeira são os gêmeos "
      "monozigóticos, originados de um mesmo zigoto: seus perfis STR são idênticos, de modo que a técnica "
      "convencional não distingue qual dos dois irmãos é o pai, exigindo sequenciamento de altíssima "
      "profundidade. A segunda é a existência de parentes próximos: irmãos compartilham em média metade de "
      "seus alelos, e pai e filho compartilham exatamente metade, de forma que, se o verdadeiro pai for "
      "parente próximo do homem testado, a chance de compatibilidade aparente aumenta — motivo pelo qual "
      "essa hipótese deve ser expressamente considerada na interpretação do laudo."),
("p", "A terceira é de ordem procedimental, e não biológica: troca de amostras, identificação incorreta ou "
      "contaminação. Como a PCR amplifica indistintamente qualquer DNA presente, uma contaminação é "
      "multiplicada com a mesma eficiência do material de interesse. É por isso que o rigor na coleta, na "
      "identificação e no registro das amostras não é formalidade burocrática, mas parte inseparável da "
      "confiabilidade do resultado."),

# ============== 5 O TESTE DE PATERNIDADE NO BRASIL ==============
("h1", "5 O TESTE DE PATERNIDADE NO BRASIL"),

("h2", "5.1 O marco legal e a recusa ao exame"),
("p", "A Constituição de 1988 estabeleceu, no artigo 227, § 6º, a igualdade entre os filhos havidos ou não "
      "da relação do casamento, proibindo quaisquer designações discriminatórias. A Lei nº 8.560, de 1992, "
      "regulou a investigação de paternidade dos filhos havidos fora do casamento, prevendo inclusive a "
      "averiguação oficiosa, iniciada pelo próprio cartório e encaminhada ao juiz."),
("p", "Um problema prático permanecia: o que fazer quando o suposto pai simplesmente se recusa a fornecer "
      "material para o exame? A resposta foi construída primeiro pela jurisprudência. Em 2004, o Superior "
      "Tribunal de Justiça editou a Súmula nº 301, nestes termos:"),
("cit", "Em ação investigatória, a recusa do suposto pai a submeter-se ao exame de DNA induz presunção "
        "«juris tantum» de paternidade. (BRASIL, 2004)"),
("p", "A expressão juris tantum significa presunção relativa, que admite prova em contrário — a recusa não "
      "condena automaticamente, mas é avaliada junto ao restante das provas. Esse entendimento foi "
      "incorporado à lei pela Lei nº 12.004, de 2009, e ampliado pela Lei nº 14.138, de 2021, que passou a "
      "admitir o exame em parentes consanguíneos quando o suposto pai é falecido ou está em local incerto, "
      "estendendo a esses parentes a mesma presunção em caso de recusa. Trata-se de solução que só faz "
      "sentido porque a Biologia garante que o parentesco deixa marcas genéticas verificáveis."),

("h2", "5.2 Paternidade registral, biológica e socioafetiva"),
("p", "Os números mostram a dimensão social do tema. Segundo dados do registro civil, entre janeiro de 2016 "
      "e julho de 2024, de 23,1 milhões de nascimentos no Brasil, mais de 1,2 milhão de crianças foram "
      "registradas apenas com o nome da mãe; somente em 2024, mais de 153 mil nasceram nessa condição. Para "
      "enfrentar o problema, o Conselho Nacional de Justiça implantou em 2010 o programa Pai Presente, que "
      "já viabilizou cerca de 42 mil reconhecimentos espontâneos de paternidade, sem custo e sem necessidade "
      "de advogado."),
("p", "Convém, para encerrar, marcar uma distinção que o exame sozinho não resolve. O teste de DNA responde "
      "a uma pergunta estritamente biológica: quem transmitiu metade do material genético daquela pessoa. "
      "Paternidade, porém, é também um vínculo jurídico e afetivo. O Supremo Tribunal Federal reconheceu "
      "isso em 2016, ao julgar o Recurso Extraordinário 898.060, fixando a tese de que a paternidade "
      "socioafetiva, declarada ou não em registro, não impede o reconhecimento concomitante do vínculo de "
      "filiação baseado na origem biológica, com efeitos jurídicos próprios — abrindo caminho para a "
      "chamada multiparentalidade. Biologia e paternidade, portanto, não são sinônimos."),

# ================== 6 CONSIDERAÇÕES FINAIS ==================
("h1", "6 CONSIDERAÇÕES FINAIS"),
("p", "Esta pesquisa procurou responder quais são os fundamentos biológicos do teste de paternidade, como se "
      "interpreta seu resultado e quais são seus limites. O percurso permite algumas conclusões."),
("p", "A primeira é que o exame é aplicação direta de conteúdos básicos de Biologia. Sua lógica decorre do "
      "princípio da segregação de Mendel e do comportamento dos cromossomos homólogos na meiose: como cada "
      "gameta carrega um alelo de cada locus, todo alelo do filho que não veio da mãe tem de estar presente "
      "no pai biológico. Tudo o mais — grupos sanguíneos, marcadores STR, PCR, eletroforese — são "
      "ferramentas para verificar essa mesma regra com precisão crescente."),
("p", "A segunda é que exclusão e inclusão têm naturezas lógicas diferentes, e confundi-las é o erro mais "
      "comum sobre o assunto. A exclusão é categórica, desde que apoiada em número suficiente de "
      "incompatibilidades para descartar mutações. A inclusão é sempre probabilística: mesmo um resultado de "
      "99,99% é uma probabilidade extremamente alta, não uma certeza matemática. Somam-se a isso limitações "
      "reais impostas por gêmeos monozigóticos, por parentes próximos e pela possibilidade de erro na "
      "manipulação das amostras."),
("p", "A terceira, e talvez a mais importante, é que o alcance do exame tem fronteiras definidas. Ele "
      "determina com enorme precisão quem transmitiu o material genético, e esse dado é decisivo para o "
      "direito de uma pessoa conhecer sua origem — um direito que, no Brasil, ainda é negado a um número "
      "expressivo de crianças. Mas a paternidade, como o próprio ordenamento jurídico brasileiro reconheceu "
      "ao admitir a multiparentalidade, não se esgota na coincidência de alelos. A Biologia responde com "
      "rigor à pergunta que lhe cabe; reconhecer onde essa resposta termina é parte de compreendê-la."),
]

REFERENCIAS = [
 "BRASIL. [Constituição (1988)]. Constituição da República Federativa do Brasil. Brasília, DF: Senado "
 "Federal, 1988. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Conselho Nacional de Justiça. Programa Pai Presente. Brasília, DF: CNJ, 2010. Disponível em: "
 "https://www.cnj.jus.br. Acesso em: 18 set. 2026.",

 "BRASIL. Lei nº 8.560, de 29 de dezembro de 1992. Regula a investigação de paternidade dos filhos "
 "havidos fora do casamento. Brasília, DF: Presidência da República, 1992. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/leis/l8560.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Lei nº 12.004, de 29 de julho de 2009. Altera a Lei nº 8.560, de 29 de dezembro de 1992, "
 "para estabelecer a presunção de paternidade no caso de recusa do suposto pai em submeter-se ao exame "
 "de código genético – DNA. Brasília, DF: Presidência da República, 2009. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12004.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Lei nº 14.138, de 15 de abril de 2021. Altera a Lei nº 8.560, de 29 de dezembro de 1992, "
 "para permitir a realização de exame de pareamento do código genético (DNA) em parentes "
 "consanguíneos. Brasília, DF: Presidência da República, 2021. Disponível em: "
 "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14138.htm. Acesso em: 18 set. 2026.",

 "BRASIL. Superior Tribunal de Justiça. Súmula nº 301. Em ação investigatória, a recusa do suposto pai "
 "a submeter-se ao exame de DNA induz presunção juris tantum de paternidade. Brasília, DF: STJ, 2004.",

 "BRASIL. Supremo Tribunal Federal. Recurso Extraordinário nº 898.060/SC (Tema 622). Relator: Min. "
 "Luiz Fux. Brasília, DF: STF, 2016.",

 "JEFFREYS, Alec J.; WILSON, Victoria; THEIN, Swee Lay. Individual-specific fingerprints of human DNA. "
 "Nature, Londres, v. 316, p. 76-79, 1985.",

 "LO, Yuk Ming Dennis et al. Presence of fetal DNA in maternal plasma and serum. The Lancet, Londres, "
 "v. 350, n. 9076, p. 485-487, 1997.",

 "MULLIS, Kary B. The unusual origin of the polymerase chain reaction. Scientific American, Nova York, "
 "v. 262, n. 4, p. 56-65, abr. 1990.",

 "VELHO, Jesus Antonio; GEISER, Gustavo Caminoto; ESPINDULA, Alberi (org.). Ciências forenses: uma "
 "introdução às principais áreas da criminalística moderna. 4. ed. Campinas: Millennium, 2021.",
]
